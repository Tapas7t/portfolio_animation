import React, { useEffect, useRef, useState } from 'react';
import { Hero3DBackground } from '../components/hero/Hero3DBackground';
import { Button } from '../components/common/Button';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  isLoaded: boolean;
}

const ROLES = [
  'Full-Stack Developer',
  'AI Enthusiast',
  'Web Developer',
  'Problem Solver',
];

export const HeroSection: React.FC<HeroSectionProps> = ({ isLoaded }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  // Role rotation timer
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);

    return () => clearInterval(roleInterval);
  }, []);

  // GSAP ScrollTrigger Scrub: Text starts small & low, then smoothly scales up & elevates to center
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!contentWrapperRef.current || !heroContainerRef.current) return;

      // Honor user's reduced-motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.set(contentWrapperRef.current, {
          scale: 1,
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
        });
        return;
      }

      gsap.fromTo(
        contentWrapperRef.current,
        {
          scale: 0.80,
          y: 70,
          opacity: 0.35,
          filter: 'blur(8px)',
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: 'top 50%',
            end: 'top top+=38vh',
            scrub: 0.6,
          },
        }
      );
    }, heroContainerRef);

    // Refresh ScrollTrigger to ensure smooth coordinate registration with other sections
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      id="home"
      ref={heroContainerRef}
      className="relative w-full h-[145vh] bg-bg"
    >
      {/* Sticky Fullscreen Hero Viewport */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between items-center overflow-hidden">
        {/* 3D Isometric Animated Cube Environment with Interactive Mouse Parallax */}
        <Hero3DBackground isLoaded={isLoaded} />

        {/* Top spacer to ensure vertical breathing room under the floating pill navbar */}
        <div className="h-16 sm:h-20 w-full shrink-0" />

        {/* Main Hero Content - Scroll-driven Dolly Zoom & Elevation */}
        <div
          ref={contentWrapperRef}
          className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center my-auto will-change-transform"
        >
          {/* Eyebrow */}
          <div className="mb-4 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface/70 border border-stroke/80 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#89AACC] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-muted uppercase">
              FULL-STACK DEVELOPER · AI ENTHUSIAST
            </span>
          </div>

          {/* Hero Name: Tapas */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-text leading-none select-none my-1 drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            Tapas
          </h1>

          {/* Role: A {role} building digital experiences. */}
          <div className="mt-3 sm:mt-5 text-lg sm:text-2xl md:text-3xl text-text font-normal tracking-tight flex items-center justify-center flex-wrap gap-x-2 gap-y-1">
            <span className="text-muted/90 font-light">A</span>
            <div className="inline-flex items-center min-w-[190px] sm:min-w-[270px] justify-center h-8 sm:h-10 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRoleIndex}
                  initial={{ y: 22, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -22, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif italic font-normal text-xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] via-[#a3c3e5] to-[#4E85BF] inline-block tracking-normal"
                >
                  {ROLES[currentRoleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="text-muted/90 font-light">
              building digital experiences.
            </span>
          </div>

          {/* Description */}
          <p className="mt-6 sm:mt-8 max-w-2xl text-sm sm:text-base md:text-lg text-muted/90 font-normal leading-relaxed tracking-normal">
            I build modern web applications, intuitive digital experiences and scalable backend systems. Focused on turning ideas into functional products through clean code and thoughtful engineering.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              href="#work"
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
              className="rounded-full px-7"
            >
              See My Work
            </Button>

            <Button
              variant="outline"
              size="lg"
              href="#contact"
              leftIcon={<Sparkles className="w-4 h-4 text-[#89AACC]" />}
              className="rounded-full px-7"
            >
              Let's Connect
            </Button>
          </div>
        </div>

        {/* Bottom-Center SCROLL Indicator with Animated Line */}
        <div className="relative z-10 pb-7 pt-4 flex flex-col items-center gap-2.5">
          <span className="text-[10px] tracking-[0.3em] text-muted/80 font-medium uppercase select-none">
            SCROLL
          </span>
          <div className="relative h-11 w-[1.5px] bg-stroke/80 overflow-hidden rounded-full">
            <div className="w-full h-4 bg-gradient-to-b from-[#89AACC] to-[#4E85BF] rounded-full animate-scroll-down" />
          </div>
        </div>
      </div>
    </section>
  );
};
