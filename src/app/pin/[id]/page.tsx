import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/providers/AppShell";
import { Avatar } from "@/components/ui/Avatar";
import { getSessionProfile } from "@/lib/auth/session";
import { DEMO_PINS } from "@/lib/demo-pins";

export const metadata: Metadata = { title: "Pin" };

export default async function PinPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, profile] = await Promise.all([params, getSessionProfile()]);
  const pin = DEMO_PINS.find((item) => item.id === id);
  if (!pin) notFound();

  return (
    <AppShell profile={profile}>
      <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <Link href="/" className="inline-flex items-center gap-2 rounded-pill px-3 py-2 text-sm font-semibold hover:bg-secondary"><ArrowLeft className="size-4" />Back to home</Link>
        <article className="mx-auto mt-4 grid max-w-5xl overflow-hidden rounded-sheet bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.12)] md:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
          <div className="relative min-h-[320px] bg-field"><Image src={pin.image_url} alt={pin.title ?? "Pin"} width={pin.width} height={pin.height} className="h-full w-full object-cover" priority /></div>
          <div className="flex flex-col p-6 sm:p-8">
            <p className="text-sm text-ink-muted">Idea</p>
            <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-tight">{pin.title}</h1>
            <p className="mt-4 text-sm leading-6 text-ink-muted">Save this idea to revisit it whenever inspiration strikes.</p>
            {pin.author && <Link href={`/${pin.author.username}`} className="mt-8 flex items-center gap-3 rounded-xl p-2 -mx-2 hover:bg-secondary"><Avatar src={pin.author.avatar_url} name={pin.author.full_name} username={pin.author.username} size="md" /><span><span className="block font-semibold">{pin.author.full_name || pin.author.username}</span><span className="block text-sm text-ink-muted">@{pin.author.username}</span></span></Link>}
            <div className="mt-auto pt-8"><Link href="/" className="inline-flex rounded-pill bg-accent px-5 py-3 font-semibold text-white hover:bg-accent-hover">Explore more ideas</Link></div>
          </div>
        </article>
      </main>
    </AppShell>
  );
}
