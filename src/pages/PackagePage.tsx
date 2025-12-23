import { Navigation } from '../components/Navigation';
import { Packages } from '../components/Packages';
import { Footer } from '../components/Footer';
import { BookingModal } from '../components/BookingModal';
import { SEO } from '../components/SEO';
import { useState, useEffect } from 'react';

export function PackagePage() {
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
        title="Packages - Symmetry Ledger"
        description="Choose from our bookkeeping packages: One-time cleanup, monthly ongoing service, or premium growth package with forecasting and strategy."
        path="/package"
      />
      <div className="min-h-screen bg-white">
        <Navigation onBookingClick={handleOpenBooking} />
        <main>
          <div className="pt-[128px]">
            <Packages onBookingClick={handleOpenBooking} />
          </div>
        </main>
        <Footer onBookingClick={handleOpenBooking} />
        <BookingModal isOpen={isBookingModalOpen} onClose={handleCloseBooking} />
      </div>
    </>
  );
}
