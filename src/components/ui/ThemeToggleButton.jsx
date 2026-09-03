import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      type="button"
      className="light-switch"
      onClick={toggleTheme}
      aria-label={`switch to ${nextTheme} mode`}
      title={`switch to ${nextTheme} mode`}
    >
      <span className="light-switch__cord" aria-hidden="true" />
      <svg className="light-switch__bulb" viewBox="0 0 24 30" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 20h6M9.5 22.6h5M10.2 25h3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        {theme === 'light' && <circle className="light-switch__filament" cx="12" cy="12" r="3.2" />}
      </svg>
    </button>
  );
}
