import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // LocalStorage'dan tema tercihini al
    const saved = localStorage.getItem('theme');
    if (saved && ['light', 'dark', 'autumn'].includes(saved)) {
      return saved;
    }
    // Sistem tercihini kontrol et
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Tema değiştiğinde localStorage'a kaydet
    localStorage.setItem('theme', theme);
    
    // Body'den tüm tema class'larını kaldır
    document.body.classList.remove('dark-mode', 'autumn-mode');
    
    // Yeni temayı ekle
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else if (theme === 'autumn') {
      document.body.classList.add('autumn-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'autumn';
      return 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};
