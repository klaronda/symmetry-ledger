import { Link, useLocation, useNavigate } from 'react-router-dom';

interface FooterProps {
  onBookingClick: () => void;
}

export function Footer({ onBookingClick }: FooterProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleLinkClick = (path: string, sectionId?: string) => {
    if (isHomePage && sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <Link
              to="/"
              onClick={handleLogoClick}
              className="flex items-center gap-3 text-white mb-4 hover:opacity-80 transition-opacity cursor-pointer"
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
            <p className="text-slate-400 max-w-xs">
              Reliable bookkeeping for growing businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">
              Quick Links
            </h3>
            <nav className="space-y-2" aria-label="Footer navigation">
              <button
                onClick={() => handleLinkClick('/package', 'packages')}
                className="block text-slate-400 hover:text-teal-400 transition-colors text-left"
              >
                Package
              </button>
              <button
                onClick={() => handleLinkClick('/testimonial', 'testimonials')}
                className="block text-slate-400 hover:text-teal-400 transition-colors text-left"
              >
                Testimonial
              </button>
              <button
                onClick={() => handleLinkClick('/about', 'about')}
                className="block text-slate-400 hover:text-teal-400 transition-colors text-left"
              >
                About
              </button>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">
              Contact
            </h3>
            <div className="space-y-3 mb-6">
              <div>
                <a href="mailto:contact@symmetryledger.com" className="text-slate-400 hover:text-teal-400 transition-colors">
                  contact@symmetryledger.com
                </a>
              </div>
              <div>
                <a href="tel:+15555551234" className="text-slate-400 hover:text-teal-400 transition-colors">
                  (555) 555-1234
                </a>
              </div>
            </div>
            <button
              onClick={onBookingClick}
              className="bg-teal-700 text-white px-6 py-2 rounded-[8px] hover:bg-teal-800 transition-colors"
            >
              Book a Call
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Symmetry Ledger. All information shared is kept strictly confidential.</p>
        </div>
      </div>
    </footer>
  );
}