import React from 'react';
import { Container } from '../components/common/Container';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, Layers } from 'lucide-react';

interface StatItem {
  number: string;
  label: string;
  subtext: string;
  icon: React.ReactNode;
  category: string;
}

const STATS_DATA: StatItem[] = [
  {
    number: '01',
    label: 'Featured Product',
    subtext: 'MedConsults Clinic Management Platform',
    category: 'Engineering Architecture',
    icon: <Layers className="w-4 h-4 text-[#89AACC]" />,
  },
  {
    number: '6.95',
    label: 'Academic CGPA',
    subtext: 'BSc Information Technology',
    category: 'Computer Science',
    icon: <GraduationCap className="w-4 h-4 text-[#4E85BF]" />,
  },
  {
    number: '2026',
    label: 'Graduate',
    subtext: 'University of Mumbai',
    category: 'Academic Milestone',
    icon: <Sparkles className="w-4 h-4 text-[#89AACC]" />,
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 border-t border-stroke/70 relative bg-bg overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[250px] bg-gradient-to-r from-[#89AACC]/8 via-transparent to-[#4E85BF]/8 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        {/* Section Tag */}
        <div className="flex items-center justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/80 border border-stroke text-xs text-muted tracking-[0.25em] uppercase font-semibold"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#89AACC] animate-pulse" />
            BY THE NUMBERS
          </motion.div>
        </div>

        {/* Three-Column Verified Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {STATS_DATA.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-3xl bg-surface/85 border border-stroke p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-[#89AACC]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              {/* Subtle hover gradient aura */}
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-[#89AACC]/20 via-transparent to-[#4E85BF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

              {/* Halftone texture */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(137,170,204,0.1)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-30" />

              {/* Card Header: Category & Icon */}
              <div className="relative z-10 flex items-center justify-between pb-6 border-b border-stroke/60">
                <span className="text-[11px] font-mono text-muted tracking-wider uppercase">
                  {item.category}
                </span>
                <div className="p-2 rounded-xl bg-bg border border-stroke group-hover:border-[#89AACC]/40 transition-colors">
                  {item.icon}
                </div>
              </div>

              {/* Large Instrument Serif Typography Number */}
              <div className="relative z-10 py-8">
                <span className="font-serif italic font-normal text-6xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-text via-text to-text/80 tracking-tight leading-none group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:via-[#a3c3e5] group-hover:to-[#4E85BF] transition-all duration-300 block select-none">
                  {item.number}
                </span>
              </div>

              {/* Card Footer: Label & Verified Subtext */}
              <div className="relative z-10 pt-4 border-t border-stroke/60 space-y-1">
                <h4 className="text-sm sm:text-base font-semibold text-text tracking-tight">
                  {item.label}
                </h4>
                <p className="text-xs text-muted/90 font-medium">
                  {item.subtext}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
