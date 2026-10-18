/**
 * Verified identity, education, projects, skills, and links for Sujal Neve.
 * Strictly adheres to verified data — no invented details or placeholder exaggerations.
 */

export interface VerifiedProfile {
  name: string
  title: string
  email: string
  location: string
  links: {
    github: string
    linkedin: string
    leetcode: string
    email: string
  }
  education: Array<{
    degree: string
    institution: string
    location: string
    score: string
    year: string
  }>
}

export interface SkillItem {
  name: string
  context: string
}

export interface SkillCategory {
  id: string
  title: string
  description: string
  skills: SkillItem[]
  badgeCount: string
  accent: 'violet' | 'cyan'
}

export interface ProjectItem {
  id: string
  title: string
  tagline: string
  category: string
  badge: string
  problemStatement: string
  keyFeatures: string[]
  technologies: string[]
  githubUrl?: string
  demoStatus: string
  isFeatured?: boolean
  accent: 'violet' | 'cyan'
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  type: string
  duration: string
  location?: string
  responsibilities: string[]
  technologies: string[]
  certificateUrl?: string
  certificateButtonText?: string
  accent: 'violet' | 'cyan'
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  location: string
  year: string
  score: string
  scoreLabel: string
  curriculumHighlights: string[]
  accent: 'violet' | 'cyan'
}

export interface PublicationItem {
  id: string
  title: string
  type: string
  field: string
  journal?: string
  volumeIssue?: string
  date?: string
  doi?: string
  doiUrl?: string
  description: string
  focusAreas: string[]
  technologies?: string[]
  publicationUrl: string
  buttonText: string
  secondaryButtonText?: string
  secondaryUrl?: string
  accent: 'violet' | 'cyan'
}

export interface CertificationItem {
  id: string
  title: string
  issuer: string
  year: string
  status: 'available' | 'upcoming'
  statusLabel: string
  certificateUrl?: string
  buttonText?: string
  skillsCovered: string[]
  accent: 'violet' | 'cyan'
}

export const VERIFIED_PROFILE: VerifiedProfile = {
  name: 'Sujal Neve',
  title: 'Computer Engineering Graduate & Java Developer',
  email: 'sujal.neve07@gmail.com',
  location: 'Nashik, Maharashtra, India',
  links: {
    github: 'https://github.com/SujalNeve07',
    linkedin: 'https://www.linkedin.com/in/sujal-neve-1784-dev',
    leetcode: 'https://leetcode.com/u/Sujal784/',
    email: 'mailto:sujal.neve07@gmail.com',
  },
  education: [
    {
      degree: 'B.E. in Computer Engineering',
      institution: "MET's Bhujbal Knowledge City Institute of Engineering",
      location: 'Nashik',
      score: 'CGPA: 8.38',
      year: 'Completed 2026',
    },
    {
      degree: 'Diploma in Computer Engineering',
      institution: 'K. K. Wagh Polytechnic',
      location: 'Nashik',
      score: '88.74%',
      year: '2023',
    },
  ],
}

/**
 * Verified Education
 * Ordered chronologically with highest/latest qualification first.
 */
export const VERIFIED_EDUCATION: EducationItem[] = [
  {
    id: 'be-computer-engineering',
    degree: 'B.E. in Computer Engineering',
    institution: "MET's Bhujbal Knowledge City, Institute of Engineering",
    location: 'Nashik',
    year: '2026',
    score: 'CGPA: 8.38',
    scoreLabel: 'Completed 2026 · First Class with Distinction Standing',
    curriculumHighlights: [
      'Data Structures & Algorithms, Object-Oriented Software Design',
      'Database Management Systems (RDBMS & SQL), Operating Systems',
      'Computer Networks, Distributed Systems & Concurrency',
      'Capstone Research: Applied Generative Models in Forensic Identification',
    ],
    accent: 'violet',
  },
  {
    id: 'diploma-computer-engineering',
    degree: 'Diploma in Computer Engineering',
    institution: 'K. K. Wagh Polytechnic',
    location: 'Nashik',
    year: '2023',
    score: '88.74%',
    scoreLabel: 'Completed 2023 · First Class with Distinction',
    curriculumHighlights: [
      'Foundations of Programming, Java & C++ Development',
      'Relational Database Concepts, Client-Server Basics',
      'Computer Hardware Fundamentals & System Software',
    ],
    accent: 'cyan',
  },
]

/**
 * Verified Experience
 * Ordered chronologically with newest experience first.
 */
export const VERIFIED_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'netleap-solutions',
    company: 'NetLeap IT Training and Solutions',
    role: 'Full Stack Developer Intern',
    type: 'Professional Internship',
    duration: 'January 2025 – March 2025',
    location: 'Nashik, India',
    responsibilities: [
      'Built and enhanced web application features using Java, Spring Boot, PHP, HTML, and CSS.',
      'Implemented RESTful APIs with Spring Boot.',
      'Managed MySQL tables, SQL queries, and CRUD operations.',
      'Assisted with troubleshooting, testing, and feature improvements.',
    ],
    technologies: ['Java', 'Spring Boot', 'PHP', 'HTML', 'CSS', 'RESTful APIs', 'MySQL'],
    certificateUrl: 'https://drive.google.com/file/d/1GQWmFNYlArYTJTBOV1tOUcYtecC9_10E/view?usp=drive_link',
    certificateButtonText: 'View Internship Certificate ↗',
    accent: 'cyan',
  },
  {
    id: 'r3-systems',
    company: 'R3 Systems India Private Limited',
    role: 'Java Developer Intern',
    type: 'Professional Internship',
    duration: 'June 2022 – August 2022',
    location: 'Nashik, India',
    responsibilities: [
      'Developed Java modules using object-oriented programming principles.',
      'Created reusable software components.',
      'Integrated Java applications with MySQL through JDBC.',
      'Debugged and tested modules to improve reliability.',
      'Implemented requirements and validated application functionality.',
    ],
    technologies: ['Java', 'OOP', 'JDBC', 'MySQL', 'Testing & Debugging'],
    certificateUrl: 'https://drive.google.com/file/d/1m8p2mNJ2Aq5bGVWh3X-DkA-scuOAKol4/view?usp=drive_link',
    certificateButtonText: 'View Internship Certificate ↗',
    accent: 'violet',
  },
]

/**
 * Verified Projects
 * Strictly derived from user-specified repositories and documented research.
 */
export const VERIFIED_PROJECTS: ProjectItem[] = [
  {
    id: 'banking-portal-api',
    title: 'Banking Portal REST API',
    tagline: 'Transactional backend service engineered for secure banking workflows, funds transfers, and ledger persistence.',
    category: 'Java Backend & REST Architecture',
    badge: 'FEATURED BACKEND SERVICE',
    isFeatured: true,
    accent: 'violet',
    problemStatement:
      'Financial operations require rigorous data consistency, non-repudiation, and protected API boundaries. This project establishes a robust backend architecture managing user accounts, balance transitions, and auditable transaction records without exposing sensitive endpoints.',
    keyFeatures: [
      'Stateless user authentication & role verification with Spring Security and JSON Web Tokens (JWT)',
      'Account lifecycle management: user onboarding, profile association, and balance querying',
      'Transactional funds operations: deposits, withdrawals, and inter-account transfers with ACID guarantees',
      'Persistent audit trail logging transaction history with timestamping and status codes',
      'Global exception handling architecture with standardized RESTful error response formats',
    ],
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'Hibernate / JPA', 'MySQL', 'Maven'],
    githubUrl: 'https://github.com/SujalNeve07/BankingPortal-API',
    demoStatus: 'Headless Backend Service (Live Web UI N/A)',
  },
  {
    id: 'smart-expense-tracker',
    title: 'Smart Expense Tracker',
    tagline: 'Desktop personal finance application with localized ledger persistence and dashboard analytics.',
    category: 'Desktop Application & System Engineering',
    badge: 'DESKTOP APPLICATION',
    isFeatured: false,
    accent: 'cyan',
    problemStatement:
      'Individual expense logging often suffers from clunky external tools or cloud privacy concerns. This desktop system provides an immediate, offline-capable interface for recording financial inflows and outflows with instantaneous balance computation.',
    keyFeatures: [
      'Graphical user interface designed with Java Swing for rapid desktop data entry and review',
      'Secure credential authentication for personalized local user accounts',
      'Categorized transaction management supporting income logging, expense tagging, and date sorting',
      'Real-time financial dashboard displaying net current balance, aggregate revenue, and total expenses',
      'Direct JDBC connectivity interfacing with a relational MySQL database for consistent record storage',
    ],
    technologies: ['Java', 'Java Swing', 'MySQL', 'JDBC', 'OOP Architecture'],
    githubUrl: 'https://github.com/SujalNeve07/Smart_Expense_Track_System',
    demoStatus: 'Native Desktop Application (Live Web UI N/A)',
  },
  {
    id: 'forensic-face-research',
    title: 'Linguistic to Visual Transformation',
    tagline: 'Academic research prototype investigating generative facial sketch reconstruction from natural language descriptions.',
    category: 'Applied AI & Research Prototype',
    badge: 'RESEARCH PROTOTYPE',
    isFeatured: false,
    accent: 'violet',
    problemStatement:
      'Forensic criminal identification often relies on hand-drawn composites from verbal witness statements, which can introduce cognitive distortion. This prototype explores whether semantic natural language processing coupled with deep generative models can reconstruct plausible facial composites from textual descriptors.',
    keyFeatures: [
      'Semantic feature parsing: extracting facial attribute embeddings from unstructured witness text using fine-tuned BERT',
      'Generative composite synthesis: mapping latent feature vectors into high-resolution facial images using StyleGAN',
      'Feature validation & alignment: measuring visual consistency against reference attributes via ResNet-50 and cosine similarity',
      'Lightweight Python inference endpoint developed with Flask to process text prompts and return generated visuals',
      'Carefully framed as an exploratory academic prototype, evaluating generative capabilities under controlled research constraints',
    ],
    technologies: ['Python', 'BERT', 'ResNet-50', 'StyleGAN', 'Cosine Similarity', 'Flask'],
    githubUrl: 'https://github.com/SujalNeve07/Linguistic-to-Visual-Transformation',
    demoStatus: 'Open Source Research Repository (GitHub)',
  },
]

/**
 * Verified Technical Skills Matrix
 * Each entry is strictly tied to documented projects and confirmed academic work.
 */
export const VERIFIED_SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    description: 'Core languages used for backend logic, algorithms, and system programming.',
    accent: 'violet',
    badgeCount: '03',
    skills: [
      { name: 'Java', context: 'Primary Language · Java 17/21, OOP, Collections, Concurrency' },
      { name: 'SQL', context: 'Database Queries, Joins, Transactions & Schema Design' },
      { name: 'Python', context: 'Scripting, Model Inference & Research Prototyping' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Frameworks, protocols, and architectural patterns for resilient web services.',
    accent: 'cyan',
    badgeCount: '06',
    skills: [
      { name: 'Spring Boot', context: 'Microservices & Enterprise REST Application Framework' },
      { name: 'REST APIs', context: 'Stateless Endpoint Contracts & JSON Serialization' },
      { name: 'Spring Security', context: 'Authentication, Role Authorization & Security Filters' },
      { name: 'JWT (JSON Web Tokens)', context: 'Secure Stateless Token Generation & Validation' },
      { name: 'Hibernate / JPA', context: 'Object-Relational Mapping & Entity Lifecycle' },
      { name: 'JDBC', context: 'Direct Database Operations & Connection Management' },
    ],
  },
  {
    id: 'databases',
    title: 'Database Engineering',
    description: 'Relational data persistence, schema design, and ACID transactions.',
    accent: 'violet',
    badgeCount: '02',
    skills: [
      { name: 'MySQL', context: 'Relational Schema Design, Foreign Keys & Query Optimization' },
      { name: 'RDBMS Fundamentals', context: 'ACID Compliance, Normalization & Data Integrity' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Modern interface foundations used in web applications and dashboards.',
    accent: 'cyan',
    badgeCount: '04',
    skills: [
      { name: 'HTML5 & CSS3', context: 'Semantic Web Structure & Responsive Layouts' },
      { name: 'JavaScript (ES6+)', context: 'Asynchronous Programming, DOM & Fetch API' },
      { name: 'React', context: 'Component Architecture, Hooks & State Management' },
      { name: 'TypeScript', context: 'Type Safety, Strict Interfaces & Component Props' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Workflow',
    description: 'Version control, dependency management, and API lifecycle testing.',
    accent: 'violet',
    badgeCount: '04',
    skills: [
      { name: 'Git', context: 'Branching, Commit Hygiene & Distributed Version Control' },
      { name: 'GitHub', context: 'Repository Management, Collaboration & Releases' },
      { name: 'Maven', context: 'Java Dependency Lifecycle, Plugins & Build Automation' },
      { name: 'Postman', context: 'API Endpoint Testing, Mocking & Header Inspection' },
    ],
  },
  {
    id: 'ai-research',
    title: 'AI & Research Technologies',
    description: 'Deep learning models and pipelines applied to the forensic research prototype.',
    accent: 'cyan',
    badgeCount: '04',
    skills: [
      { name: 'BERT', context: 'Semantic Textual Feature Extraction from Witness Descriptions' },
      { name: 'ResNet-50', context: 'Deep Convolutional Visual Feature Encoding' },
      { name: 'StyleGAN', context: 'Generative Adversarial Synthesis of Forensic Suspect Faces' },
      { name: 'Flask', context: 'Lightweight Model Serving & Python Inference Microservice' },
    ],
  },
]

/**
 * Verified Research Publications
 * Strictly preserves verified titles, citations, DOI links, and documents without invented metadata.
 */
export const VERIFIED_PUBLICATIONS: PublicationItem[] = [
  {
    id: 'linguistic-to-visual-forensic-review',
    title: 'Linguistic-to-Visual Transformation: A Review on Text-to-Face Generation for Forensic Applications',
    type: 'Review Paper',
    field: 'Applied Deep Learning & Forensic Computing',
    doi: '10.58257/IJPREMS44745',
    doiUrl:
      'https://www.ijprems.com/uploadedfiles/paper//issue_11_november_2025/44745/final/fin_ijprems1763714148.pdf',
    description:
      'A comprehensive academic review investigating computational methodologies for synthesizing facial composites from verbal witness descriptions. The research explores semantic natural language processing, deep generative latent representations, and practical forensic constraints in text-to-face generation.',
    focusAreas: [
      'Text-to-Face Generative Synthesis',
      'Semantic Linguistic Processing for Forensic Descriptions',
      'Latent Space Mapping via Deep Neural Architectures',
      'Facial Feature Verification & Cosine Alignment Metrics',
    ],
    technologies: [
      'Deep Learning',
      'Natural Language Processing (NLP)',
      'Generative Neural Networks',
      'Latent Space Representations',
      'Facial Feature Verification',
      'Cosine Similarity Metrics',
    ],
    publicationUrl:
      'https://www.ijprems.com/uploadedfiles/paper//issue_11_november_2025/44745/final/fin_ijprems1763714148.pdf',
    buttonText: 'Read Paper',
    secondaryButtonText: 'View Certificate',
    secondaryUrl:
      'https://drive.google.com/file/d/1-wEmhderBnZYDkydgeQbqFKXpNUklqkp/view?usp=drive_link',
    accent: 'violet',
  },
  {
    id: 'blind-people-helping-hand',
    title: 'Blind People Helping Hand',
    type: 'Published Journal Paper',
    journal: 'IJRASET (International Journal for Research in Applied Science & Engineering Technology)',
    volumeIssue: 'Volume 11, Issue IV',
    doi: '10.22214/ijraset.2023.51014',
    doiUrl: 'https://doi.org/10.22214/ijraset.2023.51014',
    field: 'Assistive IoT & Embedded Computer Vision',
    description:
      'A low-cost, wearable assistive device designed to help visually impaired individuals navigate their surroundings by detecting obstacles and recognizing objects in real time. Integrating a Raspberry Pi with OpenCV-based computer vision and ultrasonic distance measurement, the system provides spatial awareness through audio alerts and voice-based feedback.',
    technologies: [
      'Raspberry Pi 3',
      'Python',
      'OpenCV & imutils',
      'Raspberry Pi Camera',
      'Ultrasonic Sensor',
      'Text-to-Speech (TTS)',
      'Audio Feedback (Earphones)',
    ],
    focusAreas: [
      'Real-time Object Detection & Recognition',
      'Ultrasonic Obstacle Distance Measurement',
      'Voice-based Object Identification & Audio Alerts',
      'Low-cost, Portable Assistive Hardware Design',
    ],
    publicationUrl: 'https://doi.org/10.22214/ijraset.2023.51014',
    buttonText: 'Read Paper',
    secondaryButtonText: 'View Certificate',
    secondaryUrl:
      'https://drive.google.com/file/d/1NiTGOSK4bV63-vByZejTfucf691XXItJ/view?usp=drive_link',
    accent: 'cyan',
  },
]

export const VERIFIED_PUBLICATION: PublicationItem = VERIFIED_PUBLICATIONS[0]

/**
 * Verified Certifications
 * Exactly follows documented certificates and honest status indicators.
 */
export const VERIFIED_CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'technokraft-java-mvc',
    title: 'Java Software Programming & MVC',
    issuer: 'TechnoKraft Training & Solution Pvt. Ltd.',
    year: '2022',
    status: 'available',
    statusLabel: 'Verified Credential · Issued 2022',
    certificateUrl: 'https://drive.google.com/file/d/1l1ZVNGcI_zE-DZQ6_OVy5Uc-TrqkYySa/view?usp=sharing',
    buttonText: 'View Certificate ↗',
    skillsCovered: [
      'Core Java & Object-Oriented Programming (OOP)',
      'Model-View-Controller (MVC) Architectural Pattern',
      'Relational Database Connectivity & Query Execution',
      'Modular Software Design & Code Reusability',
    ],
    accent: 'cyan',
  },
  {
    id: 'acciojob-java-genai',
    title: 'Java Full Stack Development with GenAI',
    issuer: 'AccioJob Skill Centre, Pune',
    year: '2026',
    status: 'upcoming',
    statusLabel: 'Certificate coming soon',
    skillsCovered: [
      'Java Full Stack Architecture & Spring Boot',
      'RESTful API Microservices & Security',
      'Generative AI Integration & Prompt Engineering',
      'Modern End-to-End Application Delivery',
    ],
    accent: 'violet',
  },
]
