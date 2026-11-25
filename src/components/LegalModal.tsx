import {X} from 'lucide-react';
import {useEffect} from 'react';

export type LegalDocType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  docType: LegalDocType;
  onClose: () => void;
}

export function LegalModal({docType, onClose}: LegalModalProps) {
  useEffect(() => {
    if (!docType) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [docType, onClose]);

  if (!docType) return null;

  const isPrivacy = docType === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 text-slate-700 shadow-xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
          <div>
            <p className="text-xs font-semibold text-[#D81557] mb-1">
              RapidMate B2B Documentation
            </p>
            <h2 id="legal-modal-title" className="font-display text-2xl font-bold text-slate-900">
              {isPrivacy ? 'Privacy Policy' : 'Terms and Conditions'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81557]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isPrivacy ? (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              RapidMate collects business contact and operational requirement details strictly for
              reviewing and responding to restaurant delivery rider staffing enquiries.
            </p>
            <div>
              <h3 className="font-display text-base font-semibold text-slate-900 mb-1">
                1. Information Collected
              </h3>
              <p>
                When you submit the rider request form, we process your restaurant or business name,
                contact person name, business email, phone number, restaurant category, address,
                city, location count, requested rider capacity, peak time windows, preferred start
                date, and any optional notes you provide.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-slate-900 mb-1">
                2. Purpose and Legal Basis
              </h3>
              <p>
                Your details are processed solely on the basis of your explicit consent to be
                contacted by RapidMate regarding your restaurant&apos;s additional delivery rider
                requirements. We do not sell or distribute your business enquiry data to third-party
                marketing lists.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-slate-900 mb-1">
                3. Data Retention and Rights
              </h3>
              <p>
                Enquiry records are retained only as long as necessary to discuss and coordinate
                your requested rider staffing support. You may request access, correction, or
                deletion of your submitted business enquiry at any time through our official business
                contact channel.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              These Terms and Conditions govern the use of the RapidMate business-to-business rider
              enquiry website.
            </p>
            <div>
              <h3 className="font-display text-base font-semibold text-slate-900 mb-1">
                1. Business Enquiries Only
              </h3>
              <p>
                RapidMate operates strictly as a B2B delivery rider staffing partner for
                restaurants, franchises, and cloud kitchens. Submitting the booking enquiry form
                initiates a business discussion regarding your rider requirements.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-slate-900 mb-1">
                2. Scope of Request Confirmation
              </h3>
              <p>
                Submitting a rider request form does not constitute an automated or binding staffing
                confirmation. Rider availability, scheduling, location coverage, and commercial
                arrangements are reviewed and confirmed directly with your restaurant team following
                our review of your submission.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-slate-900 mb-1">
                3. Accuracy of Information
              </h3>
              <p>
                Businesses submitting requests are responsible for providing accurate location,
                contact, and peak-hour staffing details so our team can assess the appropriate
                arrangement.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#D81557] text-white text-sm font-semibold hover:bg-[#BE114C] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
