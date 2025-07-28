'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import {
  useScroll,
  useScrollToSection,
  useActiveSection,
  useScrollProgress,
} from '@/hooks/use-scroll';
import { SITE_CONFIG, NAVIGATION_ITEMS, HEADER_HEIGHT } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { scrollToSection } = useScrollToSection();
  const activeSection = useActiveSection(
    NAVIGATION_ITEMS.map((item) => item.href.replace('#', ''))
  );
  const scrollProgress = useScrollProgress();

  // Close mobile menu when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('[data-mobile-menu]')) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';

      // Focus management - focus first navigation item when menu opens
      const firstNavItem = document.querySelector(
        '[data-mobile-nav-item]'
      ) as HTMLElement;
      if (firstNavItem) {
        setTimeout(() => firstNavItem.focus(), 100);
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle navigation click
  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  // Handle logo click - scroll to top
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // Header background opacity based on scroll
  const headerOpacity = Math.min(scrollY / 100, 0.95);
  const isScrolled = scrollY > 20;

  const socialLinks = [
    {
      name: 'GitHub',
      href: SITE_CONFIG.links.github,
      icon: Github,
      label: 'View GitHub profile',
    },
    {
      name: 'LinkedIn',
      href: SITE_CONFIG.links.linkedin,
      icon: Linkedin,
      label: 'Connect on LinkedIn',
    },
    {
      name: 'Email',
      href: SITE_CONFIG.links.email,
      icon: Mail,
      label: 'Send an email',
    },
  ];

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'border-b border-border/40',
          isScrolled && 'backdrop-blur-md'
        )}
        style={{
          backgroundColor: `hsl(var(--background) / ${headerOpacity})`,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div
            className="flex items-center justify-between"
            style={{ height: HEADER_HEIGHT }}
          >
            {/* Logo */}
            <motion.button
              onClick={handleLogoClick}
              className={cn(
                'flex items-center space-x-2 text-xl font-bold',
                'hover:text-primary transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                'rounded-md px-2 py-1'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {SITE_CONFIG.name.split(' ').map((word, index) => (
                  <span key={index}>
                    {word.charAt(0)}
                    {index < SITE_CONFIG.name.split(' ').length - 1 && ''}
                  </span>
                ))}
              </span>
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {NAVIGATION_ITEMS.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'text-sm font-medium transition-colors duration-200',
                      'hover:text-primary focus:text-primary',
                      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                      'rounded-md px-3 py-2 relative',
                      isActive && 'text-primary'
                    )}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {item.name}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-1/2 w-1 h-1 bg-primary rounded-full"
                          layoutId="activeIndicator"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{
                            duration: 0.2,
                            ease: 'easeInOut',
                          }}
                          style={{ x: '-50%' }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Social Links */}
              <div className="flex items-center space-x-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target={
                        social.href.startsWith('mailto:') ? '_self' : '_blank'
                      }
                      rel={
                        social.href.startsWith('mailto:')
                          ? undefined
                          : 'noopener noreferrer'
                      }
                      className={cn(
                        'p-2 rounded-md transition-colors duration-200',
                        'hover:bg-accent hover:text-accent-foreground',
                        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Resume Button */}
              <motion.a
                href={SITE_CONFIG.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center space-x-2 px-4 py-2',
                  'bg-primary text-primary-foreground rounded-md',
                  'hover:bg-primary/90 transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  'text-sm font-medium'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="h-4 w-4" />
                <span>Resume</span>
              </motion.a>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <ThemeToggle />
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'p-2 rounded-md transition-colors duration-200',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                )}
                whileTap={{ scale: 0.9 }}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                data-mobile-menu
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary origin-left"
          style={{
            width: `${scrollProgress}%`,
            opacity: scrollY > 100 ? 1 : 0,
          }}
          transition={{ opacity: { duration: 0.2 } }}
        />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              className={cn(
                'fixed top-0 right-0 h-full w-80 max-w-[80vw] z-50',
                'bg-background border-l border-border shadow-lg md:hidden'
              )}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              data-mobile-menu
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div
                  className="flex items-center justify-between p-4 border-b border-border"
                  style={{ height: HEADER_HEIGHT }}
                >
                  <span className="text-lg font-semibold">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'p-2 rounded-md transition-colors duration-200',
                      'hover:bg-accent hover:text-accent-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-ring'
                    )}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav
                  className="flex-1 px-4 py-6"
                  role="navigation"
                  aria-label="Mobile navigation"
                >
                  <div className="space-y-4">
                    {NAVIGATION_ITEMS.map((item, index) => {
                      const sectionId = item.href.replace('#', '');
                      const isActive = activeSection === sectionId;

                      return (
                        <motion.button
                          key={item.name}
                          onClick={() => handleNavClick(item.href)}
                          className={cn(
                            'w-full text-left px-4 py-3 rounded-md relative',
                            'text-lg font-medium transition-colors duration-200',
                            'hover:bg-accent hover:text-accent-foreground',
                            'focus:outline-none focus:ring-2 focus:ring-ring',
                            'touch-manipulation', // Ensures touch-friendly interaction
                            isActive && 'bg-accent text-accent-foreground'
                          )}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileTap={{ scale: 0.98 }}
                          data-mobile-nav-item={
                            index === 0 ? 'first' : undefined
                          }
                          aria-label={`Navigate to ${item.name} section`}
                        >
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                className="absolute left-1 top-1/2 w-1 h-6 bg-primary rounded-full"
                                layoutId="mobileActiveIndicator"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{
                                  duration: 0.2,
                                  ease: 'easeInOut',
                                }}
                                style={{ y: '-50%' }}
                              />
                            )}
                          </AnimatePresence>
                          <span className={cn(isActive && 'ml-4')}>
                            {item.name}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Mobile Social Links */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">
                      Connect
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                          <motion.a
                            key={social.name}
                            href={social.href}
                            target={
                              social.href.startsWith('mailto:')
                                ? '_self'
                                : '_blank'
                            }
                            rel={
                              social.href.startsWith('mailto:')
                                ? undefined
                                : 'noopener noreferrer'
                            }
                            className={cn(
                              'flex items-center space-x-3 p-3 rounded-md',
                              'transition-colors duration-200',
                              'hover:bg-accent hover:text-accent-foreground',
                              'focus:outline-none focus:ring-2 focus:ring-ring',
                              'touch-manipulation min-h-[44px]' // Touch-friendly minimum size
                            )}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={social.label}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="text-sm font-medium">
                              {social.name}
                            </span>
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobile Resume Button */}
                  <motion.a
                    href={SITE_CONFIG.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center justify-center space-x-2 w-full mt-6 p-4',
                      'bg-primary text-primary-foreground rounded-md',
                      'hover:bg-primary/90 transition-colors duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-ring',
                      'text-base font-medium touch-manipulation min-h-[44px]'
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FileText className="h-5 w-5" />
                    <span>Download Resume</span>
                  </motion.a>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
