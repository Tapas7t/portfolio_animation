import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NeuralCoreBackground } from '../intro/NeuralCoreBackground';

gsap.registerPlugin(ScrollTrigger);

interface ScrollIntroCurtainProps {
  onHeroReveal?: () => void;
}

export const ScrollIntroCurtain: React.FC<ScrollIntroCurtainProps> = ({ onHeroReveal }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const counterTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);

  // Words
  const wordDevelopRef = useRef<HTMLDivElement>(null);
  const wordCreateRef = useRef<HTMLDivElement>(null);
  const wordInnovateRef = useRef<HTMLDivElement>(null);

  // Subtitles
  const subDevelopRef = useRef<HTMLParagraphElement>(null);
  const subCreateRef = useRef<HTMLParagraphElement>(null);
  const subInnovateRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!trackRef.current || !curtainRef.current) return;

    const ctx = gsap.context(() => {
      const counter = { val: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;

            // Pointer events toggle when curtain is lifted
            if (curtainRef.current) {
              if (self.progress >= 0.98) {
                curtainRef.current.style.pointerEvents = 'none';
              } else {
                curtainRef.current.style.pointerEvents = 'auto';
              }
            }

            // Trigger Hero entrance animation when scrubbing past 70%
            if (self.progress >= 0.7 && onHeroReveal) {
              onHeroReveal();
            }
          },
        },
      });

      // 1. Counter (000 to 100) from progress 0.0 to 0.8
      tl.to(
        counter,
        {
          val: 100,
          ease: 'none',
          duration: 0.8,
          onUpdate: () => {
            if (counterTextRef.current) {
              counterTextRef.current.innerText = String(Math.floor(counter.val)).padStart(3, '0');
            }
          },
        },
        0
      );

      // 2. Progress Bar Fill from progress 0.0 to 0.8
      if (progressBarRef.current) {
        tl.to(
          progressBarRef.current,
          {
            scaleX: 1,
            ease: 'none',
            duration: 0.8,
          },
          0
        );
      }

      // 3. Fade out hint early on scroll
      if (hintRef.current) {
        tl.to(
          hintRef.current,
          {
            opacity: 0,
            y: 8,
            duration: 0.12,
            ease: 'power1.out',
          },
          0
        );
      }

      // 4. Word 1 (Develop) -> Word 2 (Create) transition around 0.26 - 0.34
      tl.to(
        [wordDevelopRef.current, subDevelopRef.current],
        {
          opacity: 0,
          y: -28,
          filter: 'blur(8px)',
          duration: 0.08,
          ease: 'power2.in',
        },
        0.26
      );

      tl.fromTo(
        [wordCreateRef.current, subCreateRef.current],
        { opacity: 0, y: 32, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.08,
          ease: 'power2.out',
        },
        0.34
      );

      // 5. Word 2 (Create) -> Word 3 (Innovate) transition around 0.52 - 0.60
      tl.to(
        [wordCreateRef.current, subCreateRef.current],
        {
          opacity: 0,
          y: -28,
          filter: 'blur(8px)',
          duration: 0.08,
          ease: 'power2.in',
        },
        0.52
      );

      tl.fromTo(
        [wordInnovateRef.current, subInnovateRef.current],
        { opacity: 0, y: 32, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.08,
          ease: 'power2.out',
        },
        0.6
      );

      // 6. Curtain Lift: slides upward (yPercent: -100) from 0.82 to 1.00
      tl.to(
        curtainRef.current,
        {
          yPercent: -100,
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.18,
        },
        0.82
      );
    }, trackRef);

    return () => ctx.revert();
  }, [onHeroReveal]);

  // Handle instant Skip to Portfolio
  const handleSkip = () => {
    const homeEl = document.getElementById('home');
    if (homeEl) {
      homeEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: trackRef.current ? trackRef.current.offsetHeight : window.innerHeight * 2,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div id="intro" ref={trackRef} className="relative w-full h-[160vh] sm:h-[170vh] bg-bg">
      {/* Pinned / Sticky Fullscreen Curtain */}
      <div
        ref={curtainRef}
        className="sticky top-0 w-full h-screen z-50 bg-[#0a0a0a] flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none overflow-hidden will-change-transform"
      >
        {/* Interactive 3D WebGL Neural Plexus Core Background */}
        <NeuralCoreBackground progressRef={scrollProgressRef} />

        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[350px] sm:h-[420px] bg-gradient-to-r from-[#FFAE19]/10 via-[#89AACC]/10 to-[#4E85BF]/10 rounded-full blur-[140px] pointer-events-none z-[1]" />

        {/* Top Row: Brand & Status (Exact visual from screenshot) */}
        <div className="relative z-10 flex items-center justify-between text-xs tracking-widest uppercase">
          <span className="font-medium tracking-[0.25em] text-[#A1A1AA]">TAPAS · PORTFOLIO</span>
          <span className="flex items-center gap-2 text-[#A1A1AA]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#89AACC] animate-pulse" />
            LOADING EXPERIENCE
          </span>
        </div>

        {/* Center Rotating Words in Instrument Serif */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full">
          <div className="relative h-28 sm:h-36 md:h-44 w-full flex items-center justify-center overflow-hidden">
            {/* Word 1: Develop. */}
            <div
              ref={wordDevelopRef}
              className="absolute inset-0 flex items-center justify-center"
            >
              <h2 className="font-serif italic text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-text font-normal text-center tracking-tight">
                Develop<span className="text-[#89AACC]">.</span>
              </h2>
            </div>

            {/* Word 2: Create. */}
            <div
              ref={wordCreateRef}
              className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-8"
            >
              <h2 className="font-serif italic text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-text font-normal text-center tracking-tight">
                Create<span className="text-[#89AACC]">.</span>
              </h2>
            </div>

            {/* Word 3: Innovate. */}
            <div
              ref={wordInnovateRef}
              className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-8"
            >
              <h2 className="font-serif italic text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-text font-normal text-center tracking-tight">
                Innovate<span className="text-[#89AACC]">.</span>
              </h2>
            </div>
          </div>

          {/* Subtitle Rotator */}
          <div className="relative h-6 w-full flex items-center justify-center mt-3 sm:mt-5 overflow-hidden">
            <p
              ref={subDevelopRef}
              className="absolute text-xs sm:text-sm text-muted font-sans tracking-[0.22em] uppercase text-center"
            >
              DESIGNING DIGITAL SOLUTIONS
            </p>
            <p
              ref={subCreateRef}
              className="absolute text-xs sm:text-sm text-muted font-sans tracking-[0.22em] uppercase text-center opacity-0 translate-y-4"
            >
              CRAFTING MODERN DIGITAL PRODUCTS
            </p>
            <p
              ref={subInnovateRef}
              className="absolute text-xs sm:text-sm text-muted font-sans tracking-[0.22em] uppercase text-center opacity-0 translate-y-4"
            >
              ENGINEERING INTELLIGENT SYSTEMS
            </p>
          </div>
        </div>

        {/* Bottom Row: Counter, Progress Bar, Scroll Indicator & Skip CTA */}
        <div className="relative z-10 w-full max-w-xl mx-auto space-y-4">
          {/* Label and 000-100 Counter */}
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted font-mono uppercase tracking-wider">
              PROGRESS
            </span>
            <span className="font-mono text-3xl sm:text-4xl font-light text-text tracking-tighter">
              <span ref={counterTextRef}>000</span>
              <span className="text-xs text-muted font-sans ml-1">%</span>
            </span>
          </div>

          {/* Horizontal Progress Bar */}
          <div className="relative h-[2px] w-full bg-stroke overflow-hidden rounded-full">
            <div
              ref={progressBarRef}
              className="h-full w-full rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] shadow-[0_0_12px_rgba(137,170,204,0.6)] origin-left scale-x-0"
            />
          </div>

          {/* Interactive Controls Bar: Prompt + Skip Button */}
          <div className="flex items-center justify-between pt-2">
            {/* Scroll Indicator Prompt */}
            <div ref={hintRef} className="flex items-center gap-2 text-xs text-muted tracking-wider uppercase">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#89AACC] animate-ping" />
              <span className="text-[11px] sm:text-xs">Scroll to enter</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#89AACC] animate-bounce" />
            </div>

            {/* Quick Skip to Portfolio */}
            <button
              onClick={handleSkip}
              type="button"
              className="text-[11px] sm:text-xs text-muted hover:text-text tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 py-1.5 px-3.5 rounded-full border border-stroke/60 hover:border-[#89AACC]/50 bg-surface/40 hover:bg-surface/80 backdrop-blur-sm group"
            >
              <span>Skip to Portfolio</span>
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
