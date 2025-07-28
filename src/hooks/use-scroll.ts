'use client';

import { useEffect, useState } from 'react';
import { throttle } from '@/lib/utils';

export function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollY = throttle(() => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setScrollY(currentScrollY);
      lastScrollY = currentScrollY;
    }, 16); // ~60fps

    window.addEventListener('scroll', updateScrollY, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollY);
    };
  }, []);

  return { scrollY, scrollDirection };
}

export function useScrollToSection() {
  const scrollToSection = (sectionId: string, offset = 80) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return { scrollToSection };
}

export function useActiveSection(sectionIds: string[], offset = 100) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Debounce the active section changes to prevent rapid updates
    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        // Clear any pending timeout
        clearTimeout(timeoutId);

        // Find the section with the largest intersection ratio
        const mostVisibleEntry = entries.find((entry) => entry.isIntersecting);

        if (mostVisibleEntry) {
          // Debounce the state update to prevent rapid changes
          timeoutId = setTimeout(() => {
            setActiveSection(mostVisibleEntry.target.id);
          }, 50); // Small delay to prevent flickering
        }

        // Handle case where no section is intersecting (between sections)
        // Keep the current active section in this case
      },
      {
        rootMargin: `-${offset}px 0px -60% 0px`, // Improved margins
        threshold: [0.1, 0.3, 0.5], // Multiple thresholds for better detection
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [sectionIds, offset]);

  return activeSection;
}

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    }, 16);

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return scrollProgress;
}
