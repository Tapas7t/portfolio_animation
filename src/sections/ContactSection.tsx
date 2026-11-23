import React, { useEffect, useRef } from 'react';
import { HLSVideo } from '../components/common/HLSVideo';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Mail, ArrowUpRight, Github } from 'lucide-react';
import gsap from 'gsap';

const VIDEO_STREAM_URL =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  // Repeated 10 times as specified
  const marqueeContent = Array(10).fill('BUILDING DIGITAL EXPERIENCES • ').join('');

  useEffect(() => {
    if (!marqueeTrackRef.current) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Infinite smooth marquee animation
      const tween = gsap.to(marqueeTrackRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });

      const trackEl = marqueeTrackRef.current;
      if (trackEl) {
        const onEnter = () => tween.pause();
        const onLeave = () => tween.play();

        trackEl.addEventListener('mouseenter', onEnter);
        trackEl.addEventListener('mouseleave', onLeave);

        return () => {
          trackEl.removeEventListener('mouseenter', onEnter);
          trackEl.removeEventListener('mouseleave', onLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-[85vh] w-full flex flex-col justify-between overflow-hidden bg-bg border-t border-stroke/70"
    >
      {/* Background: Reused HLS Video, Flipped Vertically */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
        <HLSVideo
          src={VIDEO_STREAM_URL}
          className="absolute inset-0 w-full h-full object-cover scale-[1.03] scale-y-[-1] opacity-50 filter brightness-90"
        />

        {/* Dark overlay: black/60 and top/bottom gradient fade */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
      </div>

      {/* SECTION B.1: GSAP Infinite Marquee Ribbon (Pause on hover) */}
      <div className="relative z-10 w-full overflow-hidden border-y border-stroke/40 bg-surface/30 backdrop-blur-md py-3.5 my-8 cursor-default group/marquee">
        <div
          ref={marqueeTrackRef}
          className="flex whitespace-nowrap will-change-transform select-none"
        >
          {/* Track 1 */}
          <span className="font-sans font-extrabold text-sm sm:text-base tracking-[0.35em] uppercase text-text/80 px-4 group-hover/marquee:text-[#89AACC] transition-colors">
            {marqueeContent}
          </span>
          {/* Track 2 (for seamless loop with xPercent: -50) */}
          <span className="font-sans font-extrabold text-sm sm:text-base tracking-[0.35em] uppercase text-text/80 px-4 group-hover/marquee:text-[#89AACC] transition-colors">
            {marqueeContent}
          </span>
        </div>
      </div>

      {/* SECTION B.2: Main CTA */}
      <div className="relative z-10 my-auto py-12 md:py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/80 border border-stroke text-xs text-muted tracking-[0.25em] uppercase font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#89AACC] animate-pulse" />
              START A CONVERSATION
            </div>

            {/* Main Heading with Instrument Serif Accent */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-[1.15]">
              Have a project in mind? <br />
              Let's build something{' '}
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] via-[#a3c3e5] to-[#4E85BF]">
                meaningful.
              </span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted/95 max-w-xl mx-auto leading-relaxed">
              I'm interested in opportunities to build useful products, collaborate with creative people and continue growing as a developer.
            </p>

            {/* Email Button */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                href="mailto:contactattapas@gmail.com"
                leftIcon={<Mail className="w-4 h-4 text-[#0a0a0a]" />}
                rightIcon={<ArrowUpRight className="w-4 h-4 text-[#0a0a0a]" />}
                className="rounded-full px-8 py-4 font-semibold text-sm shadow-[0_0_25px_rgba(137,170,204,0.4)] hover:shadow-[0_0_35px_rgba(137,170,204,0.6)]"
              >
                contactattapas@gmail.com
              </Button>

              <Button
                variant="outline"
                size="lg"
                href="https://github.com/Tapas7t"
                external
                leftIcon={<Github className="w-4 h-4" />}
                className="rounded-full px-6 py-4 text-sm"
              >
                GitHub Profile
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom breathing room */}
      <div className="h-12 w-full" />
    </section>
  );
};
