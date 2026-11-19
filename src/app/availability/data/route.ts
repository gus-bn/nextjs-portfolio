import { NextResponse } from "next/server";

import { fetchAvailability } from "@/lib/availability";

/** The same anonymous free/busy the page renders, for its live refresh. */
export const dynamic = "force-dynamic";

export async function GET() {
  const result = await fetchAvailability();
  return NextResponse.json(result, {
    status: result.ok ? 200 : 503,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
