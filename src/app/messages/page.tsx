import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { AppShell } from "@/components/providers/AppShell";
import { getSessionProfile } from "@/lib/auth/session";

export default async function MessagesPage() {
  const profile = await getSessionProfile();

  return (
    <AppShell profile={profile}>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-10 sm:px-6">
        <div className="rounded-card border border-hairline bg-surface p-8 text-center shadow-sm">
          <MessageCircle className="mx-auto size-9 text-ink-muted" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-bold text-ink">Messages</h1>
          <p className="mt-2 text-ink-muted">There are no messages yet.</p>
          <Link href="/" className="mt-6 inline-flex h-10 items-center justify-center rounded-pill bg-secondary px-4 text-[15px] font-semibold text-ink transition-colors hover:bg-secondary-hover active:scale-[0.97]">
            Back to home
          </Link>
        </div>
      </main>
    </AppShell>
  );
}
