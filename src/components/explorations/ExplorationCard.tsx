import React from 'react';
import { ExplorationItem } from '../../data/explorations';
import { Maximize2 } from 'lucide-react';

interface ExplorationCardProps {
  item: ExplorationItem;
  onClick: () => void;
}

export const ExplorationCard: React.FC<ExplorationCardProps> = ({ item, onClick }) => {
  // Render distinct custom graphic canvas representation for each theme
  const renderVisual = () => {
    switch (item.id) {
      case 'exp-3d':
        return (
          <div className="w-full h-44 sm:h-52 rounded-2xl bg-[#090b10] border border-stroke/60 relative overflow-hidden flex items-center justify-center">
            {/* 3D wireframe geometric polygon simulation */}
            <div className="absolute inset-0 bg-[radial-gradient(#89AACC_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />
            <div className="relative w-28 h-28 border border-[#89AACC]/40 rounded-2xl rotate-45 flex items-center justify-center group-hover:rotate-90 transition-transform duration-700 ease-out shadow-[0_0_30px_rgba(137,170,204,0.15)]">
              <div className="w-16 h-16 border border-[#4E85BF]/60 rounded-xl -rotate-12 group-hover:rotate-45 transition-transform duration-700" />
            </div>
            <span className="absolute bottom-3 right-3 text-[10px] font-mono text-[#89AACC] px-2 py-0.5 rounded bg-bg/80 border border-stroke/70">
              WebGL 60FPS
            </span>
          </div>
        );
      case 'exp-dashboards':
        return (
          <div className="w-full h-44 sm:h-52 rounded-2xl bg-[#090b10] border border-stroke/60 relative overflow-hidden p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted font-mono">Real-time Telemetry</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            {/* SVG Telemetry Curve */}
            <svg className="w-full h-20" viewBox="0 0 200 60" preserveAspectRatio="none">
              <path
                d="M0,45 Q40,55 80,25 T140,20 T200,10"
                fill="none"
                stroke="#89AACC"
                strokeWidth="2.5"
              />
              <path
                d="M0,50 Q40,30 80,45 T140,35 T200,20"
                fill="none"
                stroke="#4E85BF"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
            </svg>
            <div className="flex items-center justify-between text-[10px] text-muted">
              <span>Latency: 18ms</span>
              <span className="text-[#89AACC]">99.9% Uptime</span>
            </div>
          </div>
        );
      case 'exp-healthcare':
        return (
          <div className="w-full h-44 sm:h-52 rounded-2xl bg-[#090b10] border border-stroke/60 relative overflow-hidden p-4 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#89AACC]" />
              <span className="text-xs font-semibold text-text">MedConsults Node</span>
            </div>
            <div className="space-y-1.5 py-2">
              <div className="p-2 rounded-lg bg-surface/80 border border-stroke/60 flex items-center justify-between text-xs">
                <span className="text-text font-medium text-[11px]">Dr. Jenkins (On Call)</span>
                <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Active</span>
              </div>
              <div className="p-2 rounded-lg bg-surface/80 border border-stroke/60 flex items-center justify-between text-xs">
                <span className="text-muted text-[11px]">Appointment Queue #409</span>
                <span className="text-[9px] text-[#89AACC] bg-[#89AACC]/10 px-1.5 py-0.5 rounded">Checked In</span>
              </div>
            </div>
            <span className="text-[10px] text-muted font-mono">Clinical Workflows</span>
          </div>
        );
      case 'exp-abstract-art':
        return (
          <div className="w-full h-44 sm:h-52 rounded-2xl bg-[#090b10] border border-stroke/60 relative overflow-hidden flex items-center justify-center">
            {/* Dynamic generative gradient ripples */}
            <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#89AACC]/30 via-[#4E85BF]/20 to-transparent blur-xl animate-pulse" />
            <div className="relative z-10 text-center space-y-1">
              <span className="font-serif italic text-2xl text-accent/90">Generative</span>
              <div className="text-[10px] font-mono text-muted">Simplex Noise Field</div>
            </div>
          </div>
        );
      case 'exp-typography':
        return (
          <div className="w-full h-44 sm:h-52 rounded-2xl bg-[#090b10] border border-stroke/60 relative overflow-hidden p-4 flex flex-col justify-between">
            <span className="text-[10px] text-muted tracking-widest uppercase">Font Pairing</span>
            <div className="space-y-1 text-center my-auto">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-text">Inter Sans</div>
              <div className="font-serif italic text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] to-[#4E85BF]">
                Instrument Serif
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-muted font-mono">
              <span>Grotesque Structure</span>
              <span>Expressive Elegance</span>
            </div>
          </div>
        );
      case 'exp-interfaces':
        return (
          <div className="w-full h-44 sm:h-52 rounded-2xl bg-[#090b10] border border-stroke/60 relative overflow-hidden p-4 flex flex-col justify-between">
            <span className="text-[10px] text-muted font-mono">Spring Physics</span>
            <div className="flex items-center justify-center gap-3 my-auto">
              <div className="px-3.5 py-2 rounded-full bg-surface border border-stroke text-xs text-text shadow-lg group-hover:scale-110 transition-transform duration-300">
                Hover Me
              </div>
              <div className="px-3.5 py-2 rounded-full bg-accent-gradient text-[#0a0a0a] text-xs font-semibold shadow-[0_0_15px_rgba(137,170,204,0.4)] group-hover:-translate-y-1 transition-transform duration-300">
                Tactile Action
              </div>
            </div>
            <span className="text-[10px] text-muted font-mono text-right">0.16s Smooth Dampening</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer rounded-3xl bg-surface/90 border border-stroke p-5 sm:p-6 transition-all duration-500 hover:border-[#89AACC]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden space-y-4"
    >
      {/* Animated subtle gradient border */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#89AACC]/30 via-transparent to-[#4E85BF]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-bg border border-stroke text-muted group-hover:text-text transition-colors">
          {item.theme}
        </span>
        <div className="h-7 w-7 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted group-hover:text-[#89AACC] group-hover:border-[#89AACC]/40 transition-colors">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Visual Canvas Representation */}
      <div className="overflow-hidden rounded-2xl group-hover:scale-[1.02] transition-transform duration-500">
        {renderVisual()}
      </div>

      {/* Details */}
      <div className="space-y-1.5">
        <h4 className="text-lg font-bold text-text group-hover:text-[#89AACC] transition-colors">
          {item.title}
        </h4>
        <p className="text-xs text-muted leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stroke/60">
        {item.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
