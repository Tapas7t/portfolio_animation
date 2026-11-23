import React, { useEffect } from 'react';
import { JournalEntry } from '../../data/journal';
import { X, BookOpen, Clock, Tag, ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';

interface JournalModalProps {
  entry: JournalEntry | null;
  onClose: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({ entry, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (entry) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [entry, onClose]);

  if (!entry) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface border border-stroke rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-surface border border-stroke text-muted hover:text-text hover:border-accent/40 transition-colors focus:outline-none"
          aria-label="Close article modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full font-medium bg-[#89AACC]/15 text-[#89AACC] border border-[#89AACC]/30">
              {entry.category}
            </span>
            <span className="text-muted flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-muted" />
              {entry.readTime}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight">
            {entry.title}
          </h2>

          <p className="text-sm font-serif italic text-accent/90">
            {entry.focus}
          </p>
        </div>

        {/* Content Body */}
        <div className="pt-2 border-t border-stroke/70 space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-text">
            <BookOpen className="w-4 h-4 text-[#89AACC]" />
            Article Overview & Notes
          </div>
          <p className="text-sm sm:text-base text-muted/95 leading-relaxed font-normal">
            {entry.summary}
          </p>
        </div>

        {/* Tags */}
        <div className="pt-2 border-t border-stroke/70 space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-muted font-medium">
            <Tag className="w-3.5 h-3.5 text-[#4E85BF]" />
            Key Topics
          </div>
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-bg border border-stroke text-text/80"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="pt-4 border-t border-stroke flex items-center justify-between">
          <span className="text-xs text-muted font-mono">Tapas · Engineering Notes</span>
          <Button variant="primary" size="sm" onClick={onClose} rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
            Close Article
          </Button>
        </div>
      </div>
    </div>
  );
};
