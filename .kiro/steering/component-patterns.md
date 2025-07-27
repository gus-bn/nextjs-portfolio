# Component Patterns and Best Practices

This document defines the preferred patterns and conventions for building components in the Next.js Portfolio project.

## Component Types and Patterns

### Page Components

Page components should be default exports and handle the main layout structure:

```typescript
// src/app/page.tsx
import { Header } from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        <Hero />
        {/* Other sections */}
      </main>
    </>
  );
}
```

### Section Components

Section components represent major page sections and should be self-contained:

```typescript
// src/components/sections/Hero.tsx
interface HeroProps {
  title?: string;
  subtitle?: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {title || 'Default Title'}
        </h1>
        {subtitle && (
          <p className="text-xl text-muted-foreground mb-8">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
```

### Layout Components

Layout components handle navigation, headers, footers, and overall page structure:

```typescript
// src/components/layout/Header.tsx
'use client';

import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Navigation content */}
        <ThemeToggle />
      </nav>
    </header>
  );
}
```

### UI Components

Reusable UI components should be highly composable and follow a consistent API:

```typescript
// src/components/ui/button.tsx
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90':
            variant === 'default',
          'border border-input hover:bg-accent': variant === 'outline',
          'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
        },
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}
```

## Custom Hooks Patterns

### State Management Hooks

```typescript
// src/hooks/use-scroll.ts
'use client';

import { useState, useEffect } from 'react';

export function useScroll() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}
```

### Theme Management Hooks

```typescript
// src/hooks/use-theme.ts
'use client';

import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();

  return {
    theme,
    setTheme,
    systemTheme,
    isDark: theme === 'dark' || (theme === 'system' && systemTheme === 'dark'),
  };
}
```

## Styling Patterns

### Responsive Design

Use Tailwind's responsive prefixes consistently:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

### Theme-Aware Styling

Use semantic color classes that work with both themes:

```typescript
<div className="bg-background text-foreground border border-border">
  <h2 className="text-primary">Themed Content</h2>
  <p className="text-muted-foreground">Secondary text</p>
</div>
```

### Animation Patterns

Use Framer Motion for smooth animations:

```typescript
import { motion } from 'framer-motion';

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}
```

## Error Handling Patterns

### Error Boundaries

```typescript
// src/components/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

## Form Handling Patterns

### React Hook Form with Zod

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    // Handle form submission
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{/* Form fields */}</form>;
}
```

## Performance Optimization Patterns

### Lazy Loading

```typescript
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./HeavyComponent'));

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### Memoization

```typescript
import { memo, useMemo } from 'react';

interface ExpensiveComponentProps {
  data: any[];
  filter: string;
}

export const ExpensiveComponent = memo(function ExpensiveComponent({
  data,
  filter,
}: ExpensiveComponentProps) {
  const filteredData = useMemo(() => {
    return data.filter((item) => item.name.includes(filter));
  }, [data, filter]);

  return (
    <div>
      {filteredData.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});
```
