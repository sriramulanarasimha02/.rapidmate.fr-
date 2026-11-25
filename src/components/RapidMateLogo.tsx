interface RapidMateLogoProps {
  variant?: 'header' | 'footer';
  className?: string;
}

export function RapidMateLogo({variant = 'header', className = ''}: RapidMateLogoProps) {
  const sizeClass =
    variant === 'footer'
      ? 'h-24 w-24 rounded-xl'
      : 'h-12 w-12 rounded-lg';

  return (
    <span className={`inline-flex items-center shrink-0 ${className}`}>
      <img
        src="/assets/aistudio/image_2c72fefa.png"
        alt="RapidMate logo"
        referrerPolicy="no-referrer"
        className={`${sizeClass} aspect-square object-contain shrink-0 border border-slate-200 shadow-xs`}
      />
    </span>
  );
}
