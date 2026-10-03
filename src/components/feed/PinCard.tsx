"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MoreHorizontal, Upload } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { cn, placeholderColor } from "@/lib/utils";
import type { PinWithAuthor } from "@/types/database";

export interface PinCardProps {
  pin: PinWithAuthor;
  /** Sets next/image priority for the first screenful. */
  eager?: boolean;
  onSave?: (pin: PinWithAuthor) => void;
}

export function PinCard({ pin, eager = false, onSave }: PinCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");

  // Reserving the exact intrinsic ratio is what stops the grid reflowing as
  // images arrive — the single biggest source of jank in a masonry feed.
  const aspectRatio = `${pin.width} / ${pin.height}`;

  async function sharePin() {
    const url = new URL(`/pin/${pin.id}`, window.location.origin).toString();

    try {
      if (navigator.share) {
        await navigator.share({ title: pin.title ?? "Pinly pin", url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 2000);
    } catch {
      // Dismissing the native share sheet is expected and should not surface
      // as a console error. The pin remains available through its detail link.
    }
  }

  return (
    <div className="group w-full">
      <div className="relative">
        <Link
          href={`/pin/${pin.id}`}
          aria-label={pin.title ?? "View pin"}
          className={cn(
            "relative block w-full overflow-hidden rounded-card",
            "transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-soft)]",
            "group-hover:scale-[1.02] group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)]",
          )}
          style={{ aspectRatio, background: placeholderColor(pin.id) }}
        >
          <Image
            src={pin.image_url}
            alt={pin.title ?? ""}
            width={pin.width}
            height={pin.height}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 236px"
            priority={eager}
            loading={eager ? undefined : "lazy"}
            onLoad={() => setLoaded(true)}
            className={cn(
              "size-full object-cover transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0",
            )}
          />

          {/* Hover scrim. pointer-events-none so it never eats the click. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
        </Link>

        {/* Overlay controls sit outside the <a> so they are not nested links. */}
        <div className="pointer-events-none absolute inset-0 opacity-100 sm:opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => {
              onSave?.(pin);
              setSaved(true);
            }}
            aria-pressed={saved}
            className={cn(
              "pointer-events-auto absolute right-2 top-2 h-9 sm:h-10 rounded-pill bg-accent px-3 sm:px-4",
              "text-[13px] sm:text-[15px] font-semibold text-white shadow-sm",
              "transition-colors duration-200 hover:bg-accent-hover active:scale-95",
            )}
          >
            {saved ? "Saved" : "Save"}
          </button>

          <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Share pin"
              title={shareStatus === "copied" ? "Link copied" : "Share"}
              onClick={() => void sharePin()}
              className="pointer-events-auto inline-flex size-8 sm:size-8 items-center justify-center rounded-full bg-white/95 text-[#111] shadow-[0_1px_6px_rgba(0,0,0,0.25)] transition-colors duration-200 hover:bg-white"
            >
              <Upload className="size-4" />
            </button>
            <Link
              href={`/pin/${pin.id}`}
              aria-label="More options"
              title="View pin details"
              className="pointer-events-auto inline-flex size-8 sm:size-8 items-center justify-center rounded-full bg-white/95 text-[#111] shadow-[0_1px_6px_rgba(0,0,0,0.25)] transition-colors duration-200 hover:bg-white"
            >
              <MoreHorizontal className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Title and author live below the image, outside the card. */}
      {(pin.title || pin.author) && (
        <div className="flex flex-col gap-1 px-1.5 sm:px-2 pt-1.5 sm:pt-2">
          {pin.title && (
            <Link
              href={`/pin/${pin.id}`}
              className="line-clamp-2 rounded text-xs sm:text-sm font-semibold leading-snug text-ink hover:underline"
            >
              {pin.title}
            </Link>
          )}

          {pin.author && (
            <Link
              href={`/${pin.author.username}`}
              className="flex w-fit items-center gap-1.5 rounded-full text-[11px] sm:text-xs text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              <Avatar
                src={pin.author.avatar_url}
                name={pin.author.full_name}
                username={pin.author.username}
                size="xs"
              />
              <span className="truncate">
                {pin.author.full_name || pin.author.username}
              </span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
