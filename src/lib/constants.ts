export const SITE_CONFIG = {
  /** Person only, used for copyright, author metadata and prose. */
  name: 'Gustavo Beauregard',
  /** Current professional title, the single source of truth for the site. */
  title: 'Senior AI & Full-Stack Engineer',
  /** Name + title, for page titles, OG tags and other metadata. */
  siteName: 'Gustavo Beauregard | Senior AI & Full-Stack Engineer',
  description:
    'AI engineer with 18+ years shipping production systems. I build agentic AI products, from browser and conversational agents to RAG and vector search, on architectures that scale to millions of users. Ruby on Rails, Node.js, Python, React/Next.js, AWS.',
  url: 'https://www.gusb.dev/',
  ogImage: '/og-image.png?v=2',
  links: {
    github: 'https://github.com/gus-bn',
    linkedin: 'https://linkedin.com/in/gus-beauregard',
    email: 'mailto:hello@gusb.dev',
    resume: '/resume.pdf',
  },
  location: 'Querétaro, MX',
  availability: 'Open to remote opportunities',
} as const;

export const NAVIGATION_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Agents', href: '#agents' },
  { name: 'Work', href: '#portfolio' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
] as const;

// Layout constants
export const SCROLL_OFFSET = 80; // Offset for fixed header
export const HEADER_HEIGHT = 64; // Header height in pixels
export const SECTION_PADDING = 80; // Section padding in pixels
export const CONTAINER_MAX_WIDTH = 1200; // Max container width in pixels

// Animation constants
export const ANIMATION_DURATION = 0.3;
export const ANIMATION_TIMING = 'cubic-bezier(0.4, 0, 0.2, 1)';
export const THROTTLE_DELAY = 16; // ~60fps
export const DEBOUNCE_DELAY = 300; // For search/input debouncing

// Theme constants
export const THEME_CONFIG = {
  attribute: 'class' as const,
  defaultTheme: 'system' as const,
  enableSystem: true,
  disableTransitionOnChange: false,
  themes: ['light', 'dark'] as const,
} as const;

// Accessibility constants
export const FOCUS_VISIBLE_OUTLINE = '2px solid hsl(var(--ring))';
export const FOCUS_VISIBLE_OFFSET = '2px';

// Performance constants
export const INTERSECTION_THRESHOLD = 0.1;
export const INTERSECTION_ROOT_MARGIN = '-10% 0px -10% 0px';
