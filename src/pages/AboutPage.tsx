import { Navigation } from '../components/Navigation';
import { About } from '../components/About';
import { Footer } from '../components/Footer';
import { BookingModal } from '../components/BookingModal';
import { SEO } from '../components/SEO';
import { useState, useEffect } from 'react';

export function AboutPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="About - Symmetry Ledger"
        description="Senior Financial Analyst with over 10 years of experience. Background in forensic auditing with focus on accuracy and systematic processes."
        path="/about"
      />
      <div className="min-h-screen bg-white">
        <Navigation onBookingClick={handleOpenBooking} />
        <main>
          <div className="pt-[128px]">
            <About onBookingClick={handleOpenBooking} />
          </div>
        </main>
        <Footer onBookingClick={handleOpenBooking} />
        <BookingModal isOpen={isBookingModalOpen} onClose={handleCloseBooking} />
      </div>
    </>
  );
}
