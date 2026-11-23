export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  description: string;
  skills: SkillItem[];
}

export const aboutData = {
  name: 'Tapas',
  title: 'Full-Stack Developer | AI Enthusiast',
  bio: [
    "I'm a Computer Science graduate focused on building modern web applications and understanding the engineering behind them. My primary interest lies in Full-Stack Development, where I enjoy working across frontend interfaces, backend systems and databases to turn ideas into practical digital products.",
    "I'm continuously improving my engineering skills while exploring how AI can make software development and digital products more useful.",
  ],
  education: {
    degree: 'BSc Information Technology',
    institution: 'University of Mumbai',
    grade: 'CGPA: 6.95',
    description: 'Foundation in computing principles, software development lifecycles, database management, and computer networks.',
  },
  experience: {
    role: 'Business Development Executive',
    company: 'Diglok Trainer',
    description: 'Developed client communication, requirements scoping, and cross-functional operational workflows, connecting customer needs with technical service delivery.',
  },
  interests: [
    'Full-Stack Development',
    'Modern frontend architecture',
    'Backend development',
    'Database management',
    'AI-powered applications',
    'Product development',
  ],
  skillCategories: [
    {
      title: 'Frontend Architecture',
      category: 'frontend',
      description: 'Building responsive, accessible, and performant user interfaces with component-driven paradigms.',
      skills: [
        { name: 'React', category: 'frontend', highlight: true },
        { name: 'Next.js', category: 'frontend', highlight: true },
        { name: 'TypeScript', category: 'frontend', highlight: true },
        { name: 'JavaScript', category: 'frontend' },
        { name: 'Tailwind CSS', category: 'frontend', highlight: true },
        { name: 'HTML5', category: 'frontend' },
        { name: 'CSS3', category: 'frontend' },
      ],
    },
    {
      title: 'Backend Systems & APIs',
      category: 'backend',
      description: 'Developing modular servers, RESTful services, and robust application logic.',
      skills: [
        { name: 'Node.js', category: 'backend', highlight: true },
        { name: 'Express.js', category: 'backend', highlight: true },
      ],
    },
    {
      title: 'Database & Data Modeling',
      category: 'database',
      description: 'Designing document schemas, indexing strategies, and database query flows.',
      skills: [
        { name: 'MongoDB', category: 'database', highlight: true },
        { name: 'Mongoose', category: 'database', highlight: true },
      ],
    },
    {
      title: 'Developer Tooling & VCS',
      category: 'tools',
      description: 'Version control, collaborative workflows, and modern development toolchains.',
      skills: [
        { name: 'Git', category: 'tools', highlight: true },
        { name: 'GitHub', category: 'tools', highlight: true },
      ],
    },
  ] as SkillCategory[],
};
