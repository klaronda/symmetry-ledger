import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavigationProps {
  onBookingClick: () => void;
}

export function Navigation({ onBookingClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-sm shadow-md py-3'
          : 'bg-slate-900 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="Symmetry Ledger Home"
        >
          {/* Geometric logo mark representing symmetry */}
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 grid grid-cols-2 gap-0.5">
              <div className="bg-teal-600 rounded-[2px]"></div>
              <div className="bg-teal-700 rounded-[2px]"></div>
              <div className="bg-teal-700 rounded-[2px]"></div>
              <div className="bg-teal-600 rounded-[2px]"></div>
            </div>
          </div>
          <div>
            <div className="text-white leading-tight tracking-wide uppercase text-sm">
              SYMMETRY LEDGER
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/package"
            className="text-slate-300 hover:text-teal-400 transition-colors"
          >
            Package
          </Link>
          <Link
            to="/testimonial"
            className="text-slate-300 hover:text-teal-400 transition-colors"
          >
            Testimonial
          </Link>
          <Link
            to="/about"
            className="text-slate-300 hover:text-teal-400 transition-colors"
          >
            About
          </Link>
          <button
            onClick={onBookingClick}
            className="bg-teal-700 text-white px-6 py-2 rounded-[8px] hover:bg-teal-800 transition-colors"
          >
            Book a Call
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={onBookingClick}
          className="md:hidden bg-teal-700 text-white px-4 py-2 rounded-[8px] text-sm"
        >
          Book a Call
        </button>
      </div>
    </nav>
  );
}