'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, FileText, Shield } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

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

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Project Description */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
              {SITE_CONFIG.description}
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              {SITE_CONFIG.location} • {SITE_CONFIG.availability}
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-6">
            {/* Social Links */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Connect
              </h4>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
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
                        'inline-flex items-center justify-center h-9 px-3 rounded-md text-sm font-medium',
                        'bg-background hover:bg-accent hover:text-accent-foreground',
                        'border border-input transition-colors duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                      )}
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {social.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Resume Download */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Resume
              </h4>
              <Link
                href={SITE_CONFIG.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium',
                  'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                  'transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                )}
                aria-label="Download resume"
              >
                <FileText className="h-4 w-4 mr-2" />
                Download Resume
              </Link>
            </div>

            {/* Privacy Policy */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Legal
              </h4>
              <Link
                href="/privacy"
                className={cn(
                  'inline-flex items-center justify-center h-9 px-3 rounded-md text-sm font-medium',
                  'bg-background hover:bg-accent hover:text-accent-foreground',
                  'transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                )}
                aria-label="View privacy policy"
              >
                <Shield className="h-4 w-4 mr-2" />
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">Coded with love ❤️</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
