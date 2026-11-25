import {ArrowRight, CalendarCheck2, ClipboardList, ShieldCheck} from 'lucide-react';
import {motion} from 'motion/react';
import {ResilientImage} from './ResilientImage';

interface HowItWorksAndOccasionsProps {
  onSelectOccasion: (slotName: string) => void;
}

const STEPS = [
  {
    step: 'Step 01',
    title: 'Tell Us Your Requirements',
    description:
      'Share your restaurant details, location, expected busy hours and the number of additional riders you need.',
    icon: ClipboardList,
  },
  {
    step: 'Step 02',
    title: 'Plan Your Rider Requirements',
    description:
      'Our team reviews your requirements and discusses the appropriate rider staffing arrangement.',
    icon: CalendarCheck2,
  },
  {
    step: 'Step 03',
    title: 'Get Ready for the Rush',
    description:
      'Once confirmed, additional delivery riders support your restaurant during the agreed peak hours.',
    icon: ShieldCheck,
  },
];

const OCCASIONS = [
  {
    title: 'Christmas & New Year',
    slotValue: 'Christmas / New Year',
    image: '/src/assets/images/problem_seasonal_surge_1795613974965.jpg',
    alt: 'Restaurant kitchen preparing high-volume holiday takeaway orders',
    description:
      'Communicate festive season order spikes early so your delivery capacity stays aligned across holiday trading.',
  },
  {
    title: 'Weekend Rush',
    slotValue: 'Friday Evening',
    image: '/src/assets/images/problem_weekend_rush_1795613973750.jpg',
    alt: 'Pizza kitchen pass stocked with boxes for Friday and Saturday evening rush',
    description:
      'Back up your core delivery staff during recurring Friday, Saturday and Sunday evening dinner peaks.',
  },
  {
    title: 'Football Match Days',
    slotValue: 'Football Match Days',
    image: '/src/assets/images/problem_match_day_1795613975575.jpg',
    alt: 'Takeaway dispatch counter filled with orders ahead of kick-off',
    description:
      'Prepare extra rider coverage around major fixtures when pre-match and half-time order volumes spike.',
  },
  {
    title: 'Special Promotions',
    slotValue: 'Special Promotions',
    image: '/src/assets/images/occasion_promo_kitchen_1795613976258.jpg',
    alt: 'Sushi and cloud kitchen preparation team packing takeaway orders during promotion',
    description:
      'Align additional riders with menu launches, discount campaigns and high-volume local restaurant events.',
  },
];

export function HowItWorksAndOccasions({onSelectOccasion}: HowItWorksAndOccasionsProps) {
  return (
    <>
      <section
        id="how-it-works"
        className="border-b border-slate-200 bg-white py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#D81557] uppercase">
              How It Works
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
              Three structured steps from enquiry to peak-hour support.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{opacity: 0, y: 12}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, margin: '-40px'}}
                  transition={{duration: 0.35, delay: idx * 0.08}}
                  className="relative rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tabular text-xs font-bold text-[#D81557]">
                      {item.step}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#F7C325]/60 bg-[#F7C325]/20">
                      <Icon className="h-5 w-5 text-[#D81557]" strokeWidth={1.75} />
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="occasions" className="border-b border-slate-200 bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider text-[#D81557] uppercase">
                Peak-Demand Occasions
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
                Be ready before the orders flood in.
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              RapidMate helps restaurants plan ahead for both recurring weekly peaks and major
              calendar surges.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OCCASIONS.map((occasion, idx) => (
              <motion.div
                key={occasion.title}
                initial={{opacity: 0, y: 12}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-40px'}}
                transition={{duration: 0.35, delay: idx * 0.05}}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <ResilientImage
                      src={occasion.image}
                      alt={occasion.alt}
                      fallbackTitle={occasion.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      {occasion.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                      {occasion.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectOccasion(occasion.slotValue)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D81557] hover:text-[#BE114C] transition-colors cursor-pointer"
                  >
                    <span>Plan riders for this period</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
