import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";

import { AvailabilityView } from "./AvailabilityView";
import "./availability.css";
import { fetchAvailability } from "@/lib/availability";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * Unlisted: no link anywhere on the site, not in the sitemap, noindex in
 * both the page and an X-Robots-Tag header (next.config.ts). Deliberately not
 * in robots.txt either, which would only advertise the path.
 *
 * Rendered live on every request; the view re-syncs every minute and when
 * the tab comes back into focus.
 */
export const dynamic = "force-dynamic";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: `${SITE_CONFIG.name}'s schedule` },
  description: "When I am free to meet.",
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
  const initial = await fetchAvailability();
  return (
    <div className={`${display.variable} sched`}>
      <AvailabilityView initial={initial} name={SITE_CONFIG.name} />
    </div>
  );
}
