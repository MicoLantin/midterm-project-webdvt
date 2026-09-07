import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Layout() {
  return (
    <div className="app-shell">
      <main className="app-shell__content">
        <div className="site-header">Budget Tracker</div>
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
}
