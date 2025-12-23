import { Navigation } from '../components/Navigation';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { BookingModal } from '../components/BookingModal';
import { SEO } from '../components/SEO';
import { useState, useEffect } from 'react';

export function TestimonialPage() {
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
        title="Testimonials - Symmetry Ledger"
        description="Trusted by growing businesses. Read what our clients say about our professional bookkeeping services."
        path="/testimonial"
      />
      <div className="min-h-screen bg-white">
        <Navigation onBookingClick={handleOpenBooking} />
        <main>
          <div className="pt-[128px]">
            <Testimonials />
          </div>
        </main>
        <Footer onBookingClick={handleOpenBooking} />
        <BookingModal isOpen={isBookingModalOpen} onClose={handleCloseBooking} />
      </div>
    </>
  );
}
