# Project Standards and Guidelines

This document outlines the coding standards, conventions, and best practices for the Next.js Portfolio project.

## Code Style and Formatting

### TypeScript Standards

- Use TypeScript for all components and utilities
- Prefer explicit return types for functions
- Use interface over type for object definitions
- Enable strict mode in tsconfig.json

### Component Structure

```typescript
// Preferred component structure
interface ComponentProps {
  // Props definition
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}

// Default export for page components
export default ComponentName;
```

### File Naming Conventions

- Components: PascalCase (e.g., `Hero.tsx`, `ThemeToggle.tsx`)
- Hooks: camelCase with `use-` prefix (e.g., `use-scroll.ts`)
- Utilities: camelCase (e.g., `utils.ts`, `constants.ts`)
- Pages: lowercase with hyphens (e.g., `not-found.tsx`)

## Project Architecture

### Directory Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/layout/` - Layout-specific components
- `src/components/sections/` - Page section components
- `src/components/ui/` - Reusable UI components
- `src/components/theme/` - Theme-related components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and constants
- `src/types/` - TypeScript type definitions

### Component Organization

- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use composition over inheritance
- Prefer function components over class components

## Styling Guidelines

### Tailwind CSS Usage

- Use Tailwind utility classes for styling
- Create custom components for repeated patterns
- Use CSS custom properties for theme variables
- Follow mobile-first responsive design

### Theme Implementation

- Support both dark and light themes
- Use semantic color names (e.g., `background`, `foreground`)
- Implement theme toggle functionality
- Respect user's system preferences

## Performance Best Practices

### Next.js Optimization

- Use Next.js Image component for images
- Implement proper SEO with metadata
- Utilize App Router for better performance
- Enable Turbopack for development

### React Best Practices

- Use React.memo for expensive components
- Implement proper key props for lists
- Avoid unnecessary re-renders
- Use Suspense for loading states

## Accessibility Standards

### WCAG Compliance

- Maintain proper heading hierarchy
- Provide alt text for images
- Ensure keyboard navigation support
- Use semantic HTML elements

### Implementation

- Use proper ARIA labels
- Implement focus management
- Ensure color contrast compliance
- Test with screen readers

## Development Workflow

### Git Conventions

- Use conventional commit messages
- Create feature branches for new work
- Write descriptive commit messages
- Keep commits focused and atomic

### Testing Strategy

- Write unit tests for utilities
- Test component rendering
- Validate accessibility features
- Test theme switching functionality

## Dependencies Management

### Package Selection Criteria

- Prefer well-maintained packages
- Consider bundle size impact
- Ensure TypeScript support
- Check for security vulnerabilities

### Current Key Dependencies

- Next.js 15 - React framework
- Tailwind CSS v4 - Styling
- Framer Motion - Animations
- next-themes - Theme management
- React Hook Form - Form handling
- Zod - Schema validation
