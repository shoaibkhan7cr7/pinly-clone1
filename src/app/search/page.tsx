import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/providers/AppShell";
import { MasonryGrid } from "@/components/feed/MasonryGrid";
import { DEMO_PINS } from "@/lib/demo-pins";
import { getSessionProfile } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const [{ q = "" }, profile] = await Promise.all([searchParams, getSessionProfile()]);
  const query = q.trim().toLowerCase();
  const pins = query
    ? DEMO_PINS.filter((pin) => `${pin.title} ${pin.author?.username} ${pin.author?.full_name}`.toLowerCase().includes(query))
    : DEMO_PINS;

  return (
    <AppShell profile={profile}>
      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 pb-12 pt-6 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Search ideas</h1>
        <form action="/search" className="mt-5 flex max-w-2xl gap-2">
          <input name="q" defaultValue={q} placeholder="Search ideas, people or styles" className="h-12 min-w-0 flex-1 rounded-pill bg-field px-5 text-ink outline-none ring-offset-2 focus:ring-2 focus:ring-blue-500" />
          <button className="rounded-pill bg-ink px-5 font-semibold text-bg transition-opacity hover:opacity-85">Search</button>
        </form>
        {query ? <p className="mt-7 text-sm text-ink-muted">{pins.length} result{pins.length === 1 ? "" : "s"} for <span className="font-semibold text-ink">{q}</span></p> : <p className="mt-7 text-sm text-ink-muted">Explore ideas from the Pinly community.</p>}
        {pins.length ? <div className="mt-5"><MasonryGrid pins={pins} /></div> : <div className="mt-12 rounded-sheet bg-surface-alt p-8 text-center"><p className="font-semibold">No ideas found yet.</p><Link href="/" className="mt-3 inline-block font-semibold text-accent hover:underline">Browse the home feed</Link></div>}
      </main>
    </AppShell>
  );
}
