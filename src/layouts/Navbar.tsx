import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { routes } from '../routes';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sims-navbar shadow-xs backdrop-blur-md bg-white/95 relative">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <Link to="/" className="sims-nav-brand" onClick={() => setIsMenuOpen(false)}>
          <img
            src="/core/Logo.png"
            alt="Logo"
            className="w-7 h-7 object-contain"
          />
          <span className="tracking-tight text-xl font-bold">SIMS PPOB</span>
        </Link>

        <nav className="sims-nav-links">
          {routes
            .filter((route) => route.showInNavbar)
            .map((route) => (
              <NavLink
                key={route.id}
                to={route.path}
                className={({ isActive }) =>
                  `sims-nav-link${isActive ? ' active' : ''}`
                }
              >
                {route.label}
              </NavLink>
            ))}
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-[#F13C2F] transition-colors focus:outline-none rounded-md"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Nav Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 border-t border-slate-100 bg-white shadow-lg animate-slide-down z-50">
          <nav className="flex flex-col py-3 px-6 gap-1 max-w-6xl mx-auto w-full">
            {routes
              .filter((route) => route.showInNavbar)
              .map((route) => (
                <NavLink
                  key={route.id}
                  to={route.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive
                      ? 'bg-red-50 text-[#F13C2F] font-bold border-l-4 border-[#F13C2F] pl-3'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  {route.label}
                </NavLink>
              ))}
          </nav>
        </div>
      )}
    </header>
  );
}

