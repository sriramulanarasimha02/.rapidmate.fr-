import {useCallback, useState} from 'react';
import {BookingFormSection} from './components/BookingFormSection';
import {FinalCtaAndFooter} from './components/FinalCtaAndFooter';
import {HeroSection} from './components/HeroSection';
import {HowItWorksAndOccasions} from './components/HowItWorksAndOccasions';
import {IndustryAndProblemSection} from './components/IndustryAndProblemSection';
import {LegalDocType, LegalModal} from './components/LegalModal';
import {Navbar} from './components/Navbar';
import {SolutionAndDirectSection} from './components/SolutionAndDirectSection';
import {WhyRapidMateSection} from './components/WhyRapidMateSection';

export default function App() {
  const [preselectedSlot, setPreselectedSlot] = useState<string | null>(null);
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({behavior: 'smooth', block: 'start'});
  }, []);

  const handleBookClick = useCallback(() => {
    scrollToSection('book-riders');
  }, [scrollToSection]);

  const handleWhyClick = useCallback(() => {
    scrollToSection('why-rapidmate');
  }, [scrollToSection]);

  const handleSelectOccasion = useCallback(
    (slotName: string) => {
      setPreselectedSlot(slotName);
      scrollToSection('book-riders');
    },
    [scrollToSection],
  );

  const handleClearPreselectedSlot = useCallback(() => {
    setPreselectedSlot(null);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar onBookClick={handleBookClick} />

      <main>
        <HeroSection onBookClick={handleBookClick} onWhyClick={handleWhyClick} />
        <WhyRapidMateSection onBookClick={handleBookClick} />
        <IndustryAndProblemSection />
        <SolutionAndDirectSection onBookClick={handleBookClick} />
        <HowItWorksAndOccasions onSelectOccasion={handleSelectOccasion} />
        <BookingFormSection
          preselectedSlot={preselectedSlot}
          onClearPreselectedSlot={handleClearPreselectedSlot}
          onOpenPrivacy={() => setLegalDoc('privacy')}
        />
      </main>

      <FinalCtaAndFooter
        onBookClick={handleBookClick}
        onOpenPrivacy={() => setLegalDoc('privacy')}
        onOpenTerms={() => setLegalDoc('terms')}
      />

      <LegalModal docType={legalDoc} onClose={() => setLegalDoc(null)} />
    </div>
  );
}
