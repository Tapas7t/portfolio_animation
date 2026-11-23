export interface PersonalInfo {
  name: string;
  role: string;
  shortBio: string;
  location: string;
  availability: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  navLinks: Array<{ label: string; href: string }>;
}

export const personalInfo: PersonalInfo = {
  name: 'Tapas',
  role: 'Full-Stack Developer | AI Enthusiast',
  shortBio: 'Crafting high-performance web applications, intelligent systems, and memorable digital experiences with modern web technologies.',
  location: 'India',
  availability: 'Open to opportunities.',
  socials: {
    github: 'https://github.com/Tapas7t',
    linkedin: 'https://linkedin.com',
    email: 'contactattapas@gmail.com',
  },
  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Journal', href: '#journal' },
    { label: 'Say hi', href: '#contact' },
  ],
};
