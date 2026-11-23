export interface ResumeData {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  pdfUrl: string;
  pdfFilename: string;
  careerObjective: string;
  skills: {
    frontend: string[];
    backend: string[];
    database: string[];
    authentication: string[];
    tools: string[];
    coreConcepts: string[];
    softSkills: string[];
  };
  projects: Array<{
    title: string;
    role: string;
    tech: string[];
    points: string[];
  }>;
  experience: Array<{
    role: string;
    company: string;
    period: string;
    points: string[];
  }>;
  education: {
    degree: string;
    institution: string;
    period: string;
    cgpa: string;
  };
  languages: string[];
  interests: string[];
}

export const resumeData: ResumeData = {
  name: 'Tapas Karmakar',
  title: 'Full-Stack Developer | React · Next.js · Node.js · MongoDB',
  location: 'Mumbai, Maharashtra, India',
  phone: '+91-9152613126',
  email: 'contactattapas@gmail.com',
  pdfUrl: '/Tapas_Karmakar_Resume.pdf',
  pdfFilename: 'Tapas_Karmakar_Resume.pdf',
  careerObjective:
    'Full-Stack Developer and B.Sc. IT graduate (2026) who builds responsive, user-focused web applications with React, Next.js, TypeScript, Node.js, Express.js, and MongoDB. Built MedConsults, an end-to-end medical appointment booking app covering UI, REST APIs, database design, and authentication. Brings business development experience in client communication, lead management, and cross-team coordination. Seeking a Junior Full-Stack Developer role to contribute to real products and keep growing.',
  skills: {
    frontend: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    backend: ['Node.js', 'Express.js', 'RESTful API design'],
    database: ['MongoDB'],
    authentication: ['Session-based authentication (email and password)'],
    tools: ['Git', 'GitHub', 'VS Code'],
    coreConcepts: ['CRUD operations', 'Responsive web design', 'Full-stack application architecture'],
    softSkills: ['Communication', 'Teamwork', 'Problem solving', 'Client coordination'],
  },
  projects: [
    {
      title: 'MedConsults – Medical Appointment Booking Application',
      role: 'Full-Stack Web Application',
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose'],
      points: [
        'Built a full-stack platform that lets patients find doctors and book consultations, simplifying the appointment process.',
        'Developed a responsive, type-safe frontend using Next.js, React, TypeScript, and Tailwind CSS.',
        'Designed RESTful APIs with Node.js and Express.js to handle appointments, users, and application data.',
        'Modeled data in MongoDB with Mongoose schemas, hosted on MongoDB Atlas.',
        'Implemented secure session-based authentication with email and password login.',
        'Structured the codebase for maintainability, with clear separation of frontend and backend layers.',
      ],
    },
  ],
  experience: [
    {
      role: 'Business Development Executive',
      company: 'Diglok Trainer',
      period: 'May 2026 – September 2026',
      points: [
        'Managed and followed up with prospective customer leads, keeping the sales pipeline active.',
        'Communicated with prospects to understand their needs and recommend suitable training programs.',
        'Scheduled meetings and supported the course enrollment process from inquiry to sign-up.',
        'Maintained lead and customer records and prepared reports for internal teams.',
        'Coordinated with cross-functional teams to support daily business operations.',
      ],
    },
  ],
  education: {
    degree: 'Bachelor of Science in Information Technology (B.Sc. IT)',
    institution: 'University of Mumbai (Vasai College of Science and Technology)',
    period: '2023 – 2026',
    cgpa: '6.95 / 10',
  },
  languages: ['English', 'Hindi', 'Bengali'],
  interests: [
    'Building scalable, maintainable, user-focused web applications',
    'Learning new technologies and software tools',
  ],
};
