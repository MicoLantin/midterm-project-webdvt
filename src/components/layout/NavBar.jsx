import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'home', icon: '⌂', end: true },
  { to: '/add', label: 'add', icon: '+', end: false },
  { to: '/summary', label: 'stats', icon: '▤', end: false },
];

export default function NavBar() {
  return (
    <nav className="nav-bar" aria-label="primary">
      <div className="nav-bar__inner">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `nav-bar__item${isActive ? ' is-active' : ''}`}
          >
            <span className="nav-bar__icon" aria-hidden="true">
              {link.icon}
            </span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
