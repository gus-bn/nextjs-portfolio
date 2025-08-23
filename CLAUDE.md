# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack for fast builds
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## Architecture Overview

This is a Next.js 15 portfolio application using the App Router with a component-based architecture:

### Core Technologies
- **Next.js 15** with App Router and TypeScript
- **React 19** with modern hooks and patterns
- **Tailwind CSS v4** with custom design system via CSS custom properties
- **Framer Motion** for animations and transitions
- **next-themes** for theme management (dark/light/system)
- **React Hook Form** with Zod validation for forms
- **dotenv-safe** for secure environment variable management

### Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── api/contact/        # Contact form API endpoint
│   ├── layout.tsx          # Root layout with fonts and themes
│   └── page.tsx            # Home page composition
├── components/
│   ├── layout/             # Layout components (Header, Footer)
│   ├── sections/           # Page sections (Hero, About, Experience, Skills, Contact)
│   ├── theme/              # Theme provider and toggle components
│   └── ui/                 # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and constants
└── types/                  # TypeScript type definitions
```

### Key Architectural Patterns

1. **Component Composition**: Main page composed of section components for modularity
2. **Custom Design System**: Tailwind configured with CSS custom properties for theming
3. **Type-Safe Configuration**: All constants and configs are typed and exported from `lib/constants.ts`
4. **Environment Validation**: Uses dotenv-safe to ensure required env vars are present
5. **API Integration**: Contact form submits to external webhook via `API_URL` environment variable

### Theme System
- CSS custom properties defined in globals.css for colors
- Theme switching handled by next-themes provider
- Supports light/dark/system modes with automatic detection
- Theme persistence across sessions

### Form Handling
- Contact form uses React Hook Form with Zod validation
- Server-side validation and rate limiting in API route
- Spam protection via honeypot fields and keyword filtering
- External API integration for form submission

### Development Notes

- Uses Geist fonts (Sans and Mono) loaded from Google Fonts
- Image optimization configured for WebP/AVIF formats
- Turbopack enabled for fast development builds
- ESLint configured with Next.js and TypeScript rules
- Strict TypeScript configuration with path mapping (@/ → src/)

### Environment Variables

Required environment variables (validated by dotenv-safe):
- `API_URL` - Webhook endpoint for contact form submissions

### Performance Optimizations

- Package imports optimized for lucide-react and framer-motion
- Image formats configured for modern browsers
- Font display optimization with swap strategy
- Component-level code splitting via dynamic imports where needed