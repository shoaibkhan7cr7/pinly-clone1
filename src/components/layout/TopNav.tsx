"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  MessageCircle,
  Menu,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { buttonClasses } from "@/components/ui/Button";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownLink,
} from "@/components/ui/Dropdown";
import { SearchBar } from "./SearchBar";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types/database";

export interface TopNavProps {
  /** null when signed out. */
  profile: Pick<Profile, "id" | "username" | "full_name" | "avatar_url"> | null;
  onSignOut?: () => void;
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "hidden h-12 shrink-0 items-center rounded-pill px-4 text-base font-semibold",
        "transition-colors duration-200 md:inline-flex",
        active
          ? "bg-ink text-bg"
          : "text-ink hover:bg-secondary",
      )}
    >
      {children}
    </Link>
  );
}

export function TopNav({ profile, onSignOut }: TopNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-16 sm:h-20 w-full bg-bg">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 sm:h-20 w-full items-center gap-2 px-2 sm:px-4"
      >
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/create">Create</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="md:hidden inline-flex size-10 shrink-0 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-secondary"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        {/* Below sm there is no room for logo + field + two auth pills, so the
            field collapses to an icon that opens the dedicated search page. */}
        <Link
          href="/search"
          aria-label="Search"
          className="hidden sm:inline-flex md:hidden size-10 shrink-0 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-secondary"
        >
          <Search className="size-6" />
        </Link>

        <div className="hidden md:flex min-w-0 flex-1">
          <Suspense fallback={<div className="h-12 w-full rounded-pill bg-field" />}>
            <SearchBar className="mx-2" />
          </Suspense>
        </div>

        <span className="flex-1 md:hidden" aria-hidden="true" />

        {/* Desktop Auth/Profile */}
        <div className="hidden md:flex shrink-0 items-center gap-1">
          {profile ? (
            <>
              <Link
                href="/notifications"
                aria-label="Notifications"
                title="Notifications"
                className="hidden size-10 items-center justify-center rounded-full text-ink-muted transition-colors duration-200 hover:bg-secondary hover:text-ink lg:inline-flex"
              >
                <Bell className="size-6" />
              </Link>

              <Link
                href="/messages"
                aria-label="Messages"
                title="Messages"
                className="hidden size-10 items-center justify-center rounded-full text-ink-muted transition-colors duration-200 hover:bg-secondary hover:text-ink lg:inline-flex"
              >
                <MessageCircle className="size-6" />
              </Link>

              <Dropdown
                label="Account menu"
                trigger={(triggerProps) => (
                  <button
                    type="button"
                    {...triggerProps}
                    aria-label="Account menu"
                    className="flex items-center gap-0.5 rounded-full p-1 transition-colors duration-200 hover:bg-secondary"
                  >
                    <Avatar
                      src={profile.avatar_url}
                      name={profile.full_name}
                      username={profile.username}
                      size="sm"
                    />
                    <ChevronDown className="size-4 text-ink-muted" aria-hidden="true" />
                  </button>
                )}
              >
                {(close) => (
                  <>
                    <DropdownLabel>Currently in</DropdownLabel>

                    <Link
                      href={`/${profile.username}`}
                      onClick={close}
                      role="menuitem"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-secondary"
                    >
                      <Avatar
                        src={profile.avatar_url}
                        name={profile.full_name}
                        username={profile.username}
                        size="md"
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-ink">
                          {profile.full_name || profile.username}
                        </span>
                        <span className="block truncate text-xs text-ink-muted">
                          @{profile.username}
                        </span>
                      </span>
                    </Link>

                    <DropdownDivider />

                    <DropdownLink href={`/${profile.username}`} onClick={close}>
                      <User className="size-4" aria-hidden="true" />
                      Profile
                    </DropdownLink>

                    <DropdownLink href="/settings" onClick={close}>
                      <Settings className="size-4" aria-hidden="true" />
                      Settings
                    </DropdownLink>

                    <DropdownDivider />

                    <DropdownItem
                      destructive
                      onClick={() => {
                        close();
                        onSignOut?.();
                      }}
                    >
                      <LogOut className="size-4" aria-hidden="true" />
                      Log out
                    </DropdownItem>
                  </>
                )}
              </Dropdown>
            </>
          ) : (
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/login"
                className={buttonClasses({
                  variant: "primary",
                  className: "px-3 text-sm sm:px-4 sm:text-[15px]",
                })}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className={buttonClasses({
                  variant: "secondary",
                  className: "px-3 text-sm sm:px-4 sm:text-[15px]",
                })}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 sm:top-20 left-0 right-0 bg-bg border-b border-hairline md:hidden">
            <div className="flex flex-col p-4 gap-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-secondary transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/create"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-secondary transition-colors duration-200"
              >
                Create
              </Link>
              <Link
                href="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-secondary transition-colors duration-200"
              >
                <Search className="size-5" />
                Search
              </Link>

              {profile ? (
                <>
                  <div className="h-px bg-hairline my-2" />
                  <Link
                    href={`/${profile.username}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-secondary transition-colors duration-200"
                  >
                    <User className="size-5" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-secondary transition-colors duration-200"
                  >
                    <Settings className="size-5" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSignOut?.();
                    }}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-accent hover:bg-accent/10 transition-colors duration-200"
                  >
                    <LogOut className="size-5" />
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <div className="h-px bg-hairline my-2" />
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={buttonClasses({
                      variant: "primary",
                      className: "w-full",
                    })}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className={buttonClasses({
                      variant: "secondary",
                      className: "w-full",
                    })}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
