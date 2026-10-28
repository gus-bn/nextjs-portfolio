'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

/**
 * Two-state light/dark switch. Until the visitor picks one, the site follows
 * their operating system (next-themes `defaultTheme="system"`); the first click
 * flips whatever is currently showing.
 */
export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn('h-9 w-9 border border-input bg-background', className)}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === 'dark';
  const next = isDark ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className={cn(
        'inline-flex items-center justify-center gap-2 overflow-hidden border border-input bg-background px-3 py-2 text-sm font-medium transition-colors duration-200',
        'hover:border-foreground/40',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        !showLabel && 'h-9 w-9 px-0',
        className
      )}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ y: -14, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 14, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
      {showLabel && (
        <span className="hidden sm:inline-block">{isDark ? 'Dark' : 'Light'}</span>
      )}
    </button>
  );
}
