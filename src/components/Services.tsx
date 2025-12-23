import { BookOpen, Eraser, FileText, TrendingUp, MessageCircle, Settings, GraduationCap, Package, Search } from 'lucide-react';

const services = [
  {
    icon: BookOpen,
    title: 'Bookkeeping',
    description: 'Accurate day-to-day transaction recording and account management to keep your finances organized.'
  },
  {
    icon: Eraser,
    title: 'Book Cleanup',
    description: 'Get caught up from months or years of backlog with thorough reconciliation and error correction.'
  },
  {
    icon: FileText,
    title: 'Financial Reporting',
    description: 'Clear, actionable reports that show you exactly where your business stands financially.'
  },
  {
    icon: TrendingUp,
    title: 'Budgeting & Forecasting',
    description: 'Plan ahead with data-driven budgets and forecasts that help you make confident decisions.'
  },
  {
    icon: MessageCircle,
    title: 'Consulting',
    description: 'Get expert guidance on financial questions, process improvements, and business decisions.'
  },
  {
    icon: Settings,
    title: 'QuickBooks Setup',
    description: 'Proper configuration from day one, including chart of accounts and integration setup.'
  },
  {
    icon: GraduationCap,
    title: 'QuickBooks Training',
    description: 'Learn to use QuickBooks effectively with personalized training tailored to your business.'
  },
  {
    icon: Package,
    title: 'Inventory Support',
    description: 'Track inventory accurately and understand your costs for better pricing and purchasing.'
  },
  {
    icon: Search,
    title: 'Forensic Reviews',
    description: 'Detailed analysis and audit support when you need to investigate discrepancies or prepare for scrutiny.'
  }
];

export function Services() {
  return (
    <section id="services" className="py-[64px] px-[24px] bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
            Services
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Comprehensive bookkeeping services for growing businesses.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-[8px] border border-slate-200"
              >
                <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-slate-700" />
                </div>
                <h3 className="text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}