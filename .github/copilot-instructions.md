# AI Coding Agent Instructions for Next.js Portfolio

## Project Overview

This is a professional portfolio built with Next.js 15, featuring a single-page application with smooth scroll navigation, dark/light theme support, and advanced contact form handling. The codebase follows modern React patterns with TypeScript strict mode and comprehensive accessibility features.

## Architecture & Key Patterns

### Configuration-Driven Design

- **Central config**: All site content, navigation, and constants live in `/src/lib/constants.ts`
- **SITE_CONFIG**: Contains personal info, social links, and site metadata - modify this for content changes
- **NAVIGATION_ITEMS**: Defines main navigation sections - must match section IDs in `page.tsx`
- **Layout constants**: HEADER_HEIGHT, SCROLL_OFFSET etc. used throughout for consistent spacing

### Theme System Architecture

- **Provider chain**: `ThemeProvider` wraps app in `layout.tsx`, using next-themes with system preference detection
- **CSS variables**: Theme colors defined as HSL custom properties in `globals.css` (e.g., `hsl(var(--primary))`)
- **Component integration**: Use `cn()` utility for conditional classes, theme-aware animations respect `prefers-reduced-motion`

### Scroll-Based Navigation

- **Custom hooks**: `/src/hooks/use-scroll.ts` provides `useActiveSection`, `useScrollToSection`, `useScrollProgress`
- **Performance**: Throttled scroll listeners (16ms) with passive event listeners and Intersection Observer API
- **Section IDs**: Must match between navigation items and actual section IDs (hero, about, experience, skills, contact)

### Form Handling & Security

- **Validation**: React Hook Form + Zod schemas with real-time validation and character counting
- **API route**: `/src/app/api/contact/route.ts` implements rate limiting (5/15min), honeypot fields, spam filtering
- **Security layers**: Server-side validation, IP-based rate limiting, keyword filtering, honeypot protection

### Component Structure

```
sections/          # Page sections (Hero, About, Experience, Skills, Contact)
layout/           # Layout components (Header with complex nav logic)
ui/               # Reusable UI primitives (Button, Input, Card, etc.)
theme/            # Theme-specific components (Provider, Toggle)
```

## Development Workflows

### Running the App

```bash
npm run dev          # Development with Turbopack (fast refresh)
npm run build        # Production build
npm run lint         # ESLint with Next.js config
```

### Adding New Sections

1. Create component in `src/components/sections/`
2. Add to `src/app/page.tsx` main component
3. Update `NAVIGATION_ITEMS` in constants.ts
4. Ensure section has proper `id` attribute for scroll navigation
5. Add to `useActiveSection` hook array in `Header.tsx`

### Styling Conventions

- **Utility-first**: Tailwind CSS with custom design system in `tailwind.config.ts`
- **Class composition**: Use `cn()` utility for conditional classes (`import { cn } from '@/lib/utils'`)
- **Theme variables**: Always use CSS custom properties (e.g., `bg-primary`, `text-foreground`)
- **Responsive**: Mobile-first approach, touch-friendly interactive elements (min-44px)

### Animation Patterns

- **Framer Motion**: Used for page transitions, scroll-triggered animations, and micro-interactions
- **Performance**: CSS transforms preferred, `whileInView` for scroll animations
- **Accessibility**: Animations respect `prefers-reduced-motion`, focus management for interactive elements
- **Common patterns**: Staggered children animations, layout animations with `layoutId`

## Key Integration Points

### Contact Form Flow

1. Client: React Hook Form + Zod validation in `Contact.tsx`
2. API: `/api/contact` route with security measures
3. Success/error states with toast notifications
4. Honeypot field (`website`) automatically handled

### Header Navigation

- **Active state**: Uses Intersection Observer to highlight current section
- **Smooth scroll**: Custom hook with offset calculation for fixed header
- **Mobile menu**: Complex state management with focus management and escape key handling
- **Social links**: Pulled from `SITE_CONFIG.links`, handles mailto: vs external links

### Performance Optimizations

- **Font loading**: Geist fonts with `display: 'swap'` and preload
- **Scroll performance**: Throttled event handlers, passive listeners
- **Bundle optimization**: Next.js 15 with Turbopack for development
- **Image optimization**: Use Next.js Image component for any images

## Critical Dependencies

- **next-themes**: Theme switching with system preference
- **framer-motion**: Animations and transitions
- **react-hook-form + @hookform/resolvers**: Form state management
- **zod**: Runtime type validation
- **tailwind-merge + clsx**: Utility class composition
- **lucide-react**: Icon system

## Common Gotchas

- **Section IDs**: Must exactly match navigation href values (without #)
- **Scroll offset**: Account for fixed header height (HEADER_HEIGHT = 64px)
- **Theme flash**: Use `suppressHydrationWarning` on html/body elements
- **Mobile menu**: Requires proper focus management and body scroll lock
- **Rate limiting**: Contact form has built-in limits - test with different IPs
- **TypeScript strict**: All props must be typed, use existing interfaces in `/src/types/`

## File Naming Conventions

- Components: PascalCase (e.g., `ContactForm.tsx`)
- Hooks: kebab-case with `use-` prefix (e.g., `use-scroll.ts`)
- Utilities: kebab-case (e.g., `constants.ts`, `utils.ts`)
- API routes: follow Next.js App Router conventions (`route.ts`)
