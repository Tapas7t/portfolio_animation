import React, { useEffect } from 'react';
import { Project } from '../../data/projects';
import { X, CheckCircle2, ArrowUpRight, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface border border-stroke rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-surface border border-stroke text-muted hover:text-text hover:border-accent/40 transition-colors focus:outline-none"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#89AACC]/15 text-[#89AACC] border border-[#89AACC]/30">
              {project.category}
            </span>
            <span className="text-xs text-muted flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {project.status}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text tracking-tight">
            {project.title}
          </h2>

          <p className="text-sm sm:text-base text-muted leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Metric Highlight if available */}
        {project.metric && (
          <div className="p-4 rounded-2xl bg-bg/80 border border-stroke flex items-center gap-4">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] to-[#4E85BF]">
              {project.metric.value}
            </div>
            <div className="text-xs sm:text-sm text-muted">
              {project.metric.label}
            </div>
          </div>
        )}

        {/* Detailed Overview */}
        <div className="space-y-3">
          <h3 className="text-sm uppercase tracking-wider font-semibold text-text flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#89AACC]" />
            Architecture Overview
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {project.details.overview}
          </p>
        </div>

        {/* Key Deliverables */}
        <div className="space-y-3">
          <h3 className="text-sm uppercase tracking-wider font-semibold text-text flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Key Deliverables & Workflows
          </h3>
          <ul className="space-y-2">
            {project.details.keyDeliverables.map((item, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-muted flex items-start gap-2.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#89AACC] mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Tags */}
        <div className="space-y-3 pt-2 border-t border-stroke">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-muted flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#4E85BF]" />
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.details.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-bg border border-stroke text-text/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-stroke flex items-center justify-between">
          <span className="text-xs text-muted font-mono">
            Tapas · MedConsults Systems
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={onClose}
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Close Overview
          </Button>
        </div>
      </div>
    </div>
  );
};
