// ─── Sanket Sawant — Structured Portfolio Data ────────────────────────────────
// Extracted from resume PDF: Sanket_Sawant_Product_Designer.pdf

export const sanketProfile = {
  name: 'Sanket Dinesh Sawant',
  title: 'Product Designer',
  location: 'Mumbai, India',
  summary:
    'Product Designer with 4+ years of experience designing complex B2B and enterprise SaaS products, focused on simplifying data-heavy workflows, building scalable design systems, and creating intuitive experiences for users in high-stakes, real-world environments. Collaborates closely with product managers and engineers to translate business and technical constraints into clear, usable product experiences, and owns problems end-to-end from discovery and user research to interaction design and final delivery.',
  initials: 'SS',
  yearsOfExperience: '4+',
  specialization: 'B2B & Enterprise SaaS',
};

export const contact = {
  email: 'sanketdsawant1998@gmail.com',
  phone: '9930849920',
  location: 'Mumbai, India',
  portfolio: 'https://portfolio.sanket.design',
  linkedin: 'https://www.linkedin.com/in/sanketsawant7/',
};

export const experience = [
  {
    company: 'Genpact',
    role: 'Product Designer',
    period: 'Dec 2024 – Present',
    current: true,
    projects: [
      {
        name: 'SmartShop Core Platform',
        description:
          'Led end-to-end UX for a role-based manufacturing SaaS, simplifying data-heavy workflows to improve real-time visibility, task execution, and decision-making for operators and engineers.',
        tags: ['SaaS', 'Manufacturing', 'Role-based UX'],
      },
      {
        name: 'SAML & OAuth Redesign',
        description:
          'Redesigned enterprise authentication flows to improve usability while meeting strict security, access control, and compliance requirements.',
        tags: ['Auth', 'Security', 'Enterprise'],
      },
      {
        name: 'ServiceNow UX Audit & Redesign',
        description:
          'Conducted a heuristic UX audit and defined usability standards for a ServiceNow-based platform, improving navigation, information hierarchy, and form usability within platform constraints.',
        tags: ['UX Audit', 'ServiceNow', 'Heuristics'],
      },
      {
        name: 'External Applications Integration Framework',
        description:
          'Designed a unified UX framework to integrate 50+ external tools into SmartShop, creating scalable, consistent workflows across pre-, in-, and post-operation phases.',
        tags: ['Integration', 'Design System', 'Scalability'],
      },
    ],
  },
  {
    company: 'TCS',
    role: 'UX/UI Designer',
    period: 'Apr 2021 – Dec 2024',
    current: false,
    projects: [
      {
        name: 'Enterprise Security & AI Platforms',
        description:
          'Led UX research and design for enterprise security, AI, and data platforms including Post-Quantum Cryptography, Confidential Data Masking, and data transformation tools.',
        tags: ['AI', 'Security', 'Cryptography'],
      },
      {
        name: 'Complex Workflow Design',
        description:
          'Conducted user interviews, UX audits, competitive analysis, and usability testing to inform complex workflow design across multiple enterprise products.',
        tags: ['User Research', 'UX Audit', 'Usability Testing'],
      },
      {
        name: 'Technical Concept Translation',
        description:
          'Translated highly technical concepts (cryptography, privacy, AI, data processing) into intuitive, task-oriented user experiences for non-technical users.',
        tags: ['Information Architecture', 'Interaction Design'],
      },
      {
        name: 'Cross-functional Collaboration',
        description:
          'Collaborated with data scientists, security experts, product managers, and engineers to deliver scalable, compliant solutions balancing security, performance, and usability.',
        tags: ['Collaboration', 'Prototyping', 'Agile'],
      },
    ],
  },
];

export const skills = {
  design: [
    'User-Centered Design',
    'Systems Thinking',
    'Complex Workflow & Information Architecture',
    'Interaction Design & Prototyping',
    'Data-Heavy & Enterprise Application UX',
    'User Research',
    'Journey Mapping & Task Analysis',
    'Problem Framing & Opportunity Identification',
    'Design Systems & Component Libraries',
    'Scalable Interaction Patterns & Design Tokens',
    'Accessibility-aware Design (WCAG basics)',
    'Agile Sprint-based Product Development',
    'Stakeholder Communication & Design Advocacy',
  ],
  tools: ['Figma', 'AdobeXD', 'Miro', 'Procreate', 'Canva'],
};

export const education = [
  {
    degree: 'Diploma in UI/UX Design',
    institution: 'Edit Institute of Design',
    period: 'May 2022 – Nov 2022',
  },
  {
    degree: 'Bachelor of Computer Engineering',
    institution: 'Smt. Indira Gandhi College of Engineering',
    period: 'July 2016 – Oct 2020',
  },
];

export const caseStudies = [
  {
    id: 'labor-records',
    title: 'Manual Labor Record Management',
    category: 'Enterprise Workflow UX',
    description: 'Reducing errors and support dependency in labor vouchering within a manufacturing SaaS.',
    // Project overview metadata
    industry: 'Manufacturing / Industrial Software',
    client: 'GE Vernova',
    duration: '~6 Months',
    role: 'Product Designer',
    platform: 'Enterprise SaaS (SmartShop)',
    // Card content
    context:
      'SmartShop is a shop-floor application used to manage operations, labor vouchering, time tracking, and operational records within turbine manufacturing plants. Labor data captured in the system directly impacts payroll calculations, compliance, and production costing, making data accuracy critical.\n\nHowever, manual labor records such as overtime, downtime, and corrections were not entered directly in SmartShop. Instead, teams relied on an external tool (SmartSheet) that allowed free-text inputs with minimal validation, synced back manually with support team corrections.\n\nThis fragmented workflow created significant data integrity issues across the system.',
    problem:
      'SmartShop lacked a controlled and validated way for authorized users to add manual labor records directly within the system.\n\nAs a result, duplicate and overwritten labor records occurred frequently, mandatory fields were missing or incorrectly entered, time overlaps and invalid entries disrupted production tracking, support teams had to manually review and fix errors, and confidence in payroll-critical data decreased significantly.\n\nThe challenge was not just usability — it was data integrity.',
    designDecisions: [
      {
        title: 'Staged Entry Workflow',
        detail: 'Instead of committing records immediately, labor entries are first staged in a table where users can review and edit before submission. This reduces accidental commits and enables batch validation.',
      },
      {
        title: 'Progressive Input Validation',
        detail: 'Field-level validations guide users during data entry while deeper consistency checks occur during review. This balances speed for power users with data accuracy requirements.',
      },
      {
        title: 'Access-Controlled Entry',
        detail: 'Manual labor entry is restricted to privileged operational roles — Shopfloor Admins and Production Supervisors — ensuring accountability for payroll-sensitive data.',
      },
      {
        title: 'Single-Screen Workflow',
        detail: 'The UI combines form-based record creation, a staging table for review, and inline validation feedback — avoiding multi-step workflows and keeping the process efficient for experienced operators.',
      },
    ],
    solution:
      'The final experience introduces a staged labor entry interface inside SmartShop. Users can add labor records manually through a structured form or upload bulk records through CSV files, review staged records in a validation table, and edit or correct entries before final submission. The UI supports both speed for experienced supervisors and strong validation for critical operational data.',
    outcomes: [
      '60–70% reduction in manual corrections by support teams',
      'Significant decrease in duplicate and overwritten labor records',
      'Supervisors can complete manual labor entries within a single session',
      'The external error-prone workflow was fully eliminated',
    ],
    tags: ['Enterprise UX', 'Workflow Design', 'SaaS'],
    gradient: 'from-teal-500 to-green-400',
    imageUrl: 'https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    pdfPath: '/case-studies/Manual_Labor_Record_Management.pdf',
    behanceUrl: 'https://www.behance.net/sanketsawant5',
  },
  {
    id: 'defect-detection',
    title: 'Automated Defect Detection System',
    category: 'AI + Manufacturing UX',
    description: 'Designing UX where software controls physical motion in a safety-critical AI inspection system.',
    // Project overview metadata
    industry: 'Manufacturing / AI Systems',
    client: 'GE Vernova',
    duration: '4 Weeks',
    role: 'Product Designer',
    platform: 'Enterprise SaaS (SmartShop)',
    // Card content
    context:
      'I worked on an Automated Defect Detection system used in a manufacturing environment. The system combines physical image capture via robot and camera, AI-based defect inference, and human inspection and confirmation.\n\nUnlike typical software products, this system had hardware dependencies, AI maturity constraints, and safety-critical transitions — all of which had direct UX implications.',
    problem:
      'As automated inspection systems evolve, users must make confident decisions while interacting with incomplete, asynchronous, and safety-critical system states.\n\nThe challenge was to design a review experience that clearly communicates what the system is doing across image capture, AI inference, and physical motion — while supporting phased deployment and future automation.\n\nThis was not a screen design problem. The main challenge was making complex, asynchronous system behavior understandable and trustworthy for users. The system could be in multiple valid states simultaneously — image captured but AI not available, AI running, AI finished, robot idle or in motion — and unclear states could lead to safety risks.',
    designDecisions: [
      {
        title: 'Designing for Incremental Delivery',
        detail: 'Image capture would ship first; inference detection in a later sprint. AI availability could vary based on environment or model readiness. The UX was designed to work without assuming AI always existed.',
      },
      {
        title: 'State-Driven UX Instead of Feature-Driven UX',
        detail: 'Rather than hiding incomplete functionality, the UI reflects the system\'s actual state. Explicit states — image captured, processing, inference pending, inference processing, inference ready — each had clear labels, distinct visual treatment, and defined user actions.',
      },
      {
        title: 'Human-in-the-Loop Without Blocking the Future',
        detail: 'Manual workflows remained fully usable without AI. AI-assisted workflows could be layered in later. Editing could be disabled once the model matured — reducing long-term UX debt and avoiding rework.',
      },
    ],
    solution:
      'The final experience decouples image capture and inference detection as independent but connected modules. Each system state is explicitly communicated with clear labels and distinct visual treatment. The design supported phased rollout — shipping value early while remaining honest about AI capabilities — and scaled cleanly from manual to AI-assisted to fully automated inspection.',
    outcomes: [
      'Supported phased rollout without requiring a redesign',
      'Reduced cognitive load during inspection through explicit state communication',
      'Made safety-critical transitions explicit and understandable',
      'Scaled cleanly from manual → AI-assisted → automated inspection',
    ],
    tags: ['AI', 'Manufacturing', 'State-Driven UX'],
    gradient: 'from-orange-500 to-amber-500',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    pdfPath: '/case-studies/Automated_Defect_Detection_System.pdf',
    behanceUrl: 'https://www.behance.net/sanketsawant5',
  },
  {
    id: 'amazon-dark-patterns',
    title: "Evaluating Dark Patterns in Amazon's Subscription Process",
    category: 'UX Ethics / Psychology',
    description: 'A personal UX study identifying manipulative design patterns and proposing ethical alternatives.',
    // Project overview metadata
    industry: 'E-commerce / UX Research',
    client: 'Personal Project — UX Study',
    duration: '1 Week',
    role: 'UX Researcher & Designer',
    platform: 'Mobile (Amazon App)',
    // Card content
    context:
      'Triggered by a personal experience — noticing "Subscribe & Save" pre-selected by default while browsing Amazon for Vitamin C capsules. This small moment of surprise triggered a deeper investigation into how Amazon\'s subscription flow leverages psychology and dark patterns to influence user behaviour.\n\nThe study identifies 4 psychology principles used in the product page: Anchoring (price-per-pill framing), the Endowment Effect ("Get it Tomorrow"), Fitt\'s Law (directing attention to subscription settings), and Social Proof (highlighting the "most common" delivery frequency).',
    problem:
      'Amazon\'s subscription flow uses dark patterns that trick users into recurring commitments without informed consent. The "Subscribe & Save" option is pre-selected by default — a classic dark pattern according to Brignull\'s taxonomy.\n\nThe advertised 10% saving requires a minimum of 5 active subscriptions — a condition buried in the UI and not immediately apparent. Pre-selected defaults, manipulative microcopy, and misleading savings framing all work together to erode user autonomy and trust.',
    designDecisions: [
      {
        title: 'Applying Self-Initiated Triggers',
        detail: 'Rather than defaulting users into subscriptions, the redesign uses self-initiated triggers — users consciously opt in, increasing action likelihood when reminders arrive and building genuine intent.',
      },
      {
        title: 'Transparent Savings Framing',
        detail: 'The savings conditions (minimum 5 subscriptions required) are surfaced clearly rather than hidden. Honest framing respects user autonomy and prevents post-purchase regret.',
      },
      {
        title: 'Ethics and Practicality Balance',
        detail: 'The redesign acknowledges Amazon\'s business goals while arguing that transparent flows build long-term trust — which is more valuable to Amazon than short-term subscription boosts from deceptive defaults.',
      },
    ],
    solution:
      'The proposed redesign removes the pre-selected subscription default, introduces honest and clear framing of savings conditions and requirements, and replaces guilt-based or manipulative microcopy with consent-based flows. The interaction uses self-initiated triggers to increase genuine subscription intent without coercion.',
    outcomes: [
      'Identified 4 psychology principles being exploited in the subscription UI',
      'Proposed ethical redesign removes pre-selection and surfaces savings conditions clearly',
      'Demonstrated how transparent design builds long-term trust without sacrificing conversion',
      'Argued the business case for ethical UX as a trust strategy for Amazon',
    ],
    tags: ['UX Ethics', 'Psychology', 'Research', 'Redesign'],
    gradient: 'from-rose-500 to-orange-400',
    imageUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    pdfPath: '/case-studies/Evaluating_Dark_Patterns_in_Amazon_s_Subscription_Process.pdf',
    behanceUrl: 'https://www.behance.net/sanketsawant5',
  },
];

export const resume = {
  fileName: 'Sanket_Sawant_Product_Designer.pdf',
  filePath: '/resume/Sanket_Sawant_Product_Designer.pdf',
  lastUpdated: 'March 2025',
};

// Intent type used by the API route and page component
export type ResponseIntent =
  | 'about'
  | 'experience'
  | 'caseStudies'
  | 'resume'
  | 'contact'
  | 'skills'
  | 'education'
  | 'unknown';

// ─── Recruiter FAQ Data ───────────────────────────────────────────────────────

export const recruiterFAQ = {
  currentCompany: 'Genpact',
  currentRole: 'UX Consultant / Product Designer',
  totalExperience: '4.11 years',
  noticePeriod: '90 days',
  salaryExpectation: '15–16 LPA',
  location: 'Mumbai, India',
  reasonForChange:
    "Sanket is looking for opportunities where he can work more closely with product teams and contribute to product strategy. While his current role involves enterprise UX consulting, he wants deeper exposure to product-led environments where design decisions directly influence product outcomes. He is also interested in working in fast-paced product companies where he can grow as a product thinker and build impactful digital products.",
};

// ─── Blog Articles ────────────────────────────────────────────────────────────

export const blogArticles = [
  {
    title: 'Designing with the Zeigarnik Effect',
    topic: 'UX Psychology',
    description: 'An exploration of how unfinished tasks influence user behavior in digital products and how designers use subtle incompletion to create engagement.',
    link: 'https://www.linkedin.com/posts/sanketsawant7_the-zeigarnik-effect-ugcPost-7351652321337978883-cgfk',
  },
  {
    title: 'UX Labels Matter More Than You Think',
    topic: 'UX Fundamentals / Microcopy',
    description: 'A design observation showing how small pieces of microcopy can shape user behavior and clarity in interfaces.',
    link: 'https://www.linkedin.com/posts/sanketsawant7_ux-labels-ugcPost-7361114003030396929-AxEZ',
  },
  {
    title: 'Why Spotify and Not Amazon Music?',
    topic: 'UX Psychology / Product Experience',
    description: 'A UX exploration of why users prefer Spotify over Amazon Prime Music despite already paying for Prime.',
    link: 'https://www.linkedin.com/posts/sanketsawant7_spotify-x-amazon-music-ux-analysis-ugcPost-7342471160581758976-nLn4',
  },
];
