import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Hero3DBackgroundProps {
  isLoaded: boolean;
}

export const Hero3DBackground: React.FC<Hero3DBackgroundProps> = ({ isLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const wireframesRef = useRef<HTMLDivElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);

  // Smooth mouse move parallax with 3D tilt
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
      targetX = x;
      targetY = y;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    // Smooth animation loop using lerp (linear interpolation)
    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (bgImageRef.current) {
        // Deep background layer: tilts gently
        const rotateY = currentX * 12; // -6deg to +6deg
        const rotateX = -currentY * 10; // -5deg to +5deg
        const translateX = currentX * -25;
        const translateY = currentY * -25;

        bgImageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, -20px) scale(1.12)`;
      }

      if (wireframesRef.current) {
        // Foreground wireframe layer: moves with exaggerated depth
        const fgTranslateX = currentX * 45;
        const fgTranslateY = currentY * 45;
        const fgRotateY = currentX * 16;
        const fgRotateX = -currentY * 14;

        wireframesRef.current.style.transform = `perspective(1000px) rotateX(${fgRotateX}deg) rotateY(${fgRotateY}deg) translate3d(${fgTranslateX}px, ${fgTranslateY}px, 40px)`;
      }

      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Entrance 3D zoom & reveal timeline when isLoaded triggers
  useEffect(() => {
    if (!isLoaded || !bgImageRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Cinematic 3D entrance: scale & blur resolve
      gsap.fromTo(
        bgImageRef.current,
        {
          scale: 1.25,
          filter: 'blur(12px) brightness(0.6)',
          opacity: 0,
        },
        {
          scale: 1.12,
          filter: 'blur(0px) brightness(0.95)',
          opacity: 1,
          duration: 1.8,
          ease: 'power3.out',
        }
      );

      // 2. Wireframe elements assemble into depth
      if (wireframesRef.current) {
        gsap.fromTo(
          wireframesRef.current.children,
          {
            opacity: 0,
            scale: 0.8,
            y: 40,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.12,
            duration: 1.4,
            ease: 'power2.out',
            delay: 0.3,
          }
        );
      }

      // 3. Periodic subtle ambient light sheen sweep
      if (lightSweepRef.current) {
        gsap.to(lightSweepRef.current, {
          x: '250%',
          opacity: 0.35,
          duration: 4,
          repeat: -1,
          repeatDelay: 5,
          ease: 'power1.inOut',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0"
      style={{ perspective: '1200px' }}
    >
      {/* BASE LAYER: 3D Isometric Cube Environment Artwork */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full will-change-transform transition-opacity duration-700"
        style={{
          backgroundImage: 'url(/assets/cubes-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Specular Ambient Light Sweep Layer */}
        <div
          ref={lightSweepRef}
          className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-r from-transparent via-[#89AACC]/10 to-transparent -rotate-45 pointer-events-none opacity-0"
        />
      </div>

      {/* FOREGROUND LAYER: Floating 3D Isometric Wireframe Cubes & Projections */}
      <div
        ref={wireframesRef}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Wireframe Cube 1: Top Left */}
        <div className="absolute top-[16%] left-[8%] w-24 h-24 sm:w-32 sm:h-32 opacity-40 animate-pulse transition-transform duration-1000">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#89AACC] fill-none stroke-[1.2]">
            {/* Isometric cube outline */}
            <polygon points="50,15 85,35 50,55 15,35" strokeDasharray="3 3" />
            <polygon points="15,35 50,55 50,90 15,70" />
            <polygon points="50,55 85,35 85,70 50,90" />
            {/* Hexagonal projection ring */}
            <polygon points="50,5 93,30 93,80 50,105 7,80 7,30" strokeOpacity="0.25" strokeDasharray="2 4" />
          </svg>
        </div>

        {/* Wireframe Cube 2: Top Right */}
        <div className="absolute top-[18%] right-[10%] w-28 h-28 sm:w-36 sm:h-36 opacity-45">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#4E85BF] fill-none stroke-[1.2]">
            <polygon points="50,15 85,35 50,55 15,35" />
            <polygon points="15,35 50,55 50,90 15,70" strokeDasharray="4 3" />
            <polygon points="50,55 85,35 85,70 50,90" />
            <circle cx="50" cy="55" r="2" className="fill-[#89AACC]" />
          </svg>
        </div>

        {/* Wireframe Cube 3: Bottom Left */}
        <div className="absolute bottom-[22%] left-[12%] w-20 h-20 sm:w-28 sm:h-28 opacity-35">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#89AACC] fill-none stroke-[1]">
            <polygon points="50,18 82,36 50,54 18,36" strokeDasharray="2 3" />
            <polygon points="18,36 50,54 50,86 18,68" />
            <polygon points="50,54 82,36 82,68 50,86" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Wireframe Cube 4: Bottom Right Floating */}
        <div className="absolute bottom-[18%] right-[14%] w-32 h-32 sm:w-44 sm:h-44 opacity-40">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#89AACC] fill-none stroke-[1.4]">
            <polygon points="50,12 90,34 50,56 10,34" />
            <polygon points="10,34 50,56 50,94 10,72" />
            <polygon points="50,56 90,34 90,72 50,94" strokeDasharray="4 3" />
            {/* Inner accent cube */}
            <polygon points="50,32 70,43 50,54 30,43" strokeOpacity="0.4" />
          </svg>
        </div>
      </div>

      {/* DEPTH & CONTRAST VIGNETTE LAYERS */}
      {/* Layer 1: Center Radial Contrast Mask (Ensures text "Tapas" and role subtitle stay 100% readable) */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]/90 pointer-events-none" />

      {/* Layer 2: Center ambient dark gradient tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/85 via-[#0a0a0a]/40 to-[#0a0a0a]" />

      {/* Layer 3: Central Radial Soft Blue Glow for depth warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[400px] sm:h-[500px] bg-gradient-to-tr from-[#89AACC]/10 to-[#4E85BF]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Layer 4: Bottom seamless gradient fade into Selected Works section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
    </div>
  );
};
