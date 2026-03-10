export const sanitizeUserInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remover < y >
    .replace(/javascript:/gi, '') // Remover javascript:
    .replace(/on\w+=/gi, '') // Remover event handlers
    .trim();
};

export const validateAudioUrl = (url: string): boolean => {
  const allowedDomains = [
    'soundcloud.com',
    'spotify.com',
    'music.apple.com',
    'youtube.com',
    'youtu.be'
  ];
  
  try {
    const urlObj = new URL(url);
    return allowedDomains.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
};