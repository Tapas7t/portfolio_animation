import React, { useEffect, useRef, useState } from 'react';
import { ExplorationCard } from '../components/explorations/ExplorationCard';
import { ExplorationLightbox } from '../components/explorations/ExplorationLightbox';
import { explorationItems, ExplorationItem } from '../data/explorations';
import { Button } from '../components/common/Button';
import { ArrowUpRight, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ExplorationsSection: React.FC = () => {
  const [selectedExploration, setSelectedExploration] = useState<ExplorationItem | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedCenterRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  const col1Items = explorationItems.filter((item) => item.column === 1);
  const col2Items = explorationItems.filter((item) => item.column === 2);

  const currentIndex = selectedExploration
    ? explorationItems.findIndex((it) => it.id === selectedExploration.id)
    : 0;

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + explorationItems.length) % explorationItems.length;
    setSelectedExploration(explorationItems[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % explorationItems.length;
    setSelectedExploration(explorationItems[nextIdx]);
  };

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktop || reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Column 1 Parallax: scrolls upward with subtle tilt
      if (col1Ref.current) {
        gsap.fromTo(
          col1Ref.current,
          { y: 120, rotate: -1 },
          {
            y: -240,
            rotate: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Column 2 Parallax: scrolls at a different speed with opposite tilt
      if (col2Ref.current) {
        gsap.fromTo(
          col2Ref.current,
          { y: 280, rotate: 1 },
          {
            y: -160,
            rotate: -1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative min-h-auto lg:min-h-[300vh] w-full bg-bg border-t border-stroke/70 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-gradient-to-tr from-[#89AACC]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[400px] bg-gradient-to-bl from-[#4E85BF]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* Center Hero Box (Sticky on Desktop >= 1024px, Normal Header on Mobile/Tablet) */}
      <div
        ref={pinnedCenterRef}
        className="relative lg:sticky lg:top-0 min-h-[50vh] lg:h-screen w-full flex items-center justify-center z-20 pointer-events-none px-4 pt-16 lg:pt-0 pb-8 lg:pb-0"
      >
        <div className="pointer-events-auto max-w-xl mx-auto text-center p-6 sm:p-10 rounded-3xl bg-surface/90 backdrop-blur-2xl border border-stroke shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg border border-stroke text-xs text-muted tracking-[0.25em] uppercase font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#89AACC] animate-pulse" />
            CREATIVE EXPERIMENTS
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-tight">
            Visual{' '}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] via-[#a3c3e5] to-[#4E85BF]">
              playground
            </span>
          </h2>

          <p className="text-xs sm:text-base text-muted leading-relaxed">
            Exploring the intersection of technology, creativity and digital experiences.
          </p>

          <div className="pt-2 flex items-center justify-center">
            <Button
              variant="primary"
              size="md"
              href="https://github.com/Tapas7t"
              external
              leftIcon={<Github className="w-4 h-4 text-[#0a0a0a]" />}
              rightIcon={<ArrowUpRight className="w-4 h-4 text-[#0a0a0a]" />}
              className="rounded-full px-6 text-xs sm:text-sm"
            >
              Explore GitHub
            </Button>
          </div>
        </div>
      </div>

      {/* Parallax Gallery Columns */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:-mt-[90vh] pb-24 sm:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 lg:gap-20 items-start">
          {/* Column 1 (Left 3 cards) */}
          <div ref={col1Ref} className="space-y-8 md:space-y-12">
            {col1Items.map((item) => (
              <ExplorationCard
                key={item.id}
                item={item}
                onClick={() => setSelectedExploration(item)}
              />
            ))}
          </div>

          {/* Column 2 (Right 3 cards with stagger) */}
          <div ref={col2Ref} className="space-y-8 md:space-y-12 md:pt-24">
            {col2Items.map((item) => (
              <ExplorationCard
                key={item.id}
                item={item}
                onClick={() => setSelectedExploration(item)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal with Carousel Controls */}
      <ExplorationLightbox
        item={selectedExploration}
        currentIndex={currentIndex}
        totalItems={explorationItems.length}
        onClose={() => setSelectedExploration(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};
