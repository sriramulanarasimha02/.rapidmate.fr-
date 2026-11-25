import {ArrowRight} from 'lucide-react';
import {RapidMateLogo} from './RapidMateLogo';

interface FinalCtaAndFooterProps {
  onBookClick: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export function FinalCtaAndFooter({
  onBookClick,
  onOpenPrivacy,
  onOpenTerms,
}: FinalCtaAndFooterProps) {
  return (
    <>
      <section className="border-b border-[#F7C325]/50 bg-[#FFFBEB] py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-wider text-[#D81557] uppercase">
            Plan Your Peak-Hour Rider Support
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 [text-wrap:balance]">
            The rush is coming. Will your team be ready?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 leading-relaxed">
            Don&apos;t let rider shortages put pressure on your busiest restaurant hours. Plan your
            additional rider requirements with RapidMate.
          </p>
          <div className="mt-9 flex justify-center">
            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 rounded-lg bg-[#D81557] px-8 py-4 text-base font-bold text-white hover:bg-[#BE114C] transition-colors cursor-pointer"
            >
              <span>Book Your Riders Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-slate-50 py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
            <div className="md:col-span-5">
              <RapidMateLogo variant="footer" />
              <p className="mt-4 max-w-sm text-sm text-slate-600 leading-relaxed">
                B2B restaurant delivery rider staffing partner supporting pizza chains, sushi
                restaurants, independent kitchens, franchises and cloud kitchens during peak demand.
              </p>
              <button
                type="button"
                onClick={onBookClick}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#D81557] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#BE114C] transition-colors cursor-pointer"
              >
                <span>Book Your Riders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="md:col-span-3">
              <h3 className="font-display text-sm font-bold text-slate-900">Navigation</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                <li>
                  <a href="#why-rapidmate" className="hover:text-[#D81557] transition-colors">
                    Why RapidMate
                  </a>
                </li>
                <li>
                  <a href="#solution" className="hover:text-[#D81557] transition-colors">
                    The RapidMate Solution
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-[#D81557] transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#occasions" className="hover:text-[#D81557] transition-colors">
                    Peak-Demand Occasions
                  </a>
                </li>
                <li>
                  <a href="#book-riders" className="hover:text-[#D81557] transition-colors">
                    Book Your Riders
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h3 className="font-display text-sm font-bold text-slate-900">
                Business Contact Placeholders
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                <li>Email: [Business Contact Email Placeholder]</li>
                <li>Phone: [Business Telephone Placeholder]</li>
                <li>Office: [Registered Office Address Placeholder]</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} RapidMate. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={onOpenTerms}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                Terms and Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
