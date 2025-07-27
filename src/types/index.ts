export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  bio: string;
  highlights: Highlight[];
  socialLinks: SocialLink[];
}

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  color: 'primary' | 'secondary' | 'accent';
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  color: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  project: string;
  message: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface PortfolioContent {
  personal: PersonalInfo;
  experience: Experience[];
  skills: SkillCategory[];
  projects: Project[];
}

// Theme-related types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  attribute: 'class' | 'data-theme';
  defaultTheme: Theme;
  enableSystem: boolean;
  disableTransitionOnChange: boolean;
}

// Layout-related types
export interface LayoutProps {
  children: React.ReactNode;
}

export interface MetadataConfig {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  url: string;
  ogImage: string;
}
