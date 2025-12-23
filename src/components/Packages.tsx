import { Check } from 'lucide-react';

interface PackagesProps {
  onBookingClick?: () => void;
}

const packages = [
  {
    name: 'Cleanup',
    type: 'One-Time',
    bestFor: 'Businesses behind on their books',
    features: [
      'Complete backlog cleanup',
      'Full account reconciliation',
      'Error identification and correction',
      'Clean starting point',
      'Transaction categorization',
      'Summary report'
    ],
    cta: 'Get a Quote',
    highlight: false
  },
  {
    name: 'Monthly',
    type: 'Ongoing',
    bestFor: 'Regular monthly bookkeeping',
    features: [
      'Monthly bookkeeping and data entry',
      'Bank and credit card reconciliation',
      'Monthly financial report',
      'Organized record',
      'Email support',
      'Quarterly review'
    ],
    cta: 'Get Started',
    highlight: true
  },
  {
    name: 'Growth',
    type: 'Premium',
    bestFor: 'Strategic financial planning',
    features: [
      'Everything in Monthly',
      'Cash flow forecasting',
      'Budget creation and monitoring',
      'Cost optimization',
      'Quarterly strategy call',
      'Priority support'
    ],
    cta: 'Book a Call',
    highlight: false
  }
];

export function Packages({ onBookingClick }: PackagesProps) {
  return (
    <section id="packages" className="py-[64px] px-[24px] bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
            Packages
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Select the service level that fits your business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`bg-white rounded-[8px] border p-8 ${
                pkg.highlight
                  ? 'border-teal-700 shadow-lg relative'
                  : 'border-slate-200'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-700 text-white px-3 py-1 rounded-[8px] text-xs">
                  Recommended
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl text-slate-900 mb-1">
                  {pkg.name}
                </h3>
                <p className="text-sm text-teal-700">
                  {pkg.type}
                </p>
              </div>

              <p className="text-slate-600 text-sm mb-8">
                {pkg.bestFor}
              </p>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onBookingClick}
                className={`w-full py-3 rounded-[8px] transition-colors ${
                  pkg.highlight
                    ? 'bg-teal-700 text-white hover:bg-teal-800'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {pkg.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}