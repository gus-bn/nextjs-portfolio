'use client';

import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useTheme() {
  const { theme, setTheme, resolvedTheme, themes, systemTheme } =
    useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cycle through themes: light -> dark -> system -> light
  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  // Get the next theme in the cycle
  const getNextTheme = () => {
    if (theme === 'light') return 'dark';
    if (theme === 'dark') return 'system';
    return 'light';
  };

  // Check if current theme is dark
  const isDark = resolvedTheme === 'dark';

  // Check if current theme is light
  const isLight = resolvedTheme === 'light';

  // Check if using system theme
  const isSystem = theme === 'system';

  return {
    theme,
    setTheme,
    resolvedTheme,
    themes,
    systemTheme,
    mounted,
    cycleTheme,
    getNextTheme,
    isDark,
    isLight,
    isSystem,
  };
}

// Hook for theme-aware animations
export function useThemeTransition() {
  const { mounted, resolvedTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!mounted) return;

    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match CSS transition duration

    return () => clearTimeout(timer);
  }, [resolvedTheme, mounted]);

  return {
    isTransitioning,
    mounted,
  };
}

// Hook for system theme detection
export function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Set initial value
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return systemTheme;
}
