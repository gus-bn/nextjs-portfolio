import type { LucideIcon } from 'lucide-react';
import {
  Bot,
  BriefcaseBusiness,
  CalendarClock,
  ClipboardCheck,
  Clock,
  FileText,
  Globe,
  HeartPulse,
  Layers,
  MessagesSquare,
  Mic,
  RadioTower,
  Repeat,
  Route,
  Search,
  ShieldCheck,
  Smartphone,
  Table2,
  Users,
  Workflow,
} from 'lucide-react';

export type ProjectShot = {
  src: string;
  caption: string;
};

export type ProjectHighlight = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export type ProjectBrand = {
  name: string;
  logo: string;
  url?: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Without a logo file the plate renders the name as a wordmark. */
  logo?: string;
  logoAlt?: string;
  /** Logo is drawn for dark backgrounds. */
  logoOnDark?: boolean;
  category: string;
  categoryIcon: LucideIcon;
  period: string;
  role: string;
  statement: string;
  summary: string;
  agentic: string;
  highlights: ProjectHighlight[];
  stack: string[];
  shots: ProjectShot[];
  /** Products shown inside a company card. */
  brands?: ProjectBrand[];
  url?: string;
  /** Private platforms get no public link. */
  privateNote?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'meryto',
    name: 'Meryto',
    logo: '/work/logos/meryto.svg',
    logoAlt: 'Meryto logo',
    logoOnDark: true,
    category: 'AI career platform',
    categoryIcon: BriefcaseBusiness,
    period: '2025 to now',
    role: 'Founder engineer, API, agents and apps',
    statement: 'An AI career advisor that finds the job, writes the CV and applies for you.',
    summary:
      'Candidates describe what they want to Mery, the in-app advisor. The platform searches hundreds of thousands of openings, ranks them by fit, tailors a CV and cover letter for each role, auto-applies and then coaches the interview by voice.',
    agentic:
      'A fleet of headless coding agents, each driving a real browser through the Chrome DevTools MCP server, harvests openings straight from company career sites. A process manager supervises them with concurrency slots, 15-minute timeouts, rate-limit classification and full process-tree cleanup.',
    highlights: [
      {
        icon: Bot,
        title: 'Agent harvesting fleet',
        body: 'Queued agent runs on Dramatiq workers, with every message and failure reason persisted for replay and audit.',
      },
      {
        icon: Search,
        title: 'Semantic matching',
        body: 'Embedding pipeline over every job row, refreshed by a periodic sweeper, so matching runs on meaning instead of keywords.',
      },
      {
        icon: FileText,
        title: 'CV and cover letters',
        body: 'Per-role generation tuned to pass ATS filters while staying true to the candidate profile.',
      },
      {
        icon: Mic,
        title: 'Voice interview coach',
        body: 'Real-time mock interviews built on ElevenLabs conversational agents, seeded with the actual job and application.',
      },
    ],
    stack: ['Python 3.13', 'FastAPI', 'PostgreSQL', 'Dramatiq', 'Redis', 'Claude Code', 'MCP', 'OpenAI embeddings', 'ElevenLabs', 'React 19', 'Next.js'],
    shots: [
      { src: '/work/me-1.webp', caption: 'Landing: describe your ideal job and see matches before signing up' },
      { src: '/work/me-2.webp', caption: 'Mery, the conversational advisor, in four steps: talk, search, CV and auto-apply, coaching' },
      { src: '/work/me-3.webp', caption: 'Meryto Academy and the final call to action' },
    ],
    url: 'https://meryto.com/',
  },
  {
    slug: 'thegurucompany',
    name: 'TheGurúCompany',
    category: 'AI SaaS studio',
    categoryIcon: Layers,
    period: '2020 to now',
    role: 'Lead AI and full-stack engineer',
    statement: 'Three production AI products on one shared agent platform.',
    summary:
      'Utoppia automates business operations with agents and RPA. ChatO runs sales and support conversations across WhatsApp, Instagram and web chat. WeWell is a 24/7 wellness coach. All three run on the same microservices: messaging channels, embeddings and vector search, model routing and a visual flow builder.',
    agentic:
      'I designed the agent layer they share: retrieval over customer knowledge, tool-calling agents that qualify leads and book meetings, a provider-agnostic interface across commercial and open models, and human handoff when an agent should step aside.',
    highlights: [
      {
        icon: Workflow,
        title: 'Visual flow builder',
        body: 'Operators compose agent workflows from nodes, with RPA workers executing the steps that live outside an API.',
      },
      {
        icon: MessagesSquare,
        title: 'Omnichannel agents',
        body: 'One agent brain across WhatsApp, Instagram, web chat, Zendesk and Salesforce, with handoff to people.',
      },
      {
        icon: Route,
        title: 'Model routing',
        body: 'Commercial and open-source models behind a single service, plus fine-tuning for domain tasks.',
      },
      {
        icon: HeartPulse,
        title: 'Coaching at scale',
        body: 'WeWell connects nutrition, fitness and emotional health in one personalized daily plan with expert review.',
      },
    ],
    stack: ['Python', 'Node.js', 'LLM APIs', 'RAG', 'Vector DB', 'Fine-tuning', 'RPA', 'PostgreSQL', 'Next.js', 'React Native', 'Docker'],
    shots: [
      { src: '/work/ut-1.webp', caption: 'Utoppia: a three-minute diagnostic of which processes to automate' },
      { src: '/utoppia.png', caption: 'Utoppia: the intelligent automation platform' },
      { src: '/work/ut-2.webp', caption: 'Utoppia: agents trained on company data with leading models plugged in' },
      { src: '/work/ch-1.webp', caption: 'ChatO: agents specialized in sales, support and service' },
      { src: '/chato.png', caption: 'ChatO: customer communication that never leaves the chat' },
      { src: '/work/ch-2.webp', caption: 'ChatO: multichannel, always-on assistance with seamless handoff' },
      { src: '/work/ww-1.webp', caption: 'WeWell: the smart wellness coach' },
      { src: '/work/ww-2.webp', caption: 'WeWell: personalized plans, reminders, nutrition and human in the loop' },
    ],
    brands: [
      { name: 'Utoppia', logo: '/work/logos/utoppia.webp', url: 'https://utoppia.ai/' },
      { name: 'ChatO', logo: '/work/logos/chato.svg', url: 'https://getchato.ai/' },
      { name: 'WeWell', logo: '/work/logos/wewell.svg', url: 'https://wewell.ai/' },
    ],
  },
  {
    slug: 'interlinked',
    name: 'Interlinked BSS',
    logo: '/work/logos/interlinked.svg',
    logoAlt: 'Interlinked logo',
    category: 'Telecom BSS',
    categoryIcon: RadioTower,
    period: '2023 to now',
    role: 'Lead engineer, architecture and delivery',
    statement: 'The operator console behind a multi-brand mobile network.',
    summary:
      'A business support system for MVNO brands on the Altán network: top-ups, SIM lifecycle, subscriptions, number portability, orders, Stripe checkouts, travel eSIM and warehouses, with request logs for every carrier integration and role-based access for admins, supervisors and agents.',
    agentic:
      'The React console replaced a legacy Ember app screen by screen. Coding agents worked from a living migration plan and functional spec, and every iteration closed with browser-driven QA passes against staging before a person signed off.',
    highlights: [
      {
        icon: Repeat,
        title: 'Recurring revenue',
        body: 'Top-ups, subscriptions and Stripe checkout sessions reconciled against carrier orders.',
      },
      {
        icon: Smartphone,
        title: 'SIM lifecycle',
        body: 'Services, phone numbers, portability and travel eSIM managed from one console.',
      },
      {
        icon: ShieldCheck,
        title: 'Permission matrix',
        body: 'Role by action access control mirrored from the original abilities, with test coverage.',
      },
      {
        icon: Globe,
        title: 'Bilingual operations',
        body: 'English and Spanish parity, light and dark themes, built for long shifts.',
      },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'TanStack Table', 'Zod', 'Radix UI', 'Ruby on Rails API', 'Stripe', 'AWS'],
    shots: [
      { src: '/work/crm-dash.webp', caption: 'Network dashboard with live metrics per carrier (sample data)' },
      { src: '/work/crm-topups.webp', caption: 'Top-ups with filters, sorting and export (sample data)' },
      { src: '/work/crm-users.webp', caption: 'Customer management across brand segments (sample data)' },
      { src: '/work/crm-login.webp', caption: 'Operator sign-in' },
    ],
    privateNote: 'Private platform. Screens shown with sample data.',
  },
  {
    slug: 'checaturno',
    name: 'ChecaTurno',
    logo: '/work/logos/checaturno.webp',
    logoAlt: 'ChecaTurno logo',
    category: 'Workforce SaaS',
    categoryIcon: Clock,
    period: '2026 to now',
    role: 'Founder engineer, whole product',
    statement: 'A digital time clock that lives on every worker’s phone.',
    summary:
      'Teams check in from their phone or a kiosk, even offline. Managers watch a live presence panel, approve documented corrections and close each period with hours ready for payroll, ahead of the 2027 Mexican labor reform that makes an electronic record mandatory.',
    agentic:
      'API, web app, staff console, iOS and Android apps and this landing were built by one engineer directing coding agents. Repository skills run each CI workflow locally and deploy every service, with Playwright suites and Lighthouse gates as the bar a change has to clear.',
    highlights: [
      {
        icon: Users,
        title: 'Live presence panel',
        body: 'Who is working, on break or needs attention, updated as each person checks in.',
      },
      {
        icon: ClipboardCheck,
        title: 'Immutable records',
        body: 'Original check-ins are never edited. Corrections are documented and visible to the worker.',
      },
      {
        icon: Table2,
        title: 'Period table',
        body: 'Each person by each day, ready for payroll and visible to every worker for their own hours.',
      },
      {
        icon: CalendarClock,
        title: 'Five work modalities',
        body: 'Office, branches, field, remote and mixed teams, each with its own setup.',
      },
    ],
    stack: ['Next.js 16', 'React 19', 'TanStack Router', 'Expo', 'iOS', 'Android', 'Bun', 'Playwright', 'AWS CloudFront'],
    shots: [
      { src: '/work/ct-1.webp', caption: 'Home: the worker phone and manager panel, animated' },
      { src: '/work/ct-2.webp', caption: 'How it works: register, supervise, deliver' },
      { src: '/work/ct-3.webp', caption: 'Pricing calculator with plans per modality' },
      { src: '/work/ct-4.webp', caption: 'The 2027 labor reform and what the record must contain' },
    ],
    url: 'https://checaturno.mx/',
  },
];
