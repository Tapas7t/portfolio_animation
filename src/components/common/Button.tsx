import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  external?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  href,
  external,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer';

  const variants = {
    primary:
      'bg-accent-gradient text-[#0a0a0a] font-semibold hover:opacity-95 shadow-[0_0_20px_rgba(78,133,191,0.25)] hover:shadow-[0_0_25px_rgba(137,170,204,0.4)]',
    secondary:
      'bg-surface text-text border border-stroke hover:border-muted/30 hover:bg-surface/80',
    outline:
      'bg-transparent text-text border border-stroke hover:border-accent/40 hover:bg-surface/50',
    ghost:
      'bg-transparent text-muted hover:text-text hover:bg-surface/60',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-4.5 py-2.5 gap-2',
    lg: 'text-base px-6.5 py-3.5 gap-2.5',
  };

  const combinedClass = twMerge(
    clsx(baseStyles, variants[variant], sizes[size], className)
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={combinedClass}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={combinedClass}
      {...(props as any)}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </motion.button>
  );
};
