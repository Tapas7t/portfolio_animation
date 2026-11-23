import React, { useState, useEffect } from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  id: string;
  isSpecial?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Journal', href: '#journal', id: 'journal' },
  { label: 'Say hi', href: '#contact', id: 'contact', isSpecial: true },
];

export const Navbar: React.FC = () => {
  const scrollY = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const isScrolled = scrollY > 100;

  // ScrollSpy to track active section
  useEffect(() => {
    const sectionIds = ['home', 'work', 'about', 'journal', 'explorations', 'contact'];

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);

      if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (href === '#resume') {
        window.open('/resume.pdf', '_blank');
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        const navHeight = 90;
        const targetPosition = (target as HTMLElement).offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>
      {/* Floating Pill Navbar Fixed at Top Center */}
      <header
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[92%] sm:w-auto transition-all duration-300 ${
          isScrolled
            ? 'shadow-[0_16px_40px_rgba(0,0,0,0.7)] border-stroke bg-surface/90 backdrop-blur-xl'
            : 'shadow-[0_8px_30px_rgba(0,0,0,0.35)] border-stroke/70 bg-surface/65 backdrop-blur-md'
        } rounded-full border px-3.5 py-2 sm:px-5 sm:py-2.5`}
      >
        <div className="flex items-center justify-between sm:gap-7">
          {/* Logo with Circular Gradient Border & Hover Rotation */}
          <a
            href="#home"
            onClick={(e) => handleScrollClick(e, '#home')}
            className="group flex items-center gap-2.5 outline-none"
            aria-label="Tapas Home"
          >
            <div className="relative h-9 w-9 rounded-full p-[1.5px] bg-gradient-to-tr from-[#89AACC] via-[#1f1f1f] to-[#4E85BF] transition-all duration-500 ease-out group-hover:rotate-180 group-hover:from-[#4E85BF] group-hover:to-[#89AACC] shadow-[0_0_12px_rgba(137,170,204,0.25)]">
              <div className="h-full w-full rounded-full bg-surface flex items-center justify-center transition-transform duration-500 group-hover:-rotate-180">
                <span className="font-serif italic font-normal text-text text-lg leading-none select-none">
                  T
                </span>
              </div>
            </div>
            <span className="font-sans font-medium text-xs tracking-wider uppercase text-muted group-hover:text-text transition-colors hidden sm:inline-block">
              Tapas
            </span>
          </a>

          {/* Desktop Navigation Links with Active Spy Highlighting */}
          <nav className="hidden md:flex items-center gap-1 relative">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              if (item.isSpecial) {
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => handleScrollClick(e, item.href)}
                    className="ml-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-[#0a0a0a] bg-accent-gradient hover:opacity-95 shadow-[0_0_15px_rgba(137,170,204,0.3)] hover:shadow-[0_0_20px_rgba(137,170,204,0.5)] transition-all select-none"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </motion.a>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollClick(e, item.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 select-none ${
                    isActive
                      ? 'text-text font-semibold'
                      : 'text-muted hover:text-text hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-stroke/80 -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => handleScrollClick(e, '#contact')}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-[#0a0a0a] bg-accent-gradient"
            >
              <span>Say hi</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full text-muted hover:text-text hover:bg-white/[0.05] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[92%] z-40 md:hidden bg-surface/95 backdrop-blur-2xl border border-stroke rounded-2xl p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollClick(e, item.href)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.isSpecial
                    ? 'bg-accent-gradient text-[#0a0a0a] font-semibold mt-2'
                    : activeSection === item.id
                    ? 'bg-white/[0.08] text-text font-semibold'
                    : 'text-muted hover:text-text hover:bg-white/[0.04]'
                }`}
              >
                <span>{item.label}</span>
                {item.isSpecial ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : item.label === 'Resume' ? (
                  <FileText className="w-4 h-4 text-muted" />
                ) : null}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};
