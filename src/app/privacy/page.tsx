import type { Metadata } from "next";
import { AppShell } from "@/components/providers/AppShell";
import { getSessionProfile } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPage() { const profile = await getSessionProfile(); return <AppShell profile={profile}><main className="mx-auto min-h-[60vh] max-w-3xl px-6 py-12"><h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1><div className="mt-8 space-y-6 leading-7 text-ink-muted"><p>Pinly uses account information to provide sign-in and your saved ideas.</p><section><h2 className="text-lg font-semibold text-ink">Information we use</h2><p className="mt-2">Profile details and the content you choose to save are used to operate the service.</p></section><section><h2 className="text-lg font-semibold text-ink">Your choices</h2><p className="mt-2">You can manage your account from Settings and sign out at any time.</p></section></div></main></AppShell>; }
