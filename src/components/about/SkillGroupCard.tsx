import React from 'react';
import { SkillCategory } from '../../data/about';
import { Layout, Server, Database, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillGroupCardProps {
  category: SkillCategory;
  index: number;
}

export const SkillGroupCard: React.FC<SkillGroupCardProps> = ({
  category,
  index,
}) => {
  const getCategoryIcon = () => {
    switch (category.category) {
      case 'frontend':
        return <Layout className="w-4 h-4 text-[#89AACC]" />;
      case 'backend':
        return <Server className="w-4 h-4 text-[#4E85BF]" />;
      case 'database':
        return <Database className="w-4 h-4 text-[#89AACC]" />;
      case 'tools':
        return <Wrench className="w-4 h-4 text-[#4E85BF]" />;
      default:
        return <Layout className="w-4 h-4 text-[#89AACC]" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-3xl bg-surface/85 border border-stroke p-5 sm:p-6 transition-all duration-300 hover:border-[#89AACC]/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      {/* Soft gradient edge glow on hover */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#89AACC]/20 via-transparent to-[#4E85BF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex items-center gap-2.5 pb-2.5 border-b border-stroke/60">
        <div className="h-8 w-8 rounded-xl bg-bg border border-stroke flex items-center justify-center shrink-0">
          {getCategoryIcon()}
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-text group-hover:text-[#89AACC] transition-colors">
            {category.title}
          </h4>
          <p className="text-[11px] text-muted line-clamp-1">
            {category.description}
          </p>
        </div>
      </div>

      {/* Skill Pills (Clean badges, zero fake percentages) */}
      <div className="flex flex-wrap gap-2 pt-4">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 select-none ${
              skill.highlight
                ? 'bg-bg border border-stroke text-text hover:border-[#89AACC]/50 hover:text-[#89AACC] hover:shadow-[0_0_10px_rgba(137,170,204,0.15)]'
                : 'bg-bg/60 border border-stroke/60 text-muted hover:text-text'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                skill.highlight ? 'bg-[#89AACC]' : 'bg-muted/60'
              }`}
            />
            {skill.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
