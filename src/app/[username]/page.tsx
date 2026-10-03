import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/providers/AppShell";
import { Avatar } from "@/components/ui/Avatar";
import { MasonryGrid } from "@/components/feed/MasonryGrid";
import { DEMO_PINS } from "@/lib/demo-pins";
import { getSessionProfile } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const [{ username }, session] = await Promise.all([params, getSessionProfile()]);
  const pins = DEMO_PINS.filter((pin) => pin.author?.username === username);
  const demoAuthor = pins[0]?.author;
  const isCurrentUser = session?.username === username;
  const author = isCurrentUser ? session : demoAuthor;
  if (!author) notFound();

  return (
    <AppShell profile={session}>
      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 pb-12 pt-8 sm:px-6">
        <section className="mx-auto flex max-w-xl flex-col items-center text-center"><Avatar src={author.avatar_url} name={author.full_name} username={author.username} size="lg" /><h1 className="mt-4 text-3xl font-semibold tracking-tight">{author.full_name || author.username}</h1><p className="mt-1 text-sm text-ink-muted">@{author.username}</p><p className="mt-4 text-sm text-ink-muted">A collection of ideas worth keeping.</p></section>
        <section className="mt-12"><h2 className="mb-5 text-xl font-semibold">Pins</h2>{pins.length ? <MasonryGrid pins={pins} /> : <p className="rounded-sheet bg-surface-alt p-8 text-center text-ink-muted">No public pins yet.</p>}</section>
      </main>
    </AppShell>
  );
}
