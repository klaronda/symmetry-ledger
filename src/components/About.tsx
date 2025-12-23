interface AboutProps {
  onBookingClick?: () => void;
}

export function About({ onBookingClick }: AboutProps) {
  return (
    <section id="about" className="py-[64px] px-[24px] bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="order-2 md:order-1">
            <div className="aspect-[4/5] rounded-[8px] overflow-hidden">
              <img
                src="https://ncefkmwkjyidchoprhth.supabase.co/storage/v1/object/public/site_images/temp/hezekiah-aboutme.webp"
                alt="Professional Bookkeeper"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl text-slate-900 mb-6">
              About
            </h2>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              Senior Financial Analyst with over 10 years of experience. Background in forensic auditing with focus on accuracy and systematic processes.
            </p>

            <p className="text-slate-600 mb-10 leading-relaxed">
              We deliver clean, organized financials that support informed business decisions. Professional service built on structure and reliability.
            </p>

            {onBookingClick && (
              <button 
                onClick={onBookingClick}
                className="bg-teal-700 text-white px-8 py-3 rounded-[8px] hover:bg-teal-800 transition-colors font-medium"
              >
                Book a Call
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}