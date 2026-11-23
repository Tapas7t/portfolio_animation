import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  serifWord?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  serifWord,
  description,
  align = 'left',
  className = '',
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-col space-y-3',
          align === 'center' ? 'items-center text-center' : 'items-start text-left',
          className
        )
      )}
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-surface border border-stroke text-muted uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-[#89AACC] animate-pulse" />
          {badge}
        </span>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text leading-tight">
        {title}{' '}
        {serifWord && (
          <span className="font-serif italic font-normal text-accent/90">
            {serifWord}
          </span>
        )}
      </h2>

      {description && (
        <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
