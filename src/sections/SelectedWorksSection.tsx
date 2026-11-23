import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectModal } from '../components/projects/ProjectModal';
import { TiltedProjectsReel } from '../components/projects/TiltedProjectsReel';
import { projects, Project } from '../data/projects';
import { motion } from 'framer-motion';
import { Film, LayoutGrid } from 'lucide-react';

export const SelectedWorksSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'reel' | 'grid'>('reel');

  return (
    <section id="work" className="border-t border-stroke/70 relative bg-bg scroll-mt-20">
      {/* Subtle Radial Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#89AACC]/8 to-[#4E85BF]/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Section Header with View Mode Switcher */}
      <div className="pt-24 pb-8">
        <Container>
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4">
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

            {/* View Mode Switcher (Tilted Reel vs Bento Grid) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="pt-2 flex items-center p-1 rounded-full bg-[#121214] border border-stroke/80 shadow-md"
            >
              <button
                type="button"
                onClick={() => setViewMode('reel')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2 ${
                  viewMode === 'reel'
                    ? 'bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-[#0a0a0a] font-semibold shadow-sm'
                    : 'text-muted hover:text-text'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Tilted Kinetic Reel</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-[#0a0a0a] font-semibold shadow-sm'
                    : 'text-muted hover:text-text'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Bento Grid</span>
              </button>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* VIEW 1: Tilted Kinetic Horizontal Reel (Option 1 - Scroll-driven pinned track) */}
      {viewMode === 'reel' && (
        <TiltedProjectsReel
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />
      )}

      {/* VIEW 2: 12-Column Responsive Bento Grid (Classic Stage 3 Layout) */}
      {viewMode === 'grid' && (
        <Container className="pb-24">
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
      )}

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
