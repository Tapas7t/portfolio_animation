export interface Project {
  id: string;
  title: string;
  category: string;
  colSpan: string; // e.g. "lg:col-span-7" or "lg:col-span-5"
  description: string;
  features: string[];
  tags: string[];
  status: string;
  metric?: {
    value: string;
    label: string;
  };
  details: {
    overview: string;
    keyDeliverables: string[];
    techStack: string[];
  };
}

export const projects: Project[] = [
  {
    id: 'medconsults-core',
    title: 'MedConsults',
    category: 'Healthcare Technology',
    colSpan: 'lg:col-span-7',
    description:
      'A complete clinic management system designed to simplify healthcare operations by connecting patients, doctors and clinic administration into one unified platform.',
    features: [
      'Multiple doctor management',
      'Patient directory & intake',
      'Appointment scheduling engine',
      'Clinic operations dashboard',
      'Analytics & clinical workflows',
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    status: 'Production System',
    metric: {
      value: '40%',
      label: 'Reduction in admin check-in overhead',
    },
    details: {
      overview:
        'MedConsults connects healthcare stakeholders with an intuitive clinic operations engine. It eliminates fragmented spreadsheets and siloed scheduling by integrating patient histories, active consultations, doctor rosters, and administrative billing into a centralized, HIPAA-aligned architecture.',
      keyDeliverables: [
        'Centralized multi-specialty physician scheduling and room allocation',
        'Electronic patient record lifecycle from intake to post-consultation',
        'Real-time clinic waiting queue with doctor availability signaling',
        'Exportable clinical reports and regulatory audit trails',
      ],
      techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Prisma', 'REST APIs'],
    },
  },
  {
    id: 'medconsults-dashboard',
    title: 'MedConsults Dashboard',
    category: 'Dashboard & Analytics',
    colSpan: 'lg:col-span-5',
    description:
      'Visual intelligence interface delivering real-time clinic throughput metrics, active consultation volumes, and doctor workload analytics.',
    features: [
      'Live patient throughput monitoring',
      'Doctor utilization tracking',
      'Daily appointment velocity charts',
      'Clinic revenue & visit telemetry',
    ],
    tags: ['Data Visualization', 'Analytics', 'Tailwind CSS', 'Charts'],
    status: 'Live Intelligence',
    metric: {
      value: '99.8%',
      label: 'Roster schedule uptime',
    },
    details: {
      overview:
        'The MedConsults Dashboard translates complex clinical operations into clear actionable visualizations. Clinic administrators and department leads monitor live queue wait times, patient turnover, and doctor consultations across time intervals.',
      keyDeliverables: [
        'Interactive telemetry charts displaying hourly consultation flow',
        'Doctor load-balancing indicators preventing provider burnout',
        'Instant alert cards for delayed appointments or emergency triage cases',
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Lucide React', 'Framer Motion'],
    },
  },
  {
    id: 'medconsults-patients',
    title: 'MedConsults Patient Management',
    category: 'Healthcare Management',
    colSpan: 'lg:col-span-5',
    description:
      'Electronic patient records and directory tracking longitudinal medical histories, visit notes, treatment logs, and patient statuses.',
    features: [
      'Instant patient search & filtering',
      'Comprehensive medical timeline',
      'Prescription & diagnostic logs',
      'Triage status categorizations',
    ],
    tags: ['EMR System', 'Clinical Records', 'Search & Filters'],
    status: 'Core Module',
    metric: {
      value: '2.5x',
      label: 'Faster record retrieval time',
    },
    details: {
      overview:
        'Designed for doctors and nurses who need immediate, context-rich access to patient records. Features structured clinical notes, historical visit logs, allergy warnings, and demographic information with instantaneous multi-filter search.',
      keyDeliverables: [
        'Single-click patient timeline showing past prescriptions and lab outcomes',
        'Allergy and critical condition notification badges on record headers',
        'Role-gated privacy controls ensuring medical confidentiality',
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Zod validation', 'PostgreSQL'],
    },
  },
  {
    id: 'medconsults-appointments',
    title: 'MedConsults Appointment Management',
    category: 'Scheduling System',
    colSpan: 'lg:col-span-7',
    description:
      'Smart multi-provider calendar and slot booking engine designed to eliminate double-bookings and optimize appointment slot utilization.',
    features: [
      'Interactive timeline & calendar grid',
      'Doctor slot conflict resolution',
      'Automated status workflow pills',
      'Walk-in & scheduled booking triage',
    ],
    tags: ['Scheduling Engine', 'Calendar UI', 'Real-time Slots'],
    status: 'Optimized Flow',
    metric: {
      value: '0%',
      label: 'Double-booking conflicts recorded',
    },
    details: {
      overview:
        'A resilient scheduling interface built to handle dynamic clinical calendar constraints. Providers define recurring shift hours, consultation lengths, and buffer windows while front-desk staff can instantly drag-and-drop or reallocate appointments as emergencies arise.',
      keyDeliverables: [
        'Conflict-free automated slot generation based on doctor shifts and room availability',
        'Real-time color-coded appointment statuses (Checked In, In Progress, Completed, Cancelled)',
        'Reschedule workflow with automated notification payload dispatch',
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Date-fns', 'Framer Motion'],
    },
  },
];
