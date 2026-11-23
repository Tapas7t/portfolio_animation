import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectModal } from '../components/projects/ProjectModal';
import { projects, Project } from '../data/projects';
import { motion } from 'framer-motion';

export const SelectedWorksSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-24 md:py-32 border-t border-stroke/70 relative bg-bg">
      {/* Subtle Radial Ambient Glow behind grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#89AACC]/8 to-[#4E85BF]/8 rounded-full blur-[140px] pointer-events-none" />

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
            SELECTED WORK
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-tight"
          >
            Featured{' '}
            <span className="font-serif italic font-normal text-accent/90">
              projects
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-muted leading-relaxed"
          >
            A selection of projects focused on solving practical problems through thoughtful design and modern technology.
          </motion.p>
        </div>

        {/* 12-Column Responsive Bento Grid */}
        {/* Row 1: Card 1 (7 cols), Card 2 (5 cols) */}
        {/* Row 2: Card 3 (5 cols), Card 4 (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </Container>

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
