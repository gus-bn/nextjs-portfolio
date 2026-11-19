import type { Metadata } from 'next';

import { AvailabilityView } from './AvailabilityView';
import { fetchAvailability } from '@/lib/availability';

/**
 * Unlisted: no link anywhere on the site, not in the sitemap, noindex in
 * both the page and an X-Robots-Tag header (next.config.ts). Deliberately not
 * in robots.txt either, which would only advertise the path.
 *
 * Rendered on the server and cached for REVALIDATE_SECONDS (5 minutes).
 */
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Availability',
  description: 'When I am free to meet.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

export default async function AvailabilityPage() {
  const result = await fetchAvailability();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Availability</h1>
          <p className="max-w-2xl text-muted-foreground">
            When I&apos;m free over the next two weeks. Busy blocks come straight from my
            calendars, with no details. Pick a free slot and send me a message to lock it in.
          </p>
        </header>
        {result.ok ? (
          <AvailabilityView data={result.data} />
        ) : (
          <p className="rounded-lg border border-border p-6 text-muted-foreground">
            {result.reason === 'not_configured'
              ? 'The calendar is not connected yet.'
              : 'I could not load the calendar right now. Try again in a few minutes.'}
          </p>
        )}
      </div>
    </main>
  );
}
