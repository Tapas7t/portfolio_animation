import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, CheckCircle2, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTextRevealCardProps {
  paragraphs: string[];
}

export const ScrollTextRevealCard: React.FC<ScrollTextRevealCardProps> = ({
  paragraphs,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const ctx = gsap.context(() => {
      const words = card.querySelectorAll<HTMLSpanElement>('.reveal-word');
      if (!words || words.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: card,
          start: 'top 16%',
          end: '+=100%',
          scrub: 0.5,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = Math.floor(self.progress * 100);
            setProgress(p);
            setIsCompleted(self.progress >= 0.95);
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      // Word-by-word reveal from dim gray to illuminated white
      tl.to(words, {
        opacity: 1,
        color: '#FFFFFF',
        textShadow: '0 0 16px rgba(137, 170, 204, 0.45)',
        stagger: 0.08,
        ease: 'none',
      });
    }, container);

    return () => ctx.revert();
  }, [paragraphs]);

  return (
    <div
      ref={containerRef}
      className="relative w-full my-4 select-none"
    >
      {/* Full-Cover Compact Widescreen Pinned Card */}
      <div
        ref={cardRef}
        className="w-full max-w-6xl mx-auto rounded-3xl px-6 py-6 sm:px-10 sm:py-7 md:px-14 md:py-8 lg:px-16 lg:py-8 bg-surface/90 border border-stroke/90 backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.7)] overflow-hidden"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#89AACC]/12 to-[#4E85BF]/12 rounded-full blur-[140px] pointer-events-none" />

        {/* Halftone Dot Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(137,170,204,0.1)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-30" />

        {/* Top Header of the Vision Card */}
        <div className="relative z-10 flex items-center justify-between pb-4 sm:pb-5 border-b border-stroke/70 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#89AACC]/15 border border-[#89AACC]/30 flex items-center justify-center text-[#89AACC]">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#89AACC] uppercase font-semibold block">
                CANDIDATE STATEMENT
              </span>
              <h3 className="font-serif italic text-xl sm:text-2xl text-text font-normal">
                Profile & Vision
              </h3>
            </div>
          </div>

          {/* Reading Status Pill */}
          <div className="flex items-center gap-3 bg-[#121214] px-3.5 py-1.5 rounded-full border border-stroke/80">
            <span className="text-xs font-mono text-muted tracking-wider">
              {isCompleted ? (
                <span className="text-[#89AACC] flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  VISION COMPLETED
                </span>
              ) : (
                <span>READING · {String(progress).padStart(3, '0')}%</span>
              )}
            </span>

            {/* Progress Line Bar */}
            <div className="relative h-1.5 w-16 sm:w-24 bg-stroke rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full w-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] rounded-full origin-left transition-transform duration-75"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>
          </div>
        </div>

        {/* Center: Widescreen Horizontal Text Flow with Refined Typography */}
        <div className="relative z-10 py-5 sm:py-6 space-y-4 sm:space-y-4">
          {paragraphs.map((paragraph, pIdx) => {
            const words = paragraph.split(' ');

            return (
              <p
                key={pIdx}
                className="text-base sm:text-lg md:text-xl lg:text-[22px] font-sans font-normal leading-relaxed sm:leading-[1.75] tracking-[-0.01em]"
              >
                {words.map((word, wIdx) => (
                  <span
                    key={`${pIdx}-${wIdx}`}
                    className="reveal-word inline-block mr-[0.28em] text-white/20 transition-all duration-150 will-change-transform select-text"
                  >
                    {word}
                  </span>
                ))}
              </p>
            );
          })}
        </div>

        {/* Bottom Card Footer */}
        <div className="relative z-10 pt-4 border-t border-stroke/60 flex items-center justify-between text-xs font-mono text-muted flex-wrap gap-2">
          <span className="tracking-wider">Tapas · Full-Stack Developer & Problem Solver</span>
          <span className="flex items-center gap-1.5 text-[#89AACC]">
            {isCompleted ? (
              <span className="font-medium">Scroll down for Technical Stack & Capabilities ↓</span>
            ) : (
              <span className="flex items-center gap-1.5 animate-pulse">
                <span>Scroll to read narrative</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
