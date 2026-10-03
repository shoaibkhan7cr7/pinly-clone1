import type { Metadata } from "next";
import Link from "next/link";
import { ImagePlus } from "lucide-react";
import { AppShell } from "@/components/providers/AppShell";
import { getSessionProfile } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Create" };

export default async function CreatePage() {
  const profile = await getSessionProfile();

  return (
    <AppShell profile={profile}>
      <main className="mx-auto flex min-h-[60vh] max-w-2xl items-start px-4 py-10 sm:px-6">
        <section className="w-full rounded-sheet bg-surface p-6 shadow-[0_4px_24px_rgba(0,0,0,0.1)] sm:p-8">
          <ImagePlus className="size-9 text-accent" aria-hidden="true" />
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">Create a new pin</h1>
          <p className="mt-2 max-w-xl leading-6 text-ink-muted">Choose an image or idea you want to keep. Publishing and image uploads are being connected to your board workflow next.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/search" className="rounded-pill bg-ink px-5 py-3 font-semibold text-bg hover:opacity-85">Find inspiration</Link>
            <Link href="/" className="rounded-pill bg-secondary px-5 py-3 font-semibold text-ink hover:bg-secondary-hover">Back to home</Link>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
