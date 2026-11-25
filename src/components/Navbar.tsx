import {Menu, X} from 'lucide-react';
import {useState} from 'react';
import {RapidMateLogo} from './RapidMateLogo';

interface NavbarProps {
  onBookClick: () => void;
}

const NAV_LINKS = [
  {label: 'Why RapidMate', href: '#why-rapidmate'},
  {label: 'Solution', href: '#solution'},
  {label: 'How It Works', href: '#how-it-works'},
  {label: 'Occasions', href: '#occasions'},
];

export function Navbar({onBookClick}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileLink = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          aria-label="RapidMate home"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81557] rounded-lg shrink-0"
        >
          <RapidMateLogo variant="header" />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#D81557] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81557] rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookClick}
            className="hidden sm:inline-flex items-center justify-center whitespace-nowrap shrink-0 rounded-lg bg-[#D81557] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#BE114C] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            Book Your Riders
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81557]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleMobileLink(item.href);
              }}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#D81557]"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onBookClick();
            }}
            className="mt-2 w-full rounded-lg bg-[#D81557] px-4 py-3 text-sm font-semibold text-white hover:bg-[#BE114C] transition-colors cursor-pointer"
          >
            Book Your Riders
          </button>
        </div>
      )}
    </header>
  );
}
