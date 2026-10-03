import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";

export default function NotFound() { return <main className="flex min-h-screen items-center justify-center bg-bg px-6 text-center"><div><LogoMark size={48} /><p className="mt-7 text-sm font-semibold text-ink-muted">404</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">This page isn&apos;t here.</h1><p className="mt-3 text-ink-muted">The link may have moved, or the idea no longer exists.</p><Link href="/" className="mt-7 inline-flex rounded-pill bg-accent px-5 py-3 font-semibold text-white hover:bg-accent-hover">Go to home</Link></div></main>; }
