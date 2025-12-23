import { ArrowRight } from 'lucide-react';

interface QuickBooksPromoProps {
  onBookingClick?: () => void;
}

export function QuickBooksPromo({ onBookingClick }: QuickBooksPromoProps) {
  return (
    <section className="py-[64px] px-[24px] bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900 rounded-[8px] p-12 md:p-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              QuickBooks Setup & Migration
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Proper system configuration from the start. We handle data migration, chart of accounts setup, and provide training for your team.
            </p>
            <button 
              onClick={onBookingClick}
              className="bg-teal-700 text-white px-8 py-3 rounded-[8px] hover:bg-teal-800 transition-colors inline-flex items-center gap-2"
            >
              Learn More
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}