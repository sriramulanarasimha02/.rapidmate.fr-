import {AlertCircle, CheckCircle2, Loader2} from 'lucide-react';
import {FormEvent, useEffect, useState} from 'react';

interface BookingFormSectionProps {
  preselectedSlot: string | null;
  onClearPreselectedSlot: () => void;
  onOpenPrivacy: () => void;
}

interface FormState {
  restaurantName: string;
  contactPerson: string;
  businessEmail: string;
  phoneNumber: string;
  restaurantType: string;
  restaurantAddress: string;
  city: string;
  locationsCount: string;
  ridersNeeded: string;
  neededSlots: string[];
  preferredStartDate: string;
  additionalInfo: string;
  gdprConsent: boolean;
}

interface SubmissionSuccess {
  referenceId: string;
  submittedAt: string;
  restaurantName: string;
}

const RESTAURANT_TYPES = [
  'Pizza Restaurant',
  'Sushi Restaurant',
  'Cloud Kitchen',
  'Restaurant Franchise',
  'Independent Restaurant',
  'Other',
];

const LOCATION_COUNTS = [
  {value: '1', label: '1'},
  {value: '2-5', label: '2–5'},
  {value: '6-10', label: '6–10'},
  {value: '10+', label: '10+'},
];

const RIDER_COUNTS = [
  {value: '1-2', label: '1–2'},
  {value: '3-5', label: '3–5'},
  {value: '6-10', label: '6–10'},
  {value: '10+', label: '10+'},
];

const TIME_SLOTS = [
  'Weekday Lunch',
  'Weekday Dinner',
  'Friday Evening',
  'Saturday',
  'Sunday',
  'Football Match Days',
  'Christmas / New Year',
  'Special Promotions',
  'Other',
];

const INITIAL_FORM_STATE: FormState = {
  restaurantName: '',
  contactPerson: '',
  businessEmail: '',
  phoneNumber: '',
  restaurantType: '',
  restaurantAddress: '',
  city: '',
  locationsCount: '',
  ridersNeeded: '',
  neededSlots: [],
  preferredStartDate: '',
  additionalInfo: '',
  gdprConsent: false,
};

export function BookingFormSection({
  preselectedSlot,
  onClearPreselectedSlot,
  onOpenPrivacy,
}: BookingFormSectionProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<SubmissionSuccess | null>(null);

  useEffect(() => {
    if (!preselectedSlot) return;
    setSuccessData(null);
    setForm((prev) => {
      if (prev.neededSlots.includes(preselectedSlot)) return prev;
      return {...prev, neededSlots: [...prev.neededSlots, preselectedSlot]};
    });
    setErrors((prev) => {
      if (!prev.neededSlots) return prev;
      const next = {...prev};
      delete next.neededSlots;
      return next;
    });
    onClearPreselectedSlot();
  }, [preselectedSlot, onClearPreselectedSlot]);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors((prev) => {
        const next = {...prev};
        delete next[field];
        return next;
      });
    }
  };

  const toggleSlot = (slot: string) => {
    setForm((prev) => {
      const exists = prev.neededSlots.includes(slot);
      const nextSlots = exists
        ? prev.neededSlots.filter((item) => item !== slot)
        : [...prev.neededSlots, slot];
      return {...prev, neededSlots: nextSlots};
    });
    if (errors.neededSlots) {
      setErrors((prev) => {
        const next = {...prev};
        delete next.neededSlots;
        return next;
      });
    }
  };

  const validateClient = (): Record<string, string> => {
    const nextErrors: Record<string, string> = {};

    if (form.restaurantName.trim().length < 2) {
      nextErrors.restaurantName = 'Please enter your restaurant or business name.';
    }
    if (form.contactPerson.trim().length < 2) {
      nextErrors.contactPerson = 'Please enter a primary contact person.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.businessEmail.trim())) {
      nextErrors.businessEmail = 'Please enter a valid business email address.';
    }
    if (!/^[+\d][\d\s().-]{6,25}$/.test(form.phoneNumber.trim())) {
      nextErrors.phoneNumber = 'Please enter a valid business phone number.';
    }
    if (!form.restaurantType) {
      nextErrors.restaurantType = 'Please select your restaurant type.';
    }
    if (form.restaurantAddress.trim().length < 4) {
      nextErrors.restaurantAddress = 'Please enter your restaurant street address.';
    }
    if (form.city.trim().length < 2) {
      nextErrors.city = 'Please enter your city.';
    }
    if (!form.locationsCount) {
      nextErrors.locationsCount = 'Please select the number of restaurant locations.';
    }
    if (!form.ridersNeeded) {
      nextErrors.ridersNeeded = 'Please select how many additional riders you need.';
    }
    if (form.neededSlots.length === 0) {
      nextErrors.neededSlots = 'Please select at least one time slot or peak occasion.';
    }
    if (!form.preferredStartDate) {
      nextErrors.preferredStartDate = 'Please select a preferred start date.';
    }
    if (!form.gdprConsent) {
      nextErrors.gdprConsent = 'Please confirm consent so our team can contact you.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    setServerError(null);
    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        if (payload.errors && typeof payload.errors === 'object') {
          setErrors(payload.errors);
        }
        setServerError(
          payload.message || 'Could not submit your request. Please check your details.',
        );
        return;
      }

      setSuccessData({
        referenceId: payload.referenceId,
        submittedAt: payload.submittedAt,
        restaurantName: form.restaurantName.trim(),
      });
      setForm(INITIAL_FORM_STATE);
      setErrors({});
    } catch {
      setServerError(
        'A network error occurred while submitting your request. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass =
    'w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D81557]';

  return (
    <section id="book-riders" className="border-b border-slate-200 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-[#D81557] uppercase">
            Book Your RapidMate Riders
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Let&apos;s get your restaurant rush-ready.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Tell us when your restaurant needs extra delivery support. Our team will get in touch to
            discuss your requirements.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-10">
          {successData ? (
            <div
              role="status"
              aria-live="polite"
              className="py-8 sm:py-12 max-w-2xl mx-auto text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7C325]/25 border border-[#F7C325]">
                <CheckCircle2 className="h-7 w-7 text-[#D81557]" />
              </div>
              <h3 className="mt-6 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                THANK YOU FOR CHOOSING RAPIDMATE!
              </h3>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Your rider requirements have been submitted successfully. Our team will review your
                request and contact you to discuss the next steps.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl border border-slate-200 bg-white p-5 text-left">
                <div>
                  <p className="text-xs text-slate-500">Restaurant</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 truncate">
                    {successData.restaurantName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Request Reference</p>
                  <p className="mt-1 font-mono-tabular text-sm font-bold text-[#D81557]">
                    {successData.referenceId}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Submitted</p>
                  <p className="mt-1 font-mono-tabular text-sm text-slate-700">
                    {new Date(successData.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSuccessData(null)}
                className="mt-8 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Submit Another Rider Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-10">
              {serverError && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-800"
                >
                  <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                  <span>{serverError}</span>
                </div>
              )}

              <div>
                <div className="border-b border-slate-200 pb-3 mb-6">
                  <h3 className="font-display text-base font-bold text-slate-900">
                    01. Business Information
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Primary details for your restaurant or franchise group.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="restaurantName"
                      className="block text-sm font-medium text-slate-800 mb-2"
                    >
                      Restaurant / Business Name <span className="text-[#D81557]">*</span>
                    </label>
                    <input
                      id="restaurantName"
                      name="restaurantName"
                      type="text"
                      required
                      value={form.restaurantName}
                      onChange={(e) => updateField('restaurantName', e.target.value)}
                      placeholder="e.g. Napoli Woodfired Kitchen"
                      aria-invalid={Boolean(errors.restaurantName)}
                      className={`${inputBaseClass} ${
                        errors.restaurantName ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.restaurantName && (
                      <p className="mt-1.5 text-xs text-rose-600">{errors.restaurantName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contactPerson"
                      className="block text-sm font-medium text-slate-800 mb-2"
                    >
                      Contact Person <span className="text-[#D81557]">*</span>
                    </label>
                    <input
                      id="contactPerson"
                      name="contactPerson"
                      type="text"
                      required
                      value={form.contactPerson}
                      onChange={(e) => updateField('contactPerson', e.target.value)}
                      placeholder="Full name and role"
                      aria-invalid={Boolean(errors.contactPerson)}
                      className={`${inputBaseClass} ${
                        errors.contactPerson ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.contactPerson && (
                      <p className="mt-1.5 text-xs text-rose-600">{errors.contactPerson}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="businessEmail"
                      className="block text-sm font-medium text-slate-800 mb-2"
                    >
                      Business Email <span className="text-[#D81557]">*</span>
                    </label>
                    <input
                      id="businessEmail"
                      name="businessEmail"
                      type="email"
                      required
                      value={form.businessEmail}
                      onChange={(e) => updateField('businessEmail', e.target.value)}
                      placeholder="operations@yourrestaurant.com"
                      aria-invalid={Boolean(errors.businessEmail)}
                      className={`${inputBaseClass} ${
                        errors.businessEmail ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.businessEmail && (
                      <p className="mt-1.5 text-xs text-rose-600">{errors.businessEmail}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-slate-800 mb-2"
                    >
                      Phone Number <span className="text-[#D81557]">*</span>
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      value={form.phoneNumber}
                      onChange={(e) => updateField('phoneNumber', e.target.value)}
                      placeholder="+44 20 0000 0000"
                      aria-invalid={Boolean(errors.phoneNumber)}
                      className={`${inputBaseClass} ${
                        errors.phoneNumber ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1.5 text-xs text-rose-600">{errors.phoneNumber}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="restaurantType"
                      className="block text-sm font-medium text-slate-800 mb-2"
                    >
                      Restaurant Type <span className="text-[#D81557]">*</span>
                    </label>
                    <select
                      id="restaurantType"
                      name="restaurantType"
                      required
                      value={form.restaurantType}
                      onChange={(e) => updateField('restaurantType', e.target.value)}
                      aria-invalid={Boolean(errors.restaurantType)}
                      className={`${inputBaseClass} ${
                        errors.restaurantType ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    >
                      <option value="">Select restaurant category</option>
                      {RESTAURANT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.restaurantType && (
                      <p className="mt-1.5 text-xs text-rose-600">{errors.restaurantType}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="border-b border-slate-200 pb-3 mb-6">
                  <h3 className="font-display text-base font-bold text-slate-900">
                    02. Location Information
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Dispatch location and site footprint details.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="restaurantAddress"
                      className="block text-sm font-medium text-slate-800 mb-2"
                    >
                      Restaurant Address <span className="text-[#D81557]">*</span>
                    </label>
                    <input
                      id="restaurantAddress"
                      name="restaurantAddress"
                      type="text"
                      required
                      value={form.restaurantAddress}
                      onChange={(e) => updateField('restaurantAddress', e.target.value)}
                      placeholder="Street address and postcode"
                      aria-invalid={Boolean(errors.restaurantAddress)}
                      className={`${inputBaseClass} ${
                        errors.restaurantAddress ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.restaurantAddress && (
                      <p className="mt-1.5 text-xs text-rose-600">{errors.restaurantAddress}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-slate-800 mb-2"
                    >
                      City <span className="text-[#D81557]">*</span>
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      placeholder="e.g. London"
                      aria-invalid={Boolean(errors.city)}
                      className={`${inputBaseClass} ${
                        errors.city ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.city && <p className="mt-1.5 text-xs text-rose-600">{errors.city}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="locationsCount"
                      className="block text-sm font-medium text-slate-800 mb-2"
                    >
                      Number of Restaurant Locations <span className="text-[#D81557]">*</span>
                    </label>
                    <select
                      id="locationsCount"
                      name="locationsCount"
                      required
                      value={form.locationsCount}
                      onChange={(e) => updateField('locationsCount', e.target.value)}
                      aria-invalid={Boolean(errors.locationsCount)}
                      className={`${inputBaseClass} ${
                        errors.locationsCount ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    >
                      <option value="">Select number of locations</option>
                      {LOCATION_COUNTS.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    {errors.locationsCount && (
                      <p className="mt-1.5 text-xs text-rose-600">{errors.locationsCount}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="border-b border-slate-200 pb-3 mb-6">
                  <h3 className="font-display text-base font-bold text-slate-900">
                    03. Rider Requirements
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Specify your additional rider volume, peak periods and preferred start date.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="ridersNeeded"
                      className="block text-sm font-medium text-slate-800 mb-2"
                    >
                      How many additional delivery riders do you need?{' '}
                      <span className="text-[#D81557]">*</span>
                    </label>
                    <select
                      id="ridersNeeded"
                      name="ridersNeeded"
                      required
                      value={form.ridersNeeded}
                      onChange={(e) => updateField('ridersNeeded', e.target.value)}
                      aria-invalid={Boolean(errors.ridersNeeded)}
                      className={`${inputBaseClass} ${
                        errors.ridersNeeded ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    >
                      <option value="">Select rider quantity</option>
                      {RIDER_COUNTS.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    {errors.ridersNeeded && (
                      <p className="mt-1.5 text-xs text-rose-600">{errors.ridersNeeded}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="preferredStartDate"
                      className="block text-sm font-medium text-slate-800 mb-2"
                    >
                      Preferred Start Date <span className="text-[#D81557]">*</span>
                    </label>
                    <input
                      id="preferredStartDate"
                      name="preferredStartDate"
                      type="date"
                      required
                      value={form.preferredStartDate}
                      onChange={(e) => updateField('preferredStartDate', e.target.value)}
                      aria-invalid={Boolean(errors.preferredStartDate)}
                      className={`${inputBaseClass} ${
                        errors.preferredStartDate ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.preferredStartDate && (
                      <p className="mt-1.5 text-xs text-rose-600">{errors.preferredStartDate}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <span className="block text-sm font-medium text-slate-800 mb-2.5">
                      When do you need additional riders? <span className="text-[#D81557]">*</span>
                    </span>
                    <div
                      role="group"
                      aria-label="Peak periods when additional riders are needed"
                      className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
                    >
                      {TIME_SLOTS.map((slot) => {
                        const selected = form.neededSlots.includes(slot);
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => toggleSlot(slot)}
                            aria-pressed={selected}
                            className={`rounded-lg border px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap truncate ${
                              selected
                                ? 'border-[#D81557] bg-[#D81557]/10 text-[#9D1040] font-semibold'
                                : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-900'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    {errors.neededSlots && (
                      <p className="mt-2 text-xs text-rose-600">{errors.neededSlots}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="additionalInfo"
                      className="block text-sm font-medium text-slate-800 mb-2"
                    >
                      Additional Information <span className="text-slate-500">(Optional)</span>
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={4}
                      value={form.additionalInfo}
                      onChange={(e) => updateField('additionalInfo', e.target.value)}
                      placeholder="Share expected shift hours, multiple site notes or specific peak dates."
                      className={`${inputBaseClass} border-slate-300 resize-y`}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-6">
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.gdprConsent}
                      onChange={(e) => updateField('gdprConsent', e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 bg-white text-[#D81557] focus:ring-[#D81557]"
                    />
                    <span className="text-sm text-slate-700 leading-relaxed">
                      I agree to be contacted by RapidMate regarding my restaurant&apos;s rider
                      requirements and accept the{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="text-[#D81557] font-semibold underline underline-offset-2 hover:text-[#BE114C] cursor-pointer"
                      >
                        privacy policy
                      </button>
                      . <span className="text-[#D81557]">*</span>
                    </span>
                  </label>
                  {errors.gdprConsent && (
                    <p className="mt-2 text-xs text-rose-600">{errors.gdprConsent}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-slate-500">
                    Plan your peak-hour rider support directly with our operations team.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 rounded-lg bg-[#D81557] px-8 py-4 text-sm sm:text-base font-bold text-white hover:bg-[#BE114C] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    <span>{isSubmitting ? 'Submitting Request...' : 'Request Extra Riders'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
