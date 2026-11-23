import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { JournalModal } from '../components/journal/JournalModal';
import { journalEntries, JournalEntry } from '../data/journal';
import { ArrowUpRight, Clock, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export const JournalSection: React.FC = () => {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  return (
    <section id="journal" className="py-24 md:py-32 border-t border-stroke/70 relative bg-bg">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-[#89AACC]/6 to-[#4E85BF]/6 rounded-full blur-[130px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/80 border border-stroke text-xs text-muted tracking-[0.25em] uppercase font-semibold"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#89AACC] animate-pulse" />
            JOURNAL & WRITING
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-tight"
          >
            Recent{' '}
            <span className="font-serif italic font-normal text-accent/90">
              thoughts
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-muted leading-relaxed"
          >
            Notes on development, technology, design and everything I'm learning along the way.
          </motion.p>
        </div>

        {/* Four Horizontal Rounded Journal Cards (Pill Design) */}
        <div className="max-w-4xl mx-auto space-y-4">
          {journalEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setSelectedEntry(entry)}
              className="group relative cursor-pointer rounded-2xl sm:rounded-full bg-surface/85 border border-stroke p-4 sm:p-5 sm:px-7 transition-all duration-300 hover:border-[#89AACC]/40 hover:bg-surface hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Subtle animated gradient edge glow on hover */}
              <div className="absolute -inset-[1px] rounded-2xl sm:rounded-full bg-gradient-to-r from-[#89AACC]/30 via-transparent to-[#4E85BF]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Thumbnail & Main Info */}
                <div className="flex items-center gap-4">
                  {/* Visual Thumbnail Orb */}
                  <div
                    className={`h-12 w-12 rounded-xl sm:rounded-full bg-gradient-to-br ${entry.gradient} p-0.5 shrink-0 shadow-[0_0_15px_rgba(137,170,204,0.2)] group-hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="h-full w-full rounded-xl sm:rounded-full bg-surface flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#89AACC] group-hover:text-text transition-colors" />
                    </div>
                  </div>

                  {/* Title & Focus */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-bg border border-stroke/80 text-[#89AACC]">
                        {entry.category}
                      </span>
                      <span className="text-[11px] text-muted flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {entry.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-text group-hover:text-[#89AACC] transition-colors duration-200">
                      {entry.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted/80 line-clamp-1">
                      {entry.focus}
                    </p>
                  </div>
                </div>

                {/* Right: Read Action Arrow */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-medium text-muted group-hover:text-text transition-colors hidden sm:inline-block">
                    Read Notes
                  </span>
                  <div className="h-9 w-9 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted group-hover:text-text group-hover:border-[#89AACC]/50 group-hover:bg-[#89AACC]/10 transition-all duration-200">
                    <ArrowUpRight className="w-4 h-4 text-[#89AACC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Article Detail Modal */}
      <JournalModal
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
      />
    </section>
  );
};
