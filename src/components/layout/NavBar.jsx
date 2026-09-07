import { NavLink } from 'react-router-dom';

// Hand-drawn SVGs instead of Unicode glyphs (⌂ + ▤) — those render at
// wildly different sizes/weights depending on the font, which is why the
// icons looked uneven. Same viewBox and stroke width here keeps them
// visually equal.
const ICONS = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M4 11 L12 4 L20 11" />
      <path d="M6 10 V20 H18 V10" />
    </svg>
  ),
  add: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
      <path d="M12 5 V19 M5 12 H19" />
    </svg>
  ),
  summary: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M5 19 V13 M12 19 V9 M19 19 V5" />
    </svg>
  ),
};

const LINKS = [
  { to: '/', label: 'home', icon: 'home', end: true },
  { to: '/add', label: 'add', icon: 'add', end: false },
  { to: '/summary', label: 'summary', icon: 'summary', end: false },
];

export default function NavBar() {
  return (
    <nav className="nav-bar" aria-label="primary">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) => `nav-bar__item${isActive ? ' is-active' : ''}`}
        >
          <span className="nav-bar__icon" aria-hidden="true">
            {ICONS[link.icon]}
          </span>
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
