import React from 'react';
import { Container } from '../components/common/Container';
import { SkillGroupCard } from '../components/about/SkillGroupCard';
import { TechnicalStackVisual } from '../components/about/TechnicalStackVisual';
import { aboutData } from '../data/about';
import { GraduationCap, Briefcase, Sparkles, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-stroke/70 relative bg-bg overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[300px] bg-gradient-to-tr from-[#89AACC]/8 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[300px] bg-gradient-to-bl from-[#4E85BF]/8 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/80 border border-stroke text-xs text-muted tracking-[0.25em] uppercase font-semibold"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#89AACC] animate-pulse" />
            ABOUT & CAPABILITIES
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-tight"
          >
            Engineering with{' '}
            <span className="font-serif italic font-normal text-accent/90">
              purpose & precision
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-muted max-w-xl leading-relaxed"
          >
            Full-Stack Developer based in India, bridging scalable backend services with intuitive user interfaces.
          </motion.p>
        </div>

        {/* Asymmetric 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (5 Cols): Narrative, Education, Experience & Interests */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Personal Narrative Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-surface border border-stroke p-6 sm:p-8 space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-text uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#89AACC]" />
                Profile & Vision
              </div>

              <div className="space-y-3.5 text-sm sm:text-base text-muted/90 font-normal leading-relaxed">
                {aboutData.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            {/* 2. Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl bg-surface/80 border border-stroke p-6 space-y-3 relative group hover:border-[#89AACC]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-text uppercase tracking-wider">
                  <div className="p-1.5 rounded-lg bg-bg border border-stroke">
                    <GraduationCap className="w-4 h-4 text-[#89AACC]" />
                  </div>
                  Education
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#89AACC]/15 text-[#89AACC] border border-[#89AACC]/30">
                  {aboutData.education.grade}
                </span>
              </div>

              <div>
                <h4 className="text-base font-semibold text-text">
                  {aboutData.education.degree}
                </h4>
                <div className="text-xs text-[#89AACC] font-medium mt-0.5">
                  {aboutData.education.institution}
                </div>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                {aboutData.education.description}
              </p>
            </motion.div>

            {/* 3. Professional Experience Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-3xl bg-surface/80 border border-stroke p-6 space-y-3 relative group hover:border-[#4E85BF]/40 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-text uppercase tracking-wider">
                <div className="p-1.5 rounded-lg bg-bg border border-stroke">
                  <Briefcase className="w-4 h-4 text-[#4E85BF]" />
                </div>
                Experience
              </div>

              <div>
                <h4 className="text-base font-semibold text-text">
                  {aboutData.experience.role}
                </h4>
                <div className="text-xs text-[#4E85BF] font-medium mt-0.5">
                  {aboutData.experience.company}
                </div>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                {aboutData.experience.description}
              </p>
            </motion.div>

            {/* 4. Professional Interests Pills */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl bg-surface/60 border border-stroke/80 p-6 space-y-3"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-text uppercase tracking-wider">
                <Compass className="w-4 h-4 text-[#89AACC]" />
                Core Engineering Interests
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {aboutData.interests.map((interest) => (
                  <span
                    key={interest}
                    className="text-xs px-3 py-1.5 rounded-full bg-bg border border-stroke/70 text-text/85 hover:border-accent/40 transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column (7 Cols): Categorized Skills & Architecture Visual */}
          <div className="lg:col-span-7 space-y-6">
            {/* Technical Stack Architecture Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TechnicalStackVisual />
            </motion.div>

            {/* Categorized Skill Groups Grid (2x2 on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutData.skillCategories.map((category, idx) => (
                <SkillGroupCard
                  key={category.category}
                  category={category}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
