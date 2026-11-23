import React from 'react';
import { Container } from '../common/Container';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full border-t border-stroke/70 bg-surface/40 backdrop-blur-md py-12 select-none relative z-20">
      <Container>
        {/* Top Footer Row: Status, Brand & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-stroke/50">
          {/* Identity & Availability Pill */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <span className="font-serif italic font-normal text-2xl text-text leading-none">
                Tapas
              </span>
              <span className="text-stroke">/</span>
              <span className="text-xs text-muted font-sans">Full-Stack Developer</span>
            </div>

            {/* Availability Indicator with Green Pulsing Dot */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-stroke text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 font-medium">Open to opportunities.</span>
            </div>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={handleScrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-stroke text-xs font-medium text-muted hover:text-text hover:border-[#89AACC]/40 hover:bg-surface/90 transition-all focus:outline-none"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <div className="h-6 w-6 rounded-full bg-bg border border-stroke flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
              <ArrowUp className="w-3.5 h-3.5 text-[#89AACC]" />
            </div>
          </button>
        </div>

        {/* Bottom Footer Row: Social Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-muted">
          {/* Copyright */}
          <div className="text-center sm:text-left">
            <span>© {currentYear} Tapas. All rights reserved.</span>
          </div>

          {/* Verified Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Tapas7t"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-surface border border-stroke text-muted hover:text-text hover:border-[#89AACC]/40 transition-colors flex items-center gap-1.5"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4 text-[#89AACC]" />
              <span className="text-xs hidden md:inline">GitHub</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-surface border border-stroke text-muted hover:text-text hover:border-[#4E85BF]/40 transition-colors flex items-center gap-1.5"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-[#4E85BF]" />
              <span className="text-xs hidden md:inline">LinkedIn</span>
            </a>

            <a
              href="mailto:contactattapas@gmail.com"
              className="p-2 rounded-xl bg-surface border border-stroke text-muted hover:text-text hover:border-[#89AACC]/40 transition-colors flex items-center gap-1.5"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4 text-[#89AACC]" />
              <span className="text-xs hidden md:inline">Email</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
