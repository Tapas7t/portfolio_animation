import React, { useEffect } from 'react';
import { ExplorationItem } from '../../data/explorations';
import { X, Sparkles, CheckCircle2, Cpu, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface ExplorationLightboxProps {
  item: ExplorationItem | null;
  currentIndex: number;
  totalItems: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const ExplorationLightbox: React.FC<ExplorationLightboxProps> = ({
  item,
  currentIndex,
  totalItems,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-stroke rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation & Close Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#89AACC]/15 text-[#89AACC] border border-[#89AACC]/30">
              {String(currentIndex + 1).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}
            </span>
            <span className="text-xs text-muted hidden sm:inline font-mono">
              Use ← → arrows
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="p-2 rounded-full bg-surface border border-stroke text-muted hover:text-text hover:border-accent/40 transition-colors focus:outline-none"
              aria-label="Previous exploration item"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              className="p-2 rounded-full bg-surface border border-stroke text-muted hover:text-text hover:border-accent/40 transition-colors focus:outline-none"
              aria-label="Next exploration item"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-surface border border-stroke text-muted hover:text-text hover:border-accent/40 transition-colors focus:outline-none ml-2"
              aria-label="Close lightbox"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Animated Item Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#89AACC]/15 text-[#89AACC] border border-[#89AACC]/30 inline-block">
                {item.theme}
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight">
                {item.title}
              </h2>

              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Technical Approach */}
            <div className="space-y-3 pt-2 border-t border-stroke/70">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-text flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#89AACC]" />
                Creative & Technical Approach
              </h3>
              <p className="text-sm text-muted/90 leading-relaxed font-normal">
                {item.details.approach}
              </p>
            </div>

            {/* Engineering Highlights */}
            <div className="space-y-3 pt-2 border-t border-stroke/70">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-text flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Key Technical Implementations
              </h3>
              <ul className="space-y-2">
                {item.details.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-muted flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#89AACC] mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Used */}
            <div className="space-y-3 pt-2 border-t border-stroke/70">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#4E85BF]" />
                Tooling & Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-bg border border-stroke text-text/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="pt-4 border-t border-stroke flex items-center justify-between">
          <span className="text-xs text-muted font-mono">Tapas · Visual Playground</span>
          <Button variant="primary" size="sm" onClick={onClose} rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
            Close Preview
          </Button>
        </div>
      </div>
    </div>
  );
};
