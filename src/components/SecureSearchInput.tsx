import React, { useState } from 'react';

interface SecureSearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SecureSearchInput: React.FC<SecureSearchInputProps> = ({
  onSearch,
  placeholder = "Search music..."
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Validación en tiempo real
    if (input.length > 100) {
      setError('Search query too long (max 100 characters)');
      return;
    }
    
    // Verificar caracteres peligrosos
    const dangerousChars = /<script|javascript:|on\w+=/i;
    if (dangerousChars.test(input)) {
      setError('Invalid characters detected');
      return;
    }
    
    setError(null);
    setValue(input);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!error && value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="secure-search-form">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        maxLength={100}
        className={`search-input ${error ? 'error' : ''}`}
        autoComplete="off"
        spellCheck="false"
      />
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      <button 
        type="submit" 
        disabled={!!error || !value.trim()}
        className="search-button"
      >
        Search
      </button>
    </form>
  );
};