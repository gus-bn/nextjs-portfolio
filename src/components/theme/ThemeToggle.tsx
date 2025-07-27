'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'button' | 'dropdown';
}

export function ThemeToggle({
  className,
  showLabel = false,
  variant = 'button',
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          'h-9 w-9 rounded-md border border-input bg-background',
          className
        )}
        aria-hidden="true"
      />
    );
  }

  if (variant === 'dropdown') {
    return <ThemeDropdown className={className} showLabel={showLabel} />;
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-4 w-4" />;
    }
    return resolvedTheme === 'dark' ? (
      <Moon className="h-4 w-4" />
    ) : (
      <Sun className="h-4 w-4" />
    );
  };

  const getLabel = () => {
    if (theme === 'system') return 'System';
    return resolvedTheme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition-all duration-200',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        !showLabel && 'h-9 w-9 px-0',
        className
      )}
      aria-label={`Switch to ${
        theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
      } theme`}
      title={`Current theme: ${getLabel()}. Click to switch.`}
    >
      <span className="transition-transform duration-200 hover:scale-110">
        {getIcon()}
      </span>
      {showLabel && (
        <span className="hidden sm:inline-block">{getLabel()}</span>
      )}
    </button>
  );
}

function ThemeDropdown({
  className,
  showLabel,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const getThemeIcon = (themeName: string) => {
    switch (themeName) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  const getCurrentIcon = () => {
    return getThemeIcon(theme || 'system');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition-all duration-200',
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          !showLabel && 'h-9 w-9 px-0',
          className
        )}
        aria-label="Theme selector"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className="transition-transform duration-200 hover:scale-110">
          {getCurrentIcon()}
        </span>
        {showLabel && (
          <span className="hidden sm:inline-block capitalize">
            {theme || 'system'}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
            'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2'
          )}
          role="menu"
          aria-orientation="vertical"
        >
          {themes.map((themeName) => (
            <button
              key={themeName}
              onClick={() => {
                setTheme(themeName);
                setIsOpen(false);
              }}
              className={cn(
                'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:bg-accent focus:text-accent-foreground',
                theme === themeName && 'bg-accent text-accent-foreground'
              )}
              role="menuitem"
            >
              {getThemeIcon(themeName)}
              <span className="capitalize">{themeName}</span>
              {theme === themeName && (
                <span className="ml-auto h-2 w-2 rounded-full bg-current" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
