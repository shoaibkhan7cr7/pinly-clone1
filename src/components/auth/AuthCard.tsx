import Link from "next/link";
import { LogoMark, APP_NAME } from "@/components/brand/Logo";
import { GoogleButton } from "./GoogleButton";
import { googleOAuthEnabled } from "@/lib/env";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
  next,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  next?: string;
}) {
  return (
    <div className="w-full max-w-[420px] rounded-sheet bg-surface px-6 py-8 sm:px-8 sm:py-10 shadow-[0_4px_32px_rgba(0,0,0,0.24)]">
      <div className="flex flex-col items-center gap-4 text-center">
        <LogoMark size={40} />
        <div className="flex flex-col gap-1">
          <h1 className="text-[24px] sm:text-[28px] font-semibold leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && <p className="text-sm text-ink-muted">{subtitle}</p>}
        </div>
      </div>

      <div className="mt-6 sm:mt-7">{children}</div>

      {googleOAuthEnabled && (
        <>
          <div className="my-4 sm:my-5 flex items-center gap-3" role="separator">
            <span className="h-px flex-1 bg-hairline" />
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              or
            </span>
            <span className="h-px flex-1 bg-hairline" />
          </div>

          <GoogleButton next={next} />
        </>
      )}

      <p className="mt-5 sm:mt-6 text-center text-sm text-ink-muted">{footer}</p>

      <p className="mt-3 sm:mt-4 text-center text-[11px] leading-relaxed text-ink-muted">
        By continuing you agree to {APP_NAME}&apos;s{" "}
        <Link href="/terms" className="font-semibold text-ink hover:underline">
          Terms of Service
        </Link>{" "}
        and acknowledge the{" "}
        <Link href="/privacy" className="font-semibold text-ink hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
