import { Check, Award, TrendingUp } from 'lucide-react';

interface HeroProps {
  onBookingClick: () => void;
}

export function Hero({ onBookingClick }: HeroProps) {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="pt-[128px] pb-[64px] px-[24px] bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left column - Content */}
          <div>
            <h1 className="text-4xl md:text-5xl text-slate-900 mb-6 leading-tight font-medium">
              Clean, accurate books. Delivered consistently.
            </h1>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              We bring structure to your financial operations. Reliable bookkeeping for growing businesses.
            </p>

            <div className="space-y-3 mb-10">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
                <span className="text-base text-slate-700">Accurate, organized records</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
                <span className="text-base text-slate-700">Clear financial visibility</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
                <span className="text-base text-slate-700">Consistent, dependable service</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-10">
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-[8px] border border-slate-200">
                <Award className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">QuickBooks ProAdvisor</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-[8px] border border-slate-200">
                <TrendingUp className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">10+ Years Experience</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onBookingClick}
                className="bg-teal-700 text-white px-8 py-3 rounded-[8px] hover:bg-teal-800 transition-colors font-medium"
              >
                Book a Discovery Call
              </button>
              <button
                onClick={scrollToServices}
                className="border border-slate-300 text-slate-700 px-8 py-3 rounded-[8px] hover:bg-slate-50 transition-colors font-medium"
              >
                View Services
              </button>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="relative hidden md:block">
            <div className="aspect-[4/5] rounded-[8px] overflow-hidden">
              <img
                src="https://ncefkmwkjyidchoprhth.supabase.co/storage/v1/object/public/site_images/temp/hezekiah-hero.webp"
                alt="Professional bookkeeper"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}