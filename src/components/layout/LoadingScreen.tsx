import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const ROTATING_WORDS = ['Develop', 'Create', 'Innovate'];
const TOTAL_DURATION = 2700; // 2700ms

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    // Lock body scrolling during load
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();

    const updateTimer = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / TOTAL_DURATION, 1);
      const currentVal = Math.floor(progressFraction * 100);

      setProgress(currentVal);

      // Rotate through words based on time fraction
      const newWordIndex = Math.min(
        Math.floor(progressFraction * ROTATING_WORDS.length),
        ROTATING_WORDS.length - 1
      );
      setWordIndex(newWordIndex);

      if (progressFraction < 1) {
        requestAnimationFrame(updateTimer);
      } else {
        // Hold at 100 briefly then start smooth exit transition
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            document.body.style.overflow = 'unset';
            onComplete();
          }, 800);
        }, 150);
      }
    };

    const animFrame = requestAnimationFrame(updateTimer);

    return () => {
      cancelAnimationFrame(animFrame);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  const formattedCounter = String(progress).padStart(3, '0');

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1], // cinematic cubic-bezier
            },
          }}
          className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none"
        >
          {/* Subtle Ambient Backdrop Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-[#89AACC]/10 to-[#4E85BF]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Top Row: Brand & Status */}
          <div className="flex items-center justify-between text-xs tracking-widest text-muted uppercase">
            <span className="font-medium tracking-[0.25em]">Tapas · Portfolio</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#89AACC] animate-pulse" />
              Loading Experience
            </span>
          </div>

          {/* Center Rotating Words in Instrument Serif */}
          <div className="relative flex flex-col items-center justify-center my-auto">
            <div className="h-24 sm:h-32 md:h-40 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={wordIndex}
                  initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -40, opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-text font-normal text-center tracking-tight"
                >
                  {ROTATING_WORDS[wordIndex]}
                  <span className="text-[#89AACC]">.</span>
                </motion.h2>
              </AnimatePresence>
            </div>
            <p className="text-xs sm:text-sm text-muted font-sans tracking-widest uppercase mt-4">
              Designing Digital Solutions
            </p>
          </div>

          {/* Bottom Row: Counter & Animated Blue Gradient Progress Bar */}
          <div className="w-full max-w-xl mx-auto space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-muted font-mono uppercase tracking-wider">
                Progress
              </span>
              <span className="font-mono text-3xl sm:text-4xl font-light text-text tracking-tighter">
                {formattedCounter}
                <span className="text-xs text-muted font-sans ml-1">%</span>
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="relative h-[2px] w-full bg-stroke overflow-hidden rounded-full">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] shadow-[0_0_12px_rgba(137,170,204,0.6)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear', duration: 0.05 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
