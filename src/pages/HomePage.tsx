import React, { useState, useEffect } from 'react';
import { ScrollIntroCurtain } from '../components/layout/ScrollIntroCurtain';
import { HeroSection } from '../sections/HeroSection';
import { SelectedWorksSection } from '../sections/SelectedWorksSection';
import { AboutSection } from '../sections/AboutSection';
import { ResumeSection } from '../sections/ResumeSection';
import { StatsSection } from '../sections/StatsSection';
import { JournalSection } from '../sections/JournalSection';
import { ExplorationsSection } from '../sections/ExplorationsSection';
import { ContactSection } from '../sections/ContactSection';

export const HomePage: React.FC = () => {
  const [isHeroRevealed, setIsHeroRevealed] = useState<boolean>(false);

  // If page reloads while already scrolled down or loaded via anchor link, reveal hero immediately
  useEffect(() => {
    if (window.scrollY > 300) {
      setIsHeroRevealed(true);
    }
  }, []);

  return (
    <div className="w-full">
      {/* STAGE 1: Pinned Scroll-to-Enter Curtain (Apple / Studio style) */}
      <ScrollIntroCurtain onHeroReveal={() => setIsHeroRevealed(true)} />

      {/* STAGE 2: Hero Section with Fullscreen HLS Video & GSAP Timeline */}
      <HeroSection isLoaded={isHeroRevealed} />

      {/* STAGE 3: Selected Works (12-Column Bento Grid) */}
      <SelectedWorksSection />

      {/* STAGE 4: About Me & Technical Skills (Asymmetric Layout) */}
      <AboutSection />

      {/* STAGE 4.5: Resume & Qualifications (Interactive & Downloadable) */}
      <ResumeSection />

      {/* STAGE 6 - Section A: Verified Statistics (3-Column Layout) */}
      <StatsSection />

      {/* STAGE 5 - Section A: Journal (Horizontal Rounded Cards) */}
      <JournalSection />

      {/* STAGE 5 - Section B: Explorations (300vh Parallax Gallery with GSAP ScrollTrigger) */}
      <ExplorationsSection />

      {/* STAGE 6 - Section B: Contact CTA with Flipped HLS Video & GSAP Marquee */}
      <ContactSection />
    </div>
  );
};
