import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Packages } from './components/Packages';
import { QuickBooksPromo } from './components/QuickBooksPromo';
import { Testimonials } from './components/Testimonials';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { SEO } from './components/SEO';
import { useState, useEffect } from 'react';

function HomePage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const location = useLocation();

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  // Handle hash navigation
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      // Wait a bit longer to ensure DOM is ready, especially after redirects
      const scrollToSection = () => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          // Retry if element not found yet
          setTimeout(scrollToSection, 50);
        }
      };
      setTimeout(scrollToSection, 150);
    } else if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <SEO />
      <div className="min-h-screen bg-white">
        <Navigation onBookingClick={handleOpenBooking} />
        <main>
          <Hero onBookingClick={handleOpenBooking} />
          <Services />
          <Packages onBookingClick={handleOpenBooking} />
          <QuickBooksPromo onBookingClick={handleOpenBooking} />
          <Testimonials />
          <About onBookingClick={handleOpenBooking} />
        </main>
        <Footer onBookingClick={handleOpenBooking} />
        <BookingModal isOpen={isBookingModalOpen} onClose={handleCloseBooking} />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route path="/package" element={<Navigate to="/#packages" replace />} />
        <Route path="/packages" element={<Navigate to="/#packages" replace />} />
        <Route path="/testimonial" element={<Navigate to="/#testimonials" replace />} />
        <Route path="/testimonials" element={<Navigate to="/#testimonials" replace />} />
      </Routes>
    </BrowserRouter>
  );
}