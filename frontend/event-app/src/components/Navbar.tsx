import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { logout, email } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-accent border-b-2 border-accent pb-0.5'
      : 'text-slate-500 hover:text-accent';

  return (
    <nav className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-semibold text-lg text-slate-900 tracking-tight">
          <span className="text-accent">Radency Events</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className={`transition-colors ${isActive('/')}`}>
            Events
          </Link>
          <Link to="/my-events" className={`transition-colors ${isActive('/my-events')}`}>
            My Events
          </Link>
          <Link to="/create" className={`transition-colors ${isActive('/create')}`}>
            Create
          </Link>
        </div>

        {/* User info + logout */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 hidden sm:block">{email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-500 hover:text-red-500 transition-colors font-medium"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
