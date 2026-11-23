export interface JournalEntry {
  id: string;
  title: string;
  focus: string;
  category: string;
  readTime: string;
  summary: string;
  gradient: string;
  tags: string[];
}

export const journalEntries: JournalEntry[] = [
  {
    id: 'modern-fullstack',
    title: 'Building Modern Full-Stack Applications',
    focus: 'React, Next.js and backend architecture.',
    category: 'Architecture',
    readTime: '5 min read',
    summary:
      'Examining architectural patterns for full-stack web systems. Breaking down component modularity, server-side data fetching strategies in Next.js, and how to maintain typed contracts between frontend clients and RESTful backends.',
    gradient: 'from-[#89AACC] to-[#4E85BF]',
    tags: ['Next.js', 'React', 'Node.js', 'TypeScript'],
  },
  {
    id: 'idea-to-product',
    title: 'From Idea to Product',
    focus: 'My approach to developing MedConsults.',
    category: 'Product Engineering',
    readTime: '6 min read',
    summary:
      'A deep dive into turning an operational concept into an active software system. How I scoped clinic pain points, designed the appointment conflict engine, structured patient records, and validated user flows for MedConsults.',
    gradient: 'from-[#4E85BF] to-[#89AACC]',
    tags: ['Case Study', 'Product Design', 'Healthcare'],
  },
  {
    id: 'ai-development',
    title: 'Exploring AI-Powered Development',
    focus: 'Understanding AI tools and modern development workflows.',
    category: 'AI & Workflows',
    readTime: '4 min read',
    summary:
      'Reflections on how autonomous coding agents, LLM tool-calling interfaces, and AI assistance enhance developer velocity. Practical workflows for integrating AI into daily software development without losing rigorous verification.',
    gradient: 'from-[#89AACC] via-[#7598c2] to-[#4E85BF]',
    tags: ['AI Agents', 'Developer Tools', 'Workflows'],
  },
  {
    id: 'better-ux',
    title: 'Designing Better User Experiences',
    focus: 'Why thoughtful UI/UX matters in software engineering.',
    category: 'Design & UX',
    readTime: '5 min read',
    summary:
      'Why user experience is not just visual polish, but an engineering discipline. How spatial rhythm, state handling, micro-interactions, and accessibility directly determine user adoption and software trust.',
    gradient: 'from-[#4E85BF] via-[#6a97cc] to-[#89AACC]',
    tags: ['UI/UX', 'Micro-interactions', 'Accessibility'],
  },
];
