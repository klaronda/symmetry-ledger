import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Calendar, Check } from 'lucide-react';
import { supabase, type LeadInsert } from '../lib/supabase';

// Declare Calendly type for window
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'questionnaire' | 'scheduling' | 'confirmation';

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>('questionnaire');
  const [leadId, setLeadId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const calendlyWidgetRef = useRef<HTMLDivElement>(null);
  const calendlyInitializedRef = useRef(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
    behindMonths: '',
    accountsCount: '',
    painPoints: [] as string[],
    budgetRange: '',
    additionalNotes: ''
  });

  const handleSchedulingComplete = useCallback(async (calendlyEventId?: string, calendlyInviteeUri?: string) => {
    // Update lead with booking information
    if (leadId) {
      try {
        const { error } = await supabase
          .from('leads')
          .update({
            booked_consult: true,
            calendly_event_id: calendlyEventId || null,
            calendly_invitee_uri: calendlyInviteeUri || null,
          })
          .eq('id', leadId);

        if (error) {
          console.error('Error updating lead with booking info:', error);
        }
      } catch (error) {
        console.error('Unexpected error updating lead:', error);
      }
    }

    setCurrentStep('confirmation');
  }, [leadId]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Load Calendly script and initialize widget
  useEffect(() => {
    if (currentStep === 'scheduling' && calendlyWidgetRef.current && !calendlyInitializedRef.current) {
      // Clear any existing content in the container first
      calendlyWidgetRef.current.innerHTML = '';

      // Load Calendly script if not already loaded
      const existingScript = document.querySelector('script[src*="calendly"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          // Wait a bit for DOM to be ready
          setTimeout(() => {
            if (calendlyWidgetRef.current && window.Calendly && !calendlyInitializedRef.current) {
              try {
                window.Calendly.initInlineWidget({
                  url: 'https://calendly.com/dev-symmetryledger/30min',
                  parentElement: calendlyWidgetRef.current,
                });
                calendlyInitializedRef.current = true;
              } catch (error) {
                console.error('Error initializing Calendly widget:', error);
              }
            }
          }, 200);
        };
      } else {
        // Script already loaded, wait for DOM then init widget
        setTimeout(() => {
          if (calendlyWidgetRef.current && window.Calendly && !calendlyInitializedRef.current) {
            try {
              window.Calendly.initInlineWidget({
                url: 'https://calendly.com/dev-symmetryledger/30min',
                parentElement: calendlyWidgetRef.current,
              });
              calendlyInitializedRef.current = true;
            } catch (error) {
              console.error('Error initializing Calendly widget:', error);
            }
          }
        }, 200);
      }
    }

    // Reset flag when leaving scheduling step
    if (currentStep !== 'scheduling') {
      calendlyInitializedRef.current = false;
      if (calendlyWidgetRef.current) {
        calendlyWidgetRef.current.innerHTML = '';
      }
    }
  }, [currentStep]);

  // Handle Calendly events
  useEffect(() => {
    // Listen for Calendly events
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event && e.data.event.indexOf('calendly') === 0) {
        if (e.data.event === 'calendly.event_scheduled') {
          // Extract event and invitee data from Calendly
          const eventUri = e.data.payload?.event?.uri || '';
          const inviteeUri = e.data.payload?.invitee?.uri || '';
          handleSchedulingComplete(eventUri, inviteeUri);
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, [handleSchedulingComplete]);

  const painPointOptions = [
    'Organization',
    'Backlog',
    'Planning and forecasting',
    'Tax preparation',
    'Error correction'
  ];

  const handlePainPointToggle = (option: string) => {
    setFormData(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(option)
        ? prev.painPoints.filter(p => p !== option)
        : [...prev.painPoints, option]
    }));
  };

  const handleSubmitQuestionnaire = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare lead data for Supabase
      const leadData: LeadInsert = {
        email: formData.email,
        name: formData.name,
        business_type: formData.businessType || undefined,
        backlog_status: formData.behindMonths || undefined,
        accounts_count: formData.accountsCount || undefined,
        pain_points: formData.painPoints.length > 0 ? formData.painPoints : undefined,
        budget_range: formData.budgetRange || undefined,
        additional_notes: formData.additionalNotes || undefined,
        booked_consult: false, // Will be updated when Calendly booking completes
      };

      // Insert lead into Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert(leadData)
        .select()
        .single();

      if (error) {
        console.error('Error saving lead:', error);
        alert('There was an error submitting your information. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Store lead ID for later update when booking completes
      if (data?.id) {
        setLeadId(data.id);
      }

      // Move to scheduling step
      setCurrentStep('scheduling');
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCurrentStep('questionnaire');
    setLeadId(null);
    calendlyInitializedRef.current = false;
    if (calendlyWidgetRef.current) {
      calendlyWidgetRef.current.innerHTML = '';
    }
    setFormData({
      name: '',
      email: '',
      businessType: '',
      behindMonths: '',
      accountsCount: '',
      painPoints: [],
      budgetRange: '',
      additionalNotes: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Questionnaire Step */}
          {currentStep === 'questionnaire' && (
            <div className="p-8 md:p-12">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 grid grid-cols-2 gap-0.5">
                    <div className="bg-teal-600 rounded-[2px]"></div>
                    <div className="bg-teal-700 rounded-[2px]"></div>
                    <div className="bg-teal-700 rounded-[2px]"></div>
                    <div className="bg-teal-600 rounded-[2px]"></div>
                  </div>
                </div>
                <span className="text-xl text-slate-900 tracking-tight">
                  Symmetry Ledger
                </span>
              </div>

              <h2 className="text-3xl text-slate-900 mb-2">
                Book a Discovery Call
              </h2>
              <p className="text-slate-600 mb-8">
                Answer a few questions to help us prepare.
              </p>

              <form onSubmit={handleSubmitQuestionnaire} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-slate-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded focus:ring-2 focus:ring-teal-700 focus:border-teal-700 outline-none"
                    placeholder="Your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-slate-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded focus:ring-2 focus:ring-teal-700 focus:border-teal-700 outline-none"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-slate-700 mb-2">
                    Business type
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full pl-4 pr-12 py-3 border border-slate-300 rounded focus:ring-2 focus:ring-teal-700 focus:border-teal-700 outline-none"
                    required
                  >
                    <option value="">Select business type</option>
                    <option value="Professional Service">Professional Service</option>
                    <option value="Health/Wellness">Health/Wellness</option>
                    <option value="Retail">Retail</option>
                    <option value="Restaurant/Cafe">Restaurant/Cafe</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Behind on Books */}
                <div>
                  <label className="block text-slate-700 mb-2">
                    Current backlog status
                  </label>
                  <div className="space-y-2">
                    {['Up to date', '1-3 months', '3-6 months', '6+ months'].map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="behindMonths"
                          value={option}
                          checked={formData.behindMonths === option}
                          onChange={(e) => setFormData({ ...formData, behindMonths: e.target.value })}
                          className="w-4 h-4 text-teal-700 focus:ring-teal-700"
                          required
                        />
                        <span className="text-slate-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Accounts Count */}
                <div>
                  <label className="block text-slate-700 mb-2">
                    Number of business accounts
                  </label>
                  <select
                    value={formData.accountsCount}
                    onChange={(e) => setFormData({ ...formData, accountsCount: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded focus:ring-2 focus:ring-teal-700 focus:border-teal-700 outline-none"
                    required
                  >
                    <option value="">Select number of accounts</option>
                    <option value="1">1 account</option>
                    <option value="2-3">2-3 accounts</option>
                    <option value="4-5">4-5 accounts</option>
                    <option value="6+">6+ accounts</option>
                  </select>
                </div>

                {/* Pain Points */}
                <div>
                  <label className="block text-slate-700 mb-2">
                    Primary needs (Select all that apply)
                  </label>
                  <div className="space-y-2">
                    {painPointOptions.map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.painPoints.includes(option)}
                          onChange={() => handlePainPointToggle(option)}
                          className="w-4 h-4 text-teal-700 rounded focus:ring-teal-700"
                        />
                        <span className="text-slate-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-slate-700 mb-2">
                    Budget range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded focus:ring-2 focus:ring-teal-700 focus:border-teal-700 outline-none"
                    required
                  >
                    <option value="">Select budget range</option>
                    <option value="under-500">Under $500/month</option>
                    <option value="500-1000">$500-$1,000/month</option>
                    <option value="1000-2000">$1,000-$2,000/month</option>
                    <option value="2000+">$2,000+/month</option>
                    <option value="one-time">One-time cleanup</option>
                  </select>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-slate-700 mb-2">
                    Additional notes (optional)
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded focus:ring-2 focus:ring-teal-700 focus:border-teal-700 outline-none resize-none"
                    placeholder="Any specific questions or concerns"
                  />
                </div>

                {/* Privacy Note */}
                <div className="bg-slate-50 border border-slate-200 rounded p-4">
                  <p className="text-sm text-slate-700">
                    Information provided is confidential and used only for consultation preparation.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-teal-700 text-white px-8 py-3 rounded-[8px] hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Next: Schedule Call'}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-8 py-3 border border-slate-300 text-slate-700 rounded-[8px] hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Scheduling Step */}
          {currentStep === 'scheduling' && (
            <div className="p-8 md:p-12">
              <div className="mb-6">
                <h2 className="text-3xl text-slate-900 mb-2">
                  Select Time
                </h2>
                <p className="text-slate-600 mb-6">
                  Choose a time for your consultation.
                </p>
              </div>

              <div className="bg-slate-50 rounded p-8 min-h-[400px] border border-slate-200 mb-6">
                <div 
                  ref={calendlyWidgetRef}
                  style={{ minWidth: '320px', height: '630px', width: '100%' }}
                >
                  {/* Calendly widget will be injected here */}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => handleSchedulingComplete()}
                  className="px-8 py-3 border border-slate-300 text-slate-700 rounded-[8px] hover:bg-slate-50 transition-colors"
                >
                  Skip for now
                </button>
              </div>
            </div>
          )}

          {/* Confirmation Step */}
          {currentStep === 'confirmation' && (
            <div className="p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-teal-700" />
              </div>
              
              <h2 className="text-3xl text-slate-900 mb-4">
                Confirmed
              </h2>
              
              <p className="text-slate-600 mb-8 max-w-lg mx-auto leading-relaxed">
                Consultation booked. You will receive confirmation and preparation materials via email.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded p-6 max-w-md mx-auto mb-8">
                <p className="text-slate-900 mb-3">
                  Next steps:
                </p>
                <ul className="text-sm text-slate-600 text-left space-y-2 leading-relaxed">
                  <li>Calendar invite sent to email</li>
                  <li>Preparation materials provided</li>
                  <li>Package recommendations prepared</li>
                  <li>Meeting link included</li>
                </ul>
              </div>

              <button
                onClick={handleClose}
                className="bg-teal-700 text-white px-8 py-3 rounded-[8px] hover:bg-teal-800 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}