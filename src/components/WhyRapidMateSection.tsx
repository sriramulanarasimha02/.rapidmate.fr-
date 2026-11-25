import {ArrowRight, Check, Minus} from 'lucide-react';
import {motion} from 'motion/react';

interface WhyRapidMateSectionProps {
  onBookClick: () => void;
}

const REASONS = [
  {
    number: '01',
    title: 'Restaurant-Focused Specialisation',
    description:
      'RapidMate focuses specifically on the delivery rider requirements of restaurants, pizza chains, sushi restaurants and cloud kitchens.',
  },
  {
    number: '02',
    title: 'Built Around Peak-Hour Demand',
    description:
      'Instead of restaurants struggling to find additional riders when orders increase, RapidMate provides a dedicated way to request additional rider support for busy periods.',
  },
  {
    number: '03',
    title: 'One Direct Booking Channel',
    description:
      'Restaurants can submit their rider requirements directly through RapidMate instead of approaching multiple providers and managing multiple enquiries.',
  },
  {
    number: '04',
    title: 'Plan Ahead for Busy Occasions',
    description:
      'Restaurants can communicate their expected requirements for Christmas, weekends, football matches and special promotional periods.',
  },
  {
    number: '05',
    title: 'A Simpler Way to Request Extra Riders',
    description:
      'A straightforward booking process allows restaurant managers to communicate their location, rider quantity and required time slots through one registration form.',
  },
  {
    number: '06',
    title: 'A Partner That Understands Restaurant Pressure',
    description:
      'During busy hours, restaurants need to maintain their delivery operations while kitchen staff concentrate on preparing orders. Additional rider capacity helps reduce pressure on existing teams.',
  },
];

const WITHOUT_RAPIDMATE = [
  'Searching for additional rider providers when demand rises.',
  'Contacting multiple providers across separate channels.',
  'Spending valuable manager time explaining requirements repeatedly.',
  'Facing uncertainty when preparing teams for expected peak periods.',
];

const WITH_RAPIDMATE = [
  'One direct booking channel for your restaurant group or single site.',
  'A clear, structured rider request process built for operators.',
  'Staffing requests shaped around restaurant-specific service windows.',
  'Better preparation ahead of weekends, matches and seasonal surges.',
];

export function WhyRapidMateSection({onBookClick}: WhyRapidMateSectionProps) {
  return (
    <section
      id="why-rapidmate"
      className="border-b border-slate-200 bg-slate-50 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-wider text-[#D81557] uppercase">
            Why Choose RapidMate?
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            One restaurant partner. Extra riders when it matters.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Why search across multiple providers when your restaurant team can send rider
            requirements directly to a dedicated restaurant partner?
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, idx) => (
            <motion.div
              key={reason.number}
              initial={{opacity: 0, y: 12}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-40px'}}
              transition={{duration: 0.35, delay: idx * 0.04}}
              className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <span className="font-mono-tabular text-xs font-bold text-[#D81557]">
                  {reason.number}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-slate-900">
                  {reason.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Fragmented Approach
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-slate-800">
              Without RapidMate
            </h3>
            <ul className="mt-6 space-y-4">
              {WITHOUT_RAPIDMATE.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-slate-600">
                  <Minus className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-[#F7C325] bg-white p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#D81557] uppercase">
                Dedicated B2B Channel
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">
                With RapidMate
              </h3>
              <ul className="mt-6 space-y-4">
                {WITH_RAPIDMATE.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-[#D81557] mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm font-medium text-slate-700">
                Send your rider requirements directly in one enquiry.
              </p>
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-lg bg-[#D81557] px-5 py-3 text-sm font-bold text-white hover:bg-[#BE114C] transition-colors cursor-pointer"
              >
                <span>Book Your RapidMate Riders</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
