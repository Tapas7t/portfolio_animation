export interface ExplorationItem {
  id: string;
  title: string;
  theme: string;
  column: 1 | 2;
  description: string;
  technologies: string[];
  aspectRatio: string;
  accentColor: string;
  details: {
    approach: string;
    highlights: string[];
  };
}

export const explorationItems: ExplorationItem[] = [
  {
    id: 'exp-3d',
    title: '3D Web Experiences',
    theme: 'Three.js & WebGL shaders',
    column: 1,
    description:
      'Volumetric lighting, interactive geometry, and particle simulations running at 60 FPS in browser contexts.',
    technologies: ['Three.js', 'GLSL Shaders', 'WebGL', 'Framer Motion 3D'],
    aspectRatio: 'aspect-[4/5]',
    accentColor: '#89AACC',
    details: {
      approach:
        'Experimenting with hardware-accelerated 3D viewports that remain lightweight on mobile devices using optimized buffer geometries and custom fragment shaders.',
      highlights: [
        'Real-time mouse coordinate raycasting',
        'Bloom and grain post-processing pipelines',
        'Responsive camera frustum compensation',
      ],
    },
  },
  {
    id: 'exp-dashboards',
    title: 'Modern Dashboards',
    theme: 'Dark data visualization & telemetry',
    column: 1,
    description:
      'High-density clinical and engineering telemetry interfaces balancing deep dark aesthetics with data clarity.',
    technologies: ['React', 'SVG Charts', 'Tailwind CSS', 'Telemetry Streams'],
    aspectRatio: 'aspect-square',
    accentColor: '#4E85BF',
    details: {
      approach:
        'Designing operational surfaces where critical metrics stand out instantly through hierarchical font weights and soft cyan-blue accents.',
      highlights: [
        'Dynamic SVG area curves with multi-stop alpha gradients',
        'Interactive timeline scrubbers',
        'Micro-status heartbeat pulses',
      ],
    },
  },
  {
    id: 'exp-healthcare',
    title: 'Healthcare Technology',
    theme: 'MedConsults clinical workflows',
    column: 1,
    description:
      'Intuitive hospital and clinic interfaces simplifying physician scheduling, patient triage, and health record management.',
    technologies: ['TypeScript', 'Design Systems', 'Data Grid', 'EMR Standards'],
    aspectRatio: 'aspect-[4/5]',
    accentColor: '#89AACC',
    details: {
      approach:
        'Translating complex medical workflows into human-centric forms and calendar views that minimize cognitive friction for doctors and administrative staff.',
      highlights: [
        'Instant multi-filter record query interface',
        'Conflict-free multi-doctor scheduling engine',
        'Color-coded triage status indicators',
      ],
    },
  },
  {
    id: 'exp-abstract-art',
    title: 'Abstract Digital Art',
    theme: 'Generative canvas & fluid shaders',
    column: 2,
    description:
      'Algorithmic noise maps, procedural gradients, and mathematical pattern generators driven by user inputs.',
    technologies: ['HTML5 Canvas', 'Perlin Noise', 'Math Algorithms', 'CSS Filters'],
    aspectRatio: 'aspect-square',
    accentColor: '#4E85BF',
    details: {
      approach:
        'Generating dynamic visual textures using mathematical oscillation formulas and simplex noise fields for hero backgrounds and ambient backdrops.',
      highlights: [
        'Procedural simplex noise mesh animation',
        'Custom color lookup palettes based on hex seeds',
        'Zero external asset load overhead',
      ],
    },
  },
  {
    id: 'exp-typography',
    title: 'Creative Typography',
    theme: 'Expressive serifs & kinetic layouts',
    column: 2,
    description:
      'Harmonizing structural Inter grotesque typography with the expressive human warmth of Instrument Serif italic.',
    technologies: ['CSS Typography', 'Variable Fonts', 'Kinetic Motion', 'Text Tickers'],
    aspectRatio: 'aspect-[4/5]',
    accentColor: '#89AACC',
    details: {
      approach:
        'Exploring the interplay of stark functional sans-serif headers with elegant Italian-style editorial serif accents to evoke digital craft.',
      highlights: [
        'Fluid clamp typography rules across 320px to 2560px viewports',
        'Blur-to-focus GSAP letter reveals',
        'Subtle typographic tracking expansion on scroll',
      ],
    },
  },
  {
    id: 'exp-interfaces',
    title: 'Interactive Interfaces',
    theme: 'Physics-based springs & micro-feedback',
    column: 2,
    description:
      'Tactile button physics, magnetic cursor interactions, and fluid drawer navigation patterns.',
    technologies: ['Framer Motion', 'GSAP', 'Pointer Events', 'Micro-interactions'],
    aspectRatio: 'aspect-square',
    accentColor: '#4E85BF',
    details: {
      approach:
        'Crafting micro-interactions where buttons, cards, and modal dismissals respond with proportional velocity and natural spring dampening.',
      highlights: [
        'Spring physics tuned to [0.16, 1, 0.3, 1] response curves',
        'Magnetic cursor snapping on interactive pills',
        'Fluid swipe-to-dismiss gesture support',
      ],
    },
  },
];
