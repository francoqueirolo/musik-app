import { useState, useCallback } from 'react';
import DOMPurify from 'dompurify';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url: string;
}

export const useSecureSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sanitizeSearchQuery = useCallback((query: string): string => {
    // Sanitizar entrada del usuario
    const sanitized = DOMPurify.sanitize(query, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    });
    
    // Validar longitud
    if (sanitized.length > 100) {
      throw new Error('Search query too long');
    }
    
    // Validar caracteres permitidos
    const allowedPattern = /^[a-zA-Z0-9\s\-_.]+$/;
    if (!allowedPattern.test(sanitized)) {
      throw new Error('Invalid characters in search query');
    }
    
    return sanitized;
  }, []);

  const search = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const sanitizedQuery = sanitizeSearchQuery(query);
      
      // Validar que la query no esté vacía después de sanitización
      if (!sanitizedQuery.trim()) {
        setResults([]);
        return;
      }

      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest' // CSRF protection
        },
        body: JSON.stringify({ 
          query: sanitizedQuery,
          timestamp: Date.now() // Prevenir replay attacks
        })
      });

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();
      setResults(data.tracks || []);
      
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [sanitizeSearchQuery]);

  return { search, searchQuery, setSearchQuery, results, isLoading };
};