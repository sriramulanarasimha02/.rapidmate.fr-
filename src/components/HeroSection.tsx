import {ArrowDownRight, ArrowRight} from 'lucide-react';
import {motion} from 'motion/react';
import {ResilientImage} from './ResilientImage';

interface HeroSectionProps {
  onBookClick: () => void;
  onWhyClick: () => void;
}

const KEY_PILLARS = [
  {
    index: '01',
    title: 'Restaurant-Focused Support',
    description:
      'Dedicated to understanding the rider requirements of restaurants and cloud kitchens.',
  },
  {
    index: '02',
    title: 'Additional Rider Capacity',
    description: 'Request extra delivery riders when your existing team needs support.',
  },
  {
    index: '03',
    title: 'Peak-Hour Readiness',
    description:
      'Prepare your restaurant for weekends, seasonal demand and major sporting events.',
  },
  {
    index: '04',
    title: 'Direct Business Partnership',
    description:
      'One direct channel to communicate your rider requirements and discuss your staffing needs.',
  },
];

export function HeroSection({onBookClick, onWhyClick}: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative border-b border-slate-200 bg-white pt-10 pb-14 lg:pt-16 lg:pb-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <motion.div
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="flex flex-col justify-between lg:col-span-6"
          >
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#D81557] uppercase mb-4">
                B2B Restaurant Delivery Rider Staffing Partner
              </p>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.95rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] [text-wrap:balance]">
                Your restaurant deserves a rider partner that understands your business.
              </h1>

              <p className="mt-5 font-display text-lg sm:text-xl font-semibold text-slate-800 leading-snug max-w-xl">
                Choose RapidMate for the additional delivery rider capacity your restaurant needs.
              </p>

              <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-xl">
                From everyday restaurant operations to unexpected increases in delivery demand,
                RapidMate helps restaurants access additional rider support through one direct
                business partnership.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="button"
                  onClick={onBookClick}
                  className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 rounded-lg bg-[#D81557] px-7 py-4 text-sm sm:text-base font-bold text-white hover:bg-[#BE114C] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  <span>Book Your RapidMate Riders</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={onWhyClick}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-lg border border-slate-300 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81557]"
                >
                  <span>Why RapidMate?</span>
                  <ArrowDownRight className="w-4 h-4 text-[#D81557] shrink-0" />
                </button>
              </div>

              <p className="mt-4 text-xs font-medium text-slate-500">
                Built for restaurants · Ready for the rush · One direct booking channel
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, scale: 0.99}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-6 flex"
          >
            <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 min-h-[300px] sm:min-h-[380px] lg:min-h-0 shadow-sm">
              <ResilientImage
                src="/src/assets/images/hero_riders_restaurant_1795613973282.jpg"
                alt="Professional delivery riders with insulated food delivery bags outside a busy restaurant"
                fallbackTitle="Dedicated Delivery Riders for Restaurant Operations"
                className="h-full w-full object-cover lg:h-full"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent p-6 sm:p-7">
                <p className="text-xs font-medium text-[#F7C325]">
                  Restaurant Rider Staffing · Peak-Hour Delivery Capacity
                </p>
                <p className="mt-1 font-display text-base font-semibold text-white">
                  Operational support structured around restaurant service windows.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200">
          {KEY_PILLARS.map((pillar) => (
            <div
              key={pillar.index}
              className="bg-slate-50 p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono-tabular text-xs font-bold text-[#D81557]">
                    {pillar.index}
                  </span>
                  <span className="h-1 w-6 rounded-full bg-[#F7C325]" aria-hidden="true" />
                </div>
                <h2 className="mt-3 font-display text-base font-bold text-slate-900">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
