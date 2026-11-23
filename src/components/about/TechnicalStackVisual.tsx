import React from 'react';
import { Layers, Server, Database, GitBranch } from 'lucide-react';

export const TechnicalStackVisual: React.FC = () => {
  const layers = [
    {
      level: 'Frontend Layer',
      icon: <Layers className="w-3.5 h-3.5 text-[#89AACC]" />,
      summary: 'Reactive UI & Component Architecture',
      stack: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
      accent: 'from-[#89AACC]/20 to-transparent',
    },
    {
      level: 'API & Runtime',
      icon: <Server className="w-3.5 h-3.5 text-[#4E85BF]" />,
      summary: 'Modular Services & HTTP Handlers',
      stack: ['Node.js', 'Express.js', 'REST Endpoints'],
      accent: 'from-[#4E85BF]/20 to-transparent',
    },
    {
      level: 'Data Persistence',
      icon: <Database className="w-3.5 h-3.5 text-[#89AACC]" />,
      summary: 'Document Store & Schema Validation',
      stack: ['MongoDB', 'Mongoose ODM'],
      accent: 'from-[#89AACC]/20 to-transparent',
    },
    {
      level: 'Workflow & Versioning',
      icon: <GitBranch className="w-3.5 h-3.5 text-[#4E85BF]" />,
      summary: 'Continuous Version Control',
      stack: ['Git', 'GitHub Repositories'],
      accent: 'from-[#4E85BF]/20 to-transparent',
    },
  ];

  return (
    <div className="rounded-3xl bg-surface/90 border border-stroke p-6 sm:p-7 relative overflow-hidden font-sans space-y-5">
      {/* Subtle halftone background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(137,170,204,0.1)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-stroke/70">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#89AACC] animate-pulse" />
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-text">
            Full-Stack Architecture Matrix
          </h3>
        </div>
        <span className="text-[10px] font-mono text-muted">End-to-End Pipeline</span>
      </div>

      {/* Architecture Layers */}
      <div className="relative z-10 space-y-2.5">
        {layers.map((layer, index) => (
          <div
            key={layer.level}
            className="p-3 sm:p-3.5 rounded-2xl bg-bg/70 border border-stroke/70 hover:border-[#89AACC]/40 transition-colors duration-300 relative group"
          >
            {/* Top row */}
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-surface border border-stroke/60">
                  {layer.icon}
                </div>
                <span className="font-semibold text-text text-xs sm:text-sm">
                  {layer.level}
                </span>
              </div>
              <span className="text-[10px] text-muted hidden sm:inline-block">
                {layer.summary}
              </span>
            </div>

            {/* Stack Tags */}
            <div className="flex flex-wrap gap-1.5 pl-8">
              {layer.stack.map((item) => (
                <span
                  key={item}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-surface border border-stroke/60 text-muted group-hover:text-text transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Connecting line between layers */}
            {index < layers.length - 1 && (
              <div className="absolute left-[26px] -bottom-[12px] h-[10px] w-[1px] bg-stroke/80 z-0 hidden sm:block" />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 pt-2 border-t border-stroke/60 flex items-center justify-between text-[11px] text-muted">
        <span>Clean Code & Thoughtful Architecture</span>
        <span className="text-emerald-400 font-mono text-[10px]">Verified Stack</span>
      </div>
    </div>
  );
};
