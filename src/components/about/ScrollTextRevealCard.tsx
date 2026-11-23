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
          start: 'top 12%',
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
      {/* Full-Cover Pinned Card */}
      <div
        ref={cardRef}
        className="w-full max-w-6xl mx-auto rounded-3xl p-8 sm:p-12 md:p-14 lg:p-16 bg-surface/90 border border-stroke/90 backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.7)] overflow-hidden"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#89AACC]/12 to-[#4E85BF]/12 rounded-full blur-[140px] pointer-events-none" />

        {/* Halftone Dot Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(137,170,204,0.1)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-30" />

        {/* Top Header of the Vision Card */}
        <div className="relative z-10 flex items-center justify-between pb-6 sm:pb-8 border-b border-stroke/70 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#89AACC]/15 border border-[#89AACC]/30 flex items-center justify-center text-[#89AACC]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#89AACC] uppercase font-semibold block">
                CANDIDATE STATEMENT
              </span>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-text font-normal">
                Profile & Vision
              </h3>
            </div>
          </div>

          {/* Reading Status Pill */}
          <div className="flex items-center gap-3 bg-[#121214] px-4 py-2 rounded-full border border-stroke/80">
            <span className="text-xs font-mono text-muted tracking-wider">
              {isCompleted ? (
                <span className="text-[#89AACC] flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  VISION COMPLETED
                </span>
              ) : (
                <span>READING · {String(progress).padStart(3, '0')}%</span>
              )}
            </span>

            {/* Progress Line Bar */}
            <div className="relative h-1.5 w-20 sm:w-28 bg-stroke rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full w-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] rounded-full origin-left transition-transform duration-75"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>
          </div>
        </div>

        {/* Center: Full-Cover Scroll-Scrubbed Text Reveal Paragraphs */}
        <div className="relative z-10 py-8 sm:py-10 space-y-6 sm:space-y-8">
          {paragraphs.map((paragraph, pIdx) => {
            const words = paragraph.split(' ');

            return (
              <p
                key={pIdx}
                className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-sans font-light leading-relaxed sm:leading-relaxed lg:leading-[1.6] tracking-tight"
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
        <div className="relative z-10 pt-6 border-t border-stroke/60 flex items-center justify-between text-xs font-mono text-muted flex-wrap gap-2">
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
