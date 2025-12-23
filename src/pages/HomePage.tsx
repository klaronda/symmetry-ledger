import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Packages } from '../components/Packages';
import { QuickBooksPromo } from '../components/QuickBooksPromo';
import { Testimonials } from '../components/Testimonials';
import { About } from '../components/About';
import { Footer } from '../components/Footer';
import { BookingModal } from '../components/BookingModal';
import { SEO } from '../components/SEO';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function HomePage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const location = useLocation();

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  // Handle hash navigation (e.g., /#about)
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      setTimeout(() => {
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
      }, 100);
    } else {
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
