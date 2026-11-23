import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { SelectedWorksSection } from '../sections/SelectedWorksSection';
import { AboutSection } from '../sections/AboutSection';
import { StatsSection } from '../sections/StatsSection';
import { JournalSection } from '../sections/JournalSection';
import { ExplorationsSection } from '../sections/ExplorationsSection';
import { ContactSection } from '../sections/ContactSection';

interface HomePageProps {
  isLoaded: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ isLoaded }) => {
  return (
    <div className="w-full">
      {/* STAGE 2: Hero Section with Fullscreen HLS Video & GSAP Timeline */}
      <HeroSection isLoaded={isLoaded} />

      {/* STAGE 3: Selected Works (12-Column Bento Grid) */}
      <SelectedWorksSection />

      {/* STAGE 4: About Me & Technical Skills (Asymmetric Layout) */}
      <AboutSection />

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
