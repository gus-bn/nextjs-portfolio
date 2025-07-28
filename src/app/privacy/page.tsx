import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_CONFIG.name}`,
  description: "Privacy policy for Gustavo Beauregard's portfolio website.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-muted-foreground">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy describes how {SITE_CONFIG.name}{' '}
              (&quot;I&quot;, &quot;me&quot;, or &quot;my&quot;) collects, uses,
              and protects your information when you visit my portfolio website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Information I Collect
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-2">
                  Contact Form Data
                </h3>
                <p>When you use the contact form, I collect:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Your name</li>
                  <li>Your email address</li>
                  <li>Your message content</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">
                  Automatically Collected Information
                </h3>
                <p>When you visit my website, I may automatically collect:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Your IP address (for rate limiting purposes)</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on the site</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              How I Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>To respond to your inquiries and communications</li>
              <li>To prevent spam and abuse of the contact form</li>
              <li>To improve the website experience</li>
              <li>To analyze website usage patterns</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Data Storage and Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your contact form submissions are stored securely and are only
              accessible to me. I implement appropriate technical and
              organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or
              destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Third-Party Services
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This website may use third-party services for analytics and
              hosting. These services may collect information about your visit
              in accordance with their own privacy policies. This website is
              hosted on Vercel, and you can review their privacy policy at{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                vercel.com/legal/privacy-policy
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Your Rights
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to request access to, correction of, or
              deletion of your personal information. If you have any questions
              about this Privacy Policy or wish to exercise your rights, please
              contact me at{' '}
              <a
                href={SITE_CONFIG.links.email}
                className="text-primary hover:underline"
              >
                {SITE_CONFIG.links.email.replace('mailto:', '')}
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Contact Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact me at{' '}
              <a
                href={SITE_CONFIG.links.email}
                className="text-primary hover:underline"
              >
                {SITE_CONFIG.links.email.replace('mailto:', '')}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
