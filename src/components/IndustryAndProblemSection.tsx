import {Building2, ChefHat, Flame, Store, UtensilsCrossed} from 'lucide-react';
import {motion} from 'motion/react';
import {ResilientImage} from './ResilientImage';

const RESTAURANT_CATEGORIES = [
  {
    name: 'Pizza Chains',
    context: 'High-volume delivery brands such as Domino’s or Pizza Hut',
    icon: Flame,
  },
  {
    name: 'Sushi Restaurants',
    context: 'Time-sensitive evening takeaway and dinner peaks',
    icon: UtensilsCrossed,
  },
  {
    name: 'Cloud Kitchens',
    context: 'Delivery-only kitchens managing multiple virtual menus',
    icon: ChefHat,
  },
  {
    name: 'Independent Restaurants',
    context: 'Busy local kitchens balancing dine-in and delivery',
    icon: Store,
  },
  {
    name: 'Multi-Location Franchises',
    context: 'Regional groups planning peak staffing across sites',
    icon: Building2,
  },
];

const PROBLEM_CARDS = [
  {
    title: 'The Weekend Rush',
    image: '/src/assets/images/problem_weekend_rush_1795613973750.jpg',
    alt: 'Busy pizza restaurant pass stacked with takeaway boxes on Friday evening',
    description:
      'Friday and Saturday nights bring more orders, more pressure and greater demand for delivery riders.',
  },
  {
    title: 'Match-Day Madness',
    image: '/src/assets/images/problem_match_day_1795613975575.jpg',
    alt: 'Takeaway dispatch counter filled with sealed delivery orders during an evening surge',
    description:
      'When the big game starts, food orders can surge. Make sure your restaurant has the rider capacity to keep up.',
  },
  {
    title: 'Seasonal Surges',
    image: '/src/assets/images/problem_seasonal_surge_1795613974965.jpg',
    alt: 'Restaurant chefs packing takeaway orders during a busy winter evening service',
    description:
      'Christmas, New Year and promotional events can create unexpected delivery demand. Prepare your team before the rush begins.',
  },
];

export function IndustryAndProblemSection() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#D81557] uppercase">
                Restaurant Operations Focus
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
                Made for restaurants that can&apos;t slow down.
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              Designed for restaurant operating models that depend on reliable delivery coverage
              during high-order windows.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {RESTAURANT_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#F7C325]/25">
                      <Icon className="w-5 h-5 text-[#D81557]" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-3 font-display text-base font-bold text-slate-900">
                      {category.name}
                    </h3>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">{category.context}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#D81557] uppercase">
              Operational Peak Pressure
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
              Your busiest hours should be your best hours.
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              When kitchen throughput climbs, rider shortages turn high-demand evenings into
              delivery bottlenecks.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PROBLEM_CARDS.map((card, idx) => (
              <motion.article
                key={card.title}
                initial={{opacity: 0, y: 14}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-40px'}}
                transition={{duration: 0.4, delay: idx * 0.06}}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <ResilientImage
                    src={card.image}
                    alt={card.alt}
                    fallbackTitle={card.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-mono-tabular text-xs font-bold text-[#D81557]">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold text-slate-900">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
