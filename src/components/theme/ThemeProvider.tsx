'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { THEME_CONFIG } from '@/lib/constants';

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: 'class' | 'data-theme';
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  themes?: string[];
  storageKey?: string;
}

export function ThemeProvider({
  children,
  attribute = THEME_CONFIG.attribute,
  defaultTheme = THEME_CONFIG.defaultTheme,
  enableSystem = THEME_CONFIG.enableSystem,
  disableTransitionOnChange = THEME_CONFIG.disableTransitionOnChange,
  themes = ['light', 'dark'],
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  // Add transition class to prevent flash during theme changes
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease !important;
      }
      
      @media (prefers-reduced-motion: reduce) {
        * {
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      themes={themes}
      storageKey={storageKey}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

// Custom hook for theme with additional utilities
export function useThemeConfig() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return {
    mounted,
    themes: THEME_CONFIG.themes,
    defaultTheme: THEME_CONFIG.defaultTheme,
  };
}
