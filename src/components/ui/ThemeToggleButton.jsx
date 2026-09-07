import { useTheme } from '../../context/ThemeContext';
import { playLightSwitchClick } from '../../utils/sound';
import bulbImg from '../../assets/bulb.jpg';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  function handleClick() {
    playLightSwitchClick();
    toggleTheme();
  }

  return (
    <button
      type="button"
      className="light-switch"
      onClick={handleClick}
      aria-label={`switch to ${nextTheme} mode`}
      title={`switch to ${nextTheme} mode`}
    >
      <span className="light-switch__bulb" style={{ backgroundImage: `url(${bulbImg})` }} />
    </button>
  );
}
