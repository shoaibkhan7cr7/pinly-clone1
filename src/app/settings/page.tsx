import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/providers/AppShell";
import { Avatar } from "@/components/ui/Avatar";
import { getSessionProfile } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const profile = await getSessionProfile();

  return (
    <AppShell profile={profile}>
      <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <section className="mt-8 rounded-sheet border border-hairline bg-surface p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Account</h2>
          {profile && <div className="mt-5 flex items-center gap-4"><Avatar src={profile.avatar_url} name={profile.full_name} username={profile.username} size="lg" /><div><p className="font-semibold">{profile.full_name || profile.username}</p><p className="text-sm text-ink-muted">@{profile.username}</p></div></div>}
          <p className="mt-6 text-sm leading-6 text-ink-muted">Your account is active. You can return to your profile or continue discovering ideas.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {profile && <Link href={`/${profile.username}`} className="rounded-pill bg-ink px-4 py-2.5 text-sm font-semibold text-bg hover:opacity-85">View profile</Link>}
            <Link href="/" className="rounded-pill bg-secondary px-4 py-2.5 text-sm font-semibold hover:bg-secondary-hover">Home</Link>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
