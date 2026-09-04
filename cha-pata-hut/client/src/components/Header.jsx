import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useSettings } from '../context/SettingsContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/shop', label: 'Shop' },
  { to: '/category/green-tea', label: 'Green Tea' },
  { to: '/category/rosella-tea', label: 'Rosella Tea' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { settings } = useSettings();
  const { count } = useCart();
  const site = settings.site || {};
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* Utility bar */}
      <div className="bg-primary text-white text-xs sm:text-sm">
        <div className="container-page flex flex-wrap items-center justify-between py-2 gap-2">
          <div className="flex items-center gap-4">
            <a href={`tel:${site.phone}`} className="flex items-center gap-1.5 hover:text-gold">
              <Icon name="phone" className="w-4 h-4" />
              <span className="hidden sm:inline">{site.phone}</span>
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-gold">
              <Icon name="mail" className="w-4 h-4" />
              <span className="hidden sm:inline">{site.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-white/90">
            <Icon name="pin" className="w-4 h-4" />
            <span>Sreemangal, Sylhet</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`bg-white transition-shadow ${scrolled ? 'shadow-soft' : ''}`}>
        <div className="container-page flex items-center justify-between gap-4 py-3 sm:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
            <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary text-white grid place-items-center">
              <Icon name="leaf" className="w-5 h-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl sm:text-2xl font-bold text-primary">Cha Pata Hut</span>
              <span className="block text-[10px] sm:text-xs tracking-[0.18em] uppercase text-muted">Sreemangal</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-secondary ${
                    isActive ? 'text-secondary' : 'text-ink'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button aria-label="Search" className="hidden sm:flex w-9 h-9 rounded-full hover:bg-cream items-center justify-center text-ink">
              <Icon name="search" />
            </button>
            <Link to="/admin" aria-label="Account" className="hidden sm:flex w-9 h-9 rounded-full hover:bg-cream items-center justify-center text-ink">
              <Icon name="user" />
            </Link>
            <Link
              to="/track"
              aria-label="Track Order"
              className="hidden md:flex items-center gap-1 text-xs font-medium text-secondary hover:text-primary"
              title="Track Order"
            >
              <Icon name="package" className="w-4 h-4" />
              <span>Track</span>
            </Link>
            <button
              aria-label="Cart"
              onClick={() => navigate('/checkout')}
              className="relative w-9 h-9 rounded-full hover:bg-cream flex items-center justify-center text-ink"
            >
              <Icon name="cart" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-5 h-5 grid place-items-center rounded-full">
                  {count}
                </span>
              )}
            </button>
            <button
              aria-label="Menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden w-9 h-9 rounded-full hover:bg-cream flex items-center justify-center"
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="container-page py-3 grid gap-1">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `py-2 px-2 rounded-md text-sm font-medium ${
                      isActive ? 'text-secondary bg-cream' : 'text-ink hover:bg-cream'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="flex gap-3 pt-2 border-t border-gray-100 mt-2">
                <Link to="/track" onClick={() => setMobileOpen(false)} className="btn-ghost flex-1">
                  <Icon name="package" className="w-4 h-4" /> Track Order
                </Link>
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="btn-ghost flex-1">
                  <Icon name="user" className="w-4 h-4" /> Account
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}