import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../../data/projects';
import { ArrowUpRight, ArrowRight, MoveHorizontal } from 'lucide-react';
import {
  MedConsultsCoreMockup,
  MedConsultsDashboardMockup,
  MedConsultsPatientMockup,
  MedConsultsAppointmentsMockup,
} from './ProjectMockups';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TiltedProjectsReelProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const TiltedProjectsReel: React.FC<TiltedProjectsReelProps> = ({
  projects,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Render appropriate interactive UI mockup
  const renderMockup = (id: string) => {
    switch (id) {
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

  useEffect(() => {
    const container = containerRef.current;
    const pinWrapper = pinWrapperRef.current;
    const track = trackRef.current;
    if (!container || !pinWrapper || !track) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal travel distance
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(trackWidth - viewportWidth + 140);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=180%',
          pin: pinWrapper,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      tl.to(track, {
        x: getScrollAmount,
        ease: 'none',
      });
    }, container);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280vh] bg-bg overflow-visible"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinWrapperRef}
        className="sticky top-0 w-full h-screen flex flex-col justify-between overflow-hidden py-10 sm:py-14 select-none z-10"
      >
        {/* Subtle Ambient Radial Light behind reel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#89AACC]/10 to-[#4E85BF]/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Top Control Header: Eyebrow, Title & Progress Indicator */}
        <div className="relative z-20 px-6 sm:px-12 md:px-16 flex items-center justify-between flex-wrap gap-4 w-full max-w-7xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface/80 border border-stroke text-xs text-muted tracking-[0.25em] uppercase font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#89AACC] animate-pulse" />
              FEATURED PROJECTS REEL
            </div>
            <h3 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-text font-normal mt-1.5">
              Kinetic Showcase
            </h3>
          </div>

          {/* Progress Bar & Hint */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted font-mono tracking-wider">
              <MoveHorizontal className="w-3.5 h-3.5 text-[#89AACC] animate-pulse" />
              <span>SCROLL TO GLIDE</span>
            </div>

            {/* Horizontal Progress Pill */}
            <div className="relative h-1.5 w-28 sm:w-36 bg-stroke/80 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full w-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] rounded-full origin-left transition-transform duration-75"
                style={{ transform: `scaleX(${scrollProgress})` }}
              />
            </div>

            <span className="text-xs font-mono text-[#89AACC]">
              {String(Math.min(projects.length, Math.floor(scrollProgress * projects.length) + 1)).padStart(2, '0')}{' '}
              <span className="text-muted">/ 0{projects.length}</span>
            </span>
          </div>
        </div>

        {/* Side Edge Feathered Masks (Cards emerge and dissolve smoothly) */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none z-30" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none z-30" />

        {/* TILTED TRACK WRAPPER (-3.2deg angle) */}
        <div
          className="relative w-full my-auto py-8 sm:py-12 overflow-visible"
          style={{
            transform: 'rotate(-3deg) translateZ(0)',
            transformOrigin: 'center center',
          }}
        >
          {/* Moving Reel Track */}
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-10 px-8 sm:px-20 will-change-transform"
          >
            {projects.map((project) => {
              const isHovered = hoveredId === project.id;

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelectProject(project)}
                  style={{
                    transform: isHovered
                      ? 'rotate(3deg) scale(1.03) translateY(-10px)'
                      : 'rotate(0deg) scale(1) translateY(0)',
                    transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className={`w-[340px] sm:w-[460px] md:w-[540px] h-[480px] sm:h-[530px] shrink-0 rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer relative overflow-hidden group select-none shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${
                    isHovered
                      ? 'bg-surface/95 border-[#89AACC]/50 z-30 shadow-[0_30px_60px_rgba(137,170,204,0.2)]'
                      : 'bg-surface/75 border-stroke/80 z-10'
                  } border backdrop-blur-md`}
                >
                  {/* Subtle Halftone Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(137,170,204,0.12)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Gradient Border Glow */}
                  <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#89AACC]/40 via-transparent to-[#4E85BF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

                  {/* Top Card Header */}
                  <div className="relative z-10 flex items-center justify-between pb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-bg/85 border border-stroke text-muted backdrop-blur-md group-hover:border-[#89AACC]/40 group-hover:text-text transition-all duration-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#89AACC]" />
                      {project.category}
                    </span>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-medium text-muted group-hover:text-[#89AACC] transition-colors duration-300"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>

                  {/* Center Interactive UI Mockup */}
                  <div className="relative z-10 my-auto py-2 overflow-hidden rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                    {renderMockup(project.id)}
                  </div>

                  {/* Bottom Info Section */}
                  <div className="relative z-10 pt-4 border-t border-stroke/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif italic text-xl sm:text-2xl text-text font-normal group-hover:text-[#89AACC] transition-colors duration-300">
                        {project.title}
                      </h4>
                      {project.metric && (
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono tracking-wider bg-[#89AACC]/15 text-[#89AACC] border border-[#89AACC]/30">
                          {project.metric.value}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-muted font-sans font-light line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono text-muted bg-stroke/40 border border-stroke/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Helper Bar */}
        <div className="relative z-20 px-6 sm:px-12 flex items-center justify-between text-xs text-muted font-mono tracking-wider w-full max-w-7xl mx-auto">
          <span className="hidden sm:inline">01 — CLINIC CORE · 02 — DASHBOARD · 03 — PATIENT EMR · 04 — APPOINTMENTS</span>
          <span className="flex items-center gap-1.5 text-[#89AACC]">
            <span>Click any card for full case study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
