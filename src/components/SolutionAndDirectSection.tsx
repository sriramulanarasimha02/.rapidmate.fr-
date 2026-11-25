import {ArrowRight, Bike, CheckCircle2, ClipboardCheck, Store} from 'lucide-react';
import {motion} from 'motion/react';
import {ResilientImage} from './ResilientImage';

interface SolutionAndDirectSectionProps {
  onBookClick: () => void;
}

const SOLUTION_BENEFITS = [
  {
    number: '01',
    title: 'Extra Rider Capacity',
    description:
      'Get additional delivery riders to support your restaurant during peak hours.',
  },
  {
    number: '02',
    title: 'Peak-Hour Support',
    description:
      'Plan additional rider requirements around weekends, seasonal events and sporting occasions.',
  },
  {
    number: '03',
    title: 'Restaurant-Focused Service',
    description:
      'A service designed specifically around the delivery staffing needs of restaurants and cloud kitchens.',
  },
];

const DIRECT_HIGHLIGHTS = [
  'One direct point of contact.',
  'A straightforward rider booking process.',
  'A service designed around restaurant operations.',
  'Rider requirements based on your location, quantity and time slots.',
  'The ability to communicate upcoming peak-demand periods.',
];

export function SolutionAndDirectSection({onBookClick}: SolutionAndDirectSectionProps) {
  return (
    <>
      <section id="solution" className="border-b border-slate-200 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider text-[#D81557] uppercase">
                The RapidMate Solution
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
                More riders when you need them.
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                RapidMate connects restaurant businesses with additional delivery riders to support
                busy operating hours and high-demand occasions.
              </p>
            </div>

            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 self-start lg:self-auto rounded-lg bg-[#D81557] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#BE114C] transition-colors cursor-pointer"
            >
              <span>Book Your RapidMate Riders</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <motion.div
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-40px'}}
            transition={{duration: 0.45}}
            className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
          >
            <div className="aspect-[16/9] w-full overflow-hidden">
              <ResilientImage
                src="/src/assets/images/solution_rider_team_1795613975534.jpg"
                alt="Three RapidMate-ready delivery riders with electric bicycles outside modern urban restaurants"
                fallbackTitle="Additional Delivery Riders Ready for Restaurant Peak Windows"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-t border-slate-200 bg-white">
              {SOLUTION_BENEFITS.map((benefit) => (
                <div key={benefit.number} className="p-6 sm:p-8">
                  <span className="font-mono-tabular text-xs font-bold text-[#D81557]">
                    {benefit.number}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 lg:items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold tracking-wider text-[#D81557] uppercase">
                  Direct Business Partnership
                </p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
                  Your rider requirements. One direct connection.
                </h2>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  Stop spending time looking for additional rider support every time your restaurant
                  gets busy. Send your requirements directly to RapidMate and let our team discuss
                  the right rider arrangement for your restaurant.
                </p>

                <ul className="mt-8 space-y-3.5">
                  {DIRECT_HIGHLIGHTS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm sm:text-base text-slate-700"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#D81557] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onBookClick}
                  className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 rounded-lg bg-[#D81557] px-7 py-4 text-sm sm:text-base font-bold text-white hover:bg-[#BE114C] transition-colors cursor-pointer"
                >
                  <span>Book RapidMate Riders</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="mt-3 text-sm text-slate-500">
                  Your restaurant deserves a rider partner that&apos;s ready to understand your
                  busiest hours.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-5">
              <div className="flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white min-h-[280px]">
                <ResilientImage
                  src="/src/assets/images/direct_connection_manager_1795613975783.jpg"
                  alt="Restaurant operations manager coordinating delivery rider support at pickup counter"
                  fallbackTitle="Direct Restaurant Manager and Rider Coordination"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                <div className="flex flex-col items-start gap-1.5">
                  <Store className="w-4 h-4 text-[#D81557]" />
                  <p className="text-xs font-bold text-slate-900">Restaurant Team</p>
                  <p className="text-xs text-slate-500">Location &amp; time slots</p>
                </div>
                <div className="flex flex-col items-start gap-1.5 border-x border-slate-200 px-3">
                  <ClipboardCheck className="w-4 h-4 text-[#D81557]" />
                  <p className="text-xs font-bold text-slate-900">RapidMate Channel</p>
                  <p className="text-xs text-slate-500">One direct enquiry</p>
                </div>
                <div className="flex flex-col items-start gap-1.5 pl-1">
                  <Bike className="w-4 h-4 text-[#D81557]" />
                  <p className="text-xs font-bold text-slate-900">Extra Riders</p>
                  <p className="text-xs text-slate-500">Peak-hour capacity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
