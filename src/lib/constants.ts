export const SITE_CONFIG = {
  name: 'Gustavo Beauregard',
  title: 'CTO, Founder & Tech Evangelist',
  description:
    'Portfolio of Gustavo Beauregard - CTO, Founder & Tech Evangelist specializing in full-stack development, team leadership, and technology innovation.',
  url: 'https://gustavobeauregard.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/gustavobeauregard',
    github: 'https://github.com/gustavobeauregard',
    linkedin: 'https://linkedin.com/in/gustavobeauregard',
    email: 'mailto:gustavo@example.com',
    resume: '/resume.pdf',
  },
  location: 'San Francisco, CA',
  availability: 'Available for new opportunities',
} as const;

export const NAVIGATION_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
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
  themes: ['light', 'dark', 'system'] as const,
} as const;

// Accessibility constants
export const FOCUS_VISIBLE_OUTLINE = '2px solid hsl(var(--ring))';
export const FOCUS_VISIBLE_OFFSET = '2px';

// Performance constants
export const INTERSECTION_THRESHOLD = 0.1;
export const INTERSECTION_ROOT_MARGIN = '-10% 0px -10% 0px';
