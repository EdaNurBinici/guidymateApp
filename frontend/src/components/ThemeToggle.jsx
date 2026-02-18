import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => {
    if (theme === 'light') return '☀️';
    if (theme === 'dark') return '🌙';
    return '🍂'; // Autumn
  };

  const getTitle = () => {
    if (theme === 'light') return 'Koyu tema';
    if (theme === 'dark') return 'Sonbahar tema';
    return 'Açık tema';
  };

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label="Tema değiştir"
      title={getTitle()}
    >
      {getIcon()}
    </button>
  );
}
