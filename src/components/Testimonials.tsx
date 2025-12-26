import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Our financials went from chaotic to clear. The monthly reports are exactly what we need.",
    name: "Sarah Chen",
    business: "Yoga Studio Owner"
  },
  {
    quote: "Six months of backlog resolved in two weeks. Professional, thorough, and dependable.",
    name: "Marcus Rivera",
    business: "Acupuncturist"
  },
  {
    quote: "The attention to detail is impressive. Errors were identified and corrected systematically.",
    name: "Jennifer Walsh",
    business: "Retail Owner"
  },
  {
    quote: "There is no way I could have been successful without Joseph's meticulous and dependable financial work. He consistently delivered clarity, accuracy, and insight under pressure.",
    name: "Angela Chatman",
    business: "Chief Financial Officer, Fourth Street Clinic"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-[64px] px-[24px] bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
            Client Feedback
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Trusted by growing businesses.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-[8px] border border-slate-200"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, starIndex) => (
                  <Star key={starIndex} className="w-5 h-5 text-teal-600 fill-teal-600" />
                ))}
              </div>
              <div className="mb-6">
                <p className="text-slate-700 leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
              <div>
                <p className="text-slate-900">
                  {testimonial.name}
                </p>
                <p className="text-sm text-slate-500">
                  {testimonial.business}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}