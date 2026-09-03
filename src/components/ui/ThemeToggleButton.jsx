import { useTheme } from '../../context/ThemeContext';
import bulbImg from '../../assets/splash/frame1.jpg';

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
      <span className="light-switch__bulb" style={{ backgroundImage: `url(${bulbImg})` }} />
    </button>
  );
}
