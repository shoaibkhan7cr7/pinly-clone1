import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline px-4 py-8 text-sm text-ink-muted">
      <nav aria-label="Footer" className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <Link href="/" className="hover:text-ink">Home</Link>
        <Link href="/search" className="hover:text-ink">Search</Link>
        <Link href="/create" className="hover:text-ink">Create</Link>
        <Link href="/terms" className="hover:text-ink">Terms</Link>
        <Link href="/privacy" className="hover:text-ink">Privacy</Link>
      </nav>
    </footer>
  );
}
