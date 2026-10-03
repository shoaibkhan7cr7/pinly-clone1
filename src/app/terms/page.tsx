import type { Metadata } from "next";
import { AppShell } from "@/components/providers/AppShell";
import { getSessionProfile } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Terms of Service" };

export default async function TermsPage() { const profile = await getSessionProfile(); return <AppShell profile={profile}><main className="mx-auto min-h-[60vh] max-w-3xl px-6 py-12"><h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1><div className="mt-8 space-y-6 leading-7 text-ink-muted"><p>Pinly is a visual discovery space for saving and organising ideas.</p><section><h2 className="text-lg font-semibold text-ink">Use of Pinly</h2><p className="mt-2">Use the service responsibly and only share content that you have the right to share.</p></section><section><h2 className="text-lg font-semibold text-ink">Your content</h2><p className="mt-2">You remain responsible for content you add and the links you save.</p></section></div></main></AppShell>; }
