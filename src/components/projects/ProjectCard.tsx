import React from 'react';
import { Project } from '../../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  MedConsultsCoreMockup,
  MedConsultsDashboardMockup,
  MedConsultsPatientMockup,
  MedConsultsAppointmentsMockup,
} from './ProjectMockups';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onSelect,
}) => {
  // Select matching UI mockup based on project id
  const renderMockup = () => {
    switch (project.id) {
      case 'medconsults-core':
        return <MedConsultsCoreMockup />;
      case 'medconsults-dashboard':
        return <MedConsultsDashboardMockup />;
      case 'medconsults-patients':
        return <MedConsultsPatientMockup />;
      case 'medconsults-appointments':
        return <MedConsultsAppointmentsMockup />;
      default:
        return <MedConsultsCoreMockup />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`col-span-1 ${project.colSpan} group relative flex flex-col justify-between rounded-3xl bg-surface border border-stroke p-6 sm:p-8 transition-all duration-500 hover:border-[#89AACC]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] overflow-hidden`}
    >
      {/* 1. Halftone Dot Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(137,170,204,0.12)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

      {/* 2. Animated Gradient Border Overlay on Hover */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#89AACC]/40 via-transparent to-[#4E85BF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

      {/* 3. Top Card Header: Category & View Project Action */}
      <div className="relative z-10 flex items-center justify-between pb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-bg/80 border border-stroke text-muted backdrop-blur-md group-hover:border-[#89AACC]/30 group-hover:text-text transition-all duration-300">
          <span className="h-1.5 w-1.5 rounded-full bg-[#89AACC]" />
          {project.category}
        </span>

        {/* View Project Pill Button */}
        <button
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-muted hover:text-text bg-bg/60 border border-stroke hover:border-[#89AACC]/50 hover:bg-surface transition-all duration-300 focus:outline-none"
        >
          <span>View Project</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#89AACC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>

      {/* 4. Interactive UI Showcase Mockup Preview with Image Zoom on Hover */}
      <div
        onClick={() => onSelect(project)}
        className="relative z-10 my-4 w-full cursor-pointer overflow-hidden rounded-2xl group/mockup"
      >
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          {renderMockup()}
        </div>
      </div>

      {/* 5. Bottom Content: Title, Description & Feature Tags */}
      <div className="relative z-10 pt-4 border-t border-stroke/60 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h3
            onClick={() => onSelect(project)}
            className="text-xl sm:text-2xl font-bold text-text group-hover:text-[#89AACC] transition-colors duration-300 cursor-pointer"
          >
            {project.title}
          </h3>
          {project.metric && (
            <span className="shrink-0 text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#89AACC]/10 text-[#89AACC] border border-[#89AACC]/20">
              {project.metric.value}
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.features.slice(0, 3).map((feature, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-bg/70 border border-stroke/70 text-muted/90 font-medium"
            >
              {feature}
            </span>
          ))}
          {project.features.length > 3 && (
            <span className="text-[11px] px-2 py-1 rounded-lg bg-bg/40 text-muted font-mono">
              +{project.features.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
