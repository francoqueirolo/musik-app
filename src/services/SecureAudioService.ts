interface ValidationResult {
  valid: boolean;
  error?: string;
}

interface SecureAudioElement {
  url: string;
  audio: HTMLAudioElement;
  securityToken: string;
}

export class AudioSecurityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AudioSecurityError';
  }
}

export class SecureAudioService {
  private readonly ALLOWED_AUDIO_FORMATS = [
    'audio/mpeg', 'audio/mp3', 'audio/wav', 
    'audio/ogg', 'audio/aac', 'audio/mp4'
  ];
  
  private readonly MAX_AUDIO_SIZE = 50 * 1024 * 1024; // 50MB
  private readonly ALLOWED_ORIGINS = [
    'https://soundcloud.com',
    'https://spotify.com', 
    'https://music.apple.com',
    'https://youtube.com',
    'https://youtu.be'
  ];

  async validateAudioUrl(url: string): Promise<ValidationResult> {
    try {
      // Validar formato de URL
      const urlObj = new URL(url);
      
      // Verificar protocolo seguro
      if (urlObj.protocol !== 'https:') {
        return {
          valid: false,
          error: 'Only HTTPS URLs are allowed'
        };
      }

      // Verificar origen permitido
      const isAllowedOrigin = this.ALLOWED_ORIGINS.some(origin => {
        const originUrl = new URL(origin);
        return urlObj.hostname === originUrl.hostname ||
               urlObj.hostname.endsWith(`.${originUrl.hostname}`);
      });

      if (!isAllowedOrigin) {
        return {
          valid: false,
          error: 'Audio source not allowed'
        };
      }

      // Verificar cabeceras de respuesta
      const response = await fetch(url, { 
        method: 'HEAD',
        headers: {
          'User-Agent': 'MusikApp/1.0'
        }
      });

      if (!response.ok) {
        return {
          valid: false,
          error: 'Audio resource not accessible'
        };
      }

      // Verificar tipo de contenido
      const contentType = response.headers.get('content-type');
      if (!contentType || !this.ALLOWED_AUDIO_FORMATS.some(format => 
        contentType.includes(format)
      )) {
        return {
          valid: false,
          error: 'Invalid audio format'
        };
      }

      // Verificar tamaño
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > this.MAX_AUDIO_SIZE) {
        return {
          valid: false,
          error: 'Audio file too large'
        };
      }

      return { valid: true };

    } catch (error) {
      return {
        valid: false,
        error: 'Invalid audio URL'
      };
    }
  }

  async loadSecureAudio(url: string): Promise<SecureAudioElement> {
    const validation = await this.validateAudioUrl(url);
    
    if (!validation.valid) {
      throw new AudioSecurityError(validation.error || 'Audio validation failed');
    }

    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.preload = 'none';

    return {
      url,
      audio,
      securityToken: crypto.randomUUID()
    };
  }
}