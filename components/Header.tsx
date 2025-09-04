"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

// Minimal, clean, fully responsive header for Rova AI Academy
// - Sticky, translucent, subtle border + blur
// - Simple mobile drawer (no external UI libs)
// - BN/EN toggle (naïve: switches between /bn and /en or ?lang=bn|en)
// - Accessible focus states, reduced motion friendly

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/reviews", label: "Reviews" },
  { href: "/community", label: "Community" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!open) return;
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  // Lock scroll when menu is open
  useEffect(() => {
    const original = document.documentElement.style.overflow;
    if (open) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = original || "";
    return () => {
      document.documentElement.style.overflow = original || "";
    };
  }, [open]);

  const isActive = (href: string) => (pathname || "").startsWith(href);

  function toggleLocale() {
    // Heuristic: if path starts with /en, switch to /bn, else to /en.
    // Adjust if your i18n routes differ. Falls back to ?lang=.
    const p = pathname || "/";
    if (p.startsWith("/en")) {
      router.push(p.replace("/en", "/bn"));
      return;
    }
    if (p.startsWith("/bn")) {
      router.push(p.replace("/bn", "/en"));
      return;
    }
    const url = new URL(window.location.href);
    const next = url.searchParams.get("lang") === "bn" ? "en" : "bn";
    url.searchParams.set("lang", next);
    router.push(url.pathname + "?" + url.searchParams.toString());
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-4 md:px-6">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-xl">
          <Image
            src="/logo.svg"
            alt="Rova AI Academy"
            width={28}
            height={28}
            priority
          />
          <span className="sr-only">Rova AI Academy</span>
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "rounded-xl px-3 py-2 text-sm transition-colors",
                isActive(link.href)
                  ? "text-neutral-900 bg-neutral-100"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLocale}
            className="hidden sm:inline-flex rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            aria-label="Toggle language BN/EN"
          >
            BN/EN
          </button>
          <Link
            href="/enroll"
            className="hidden md:inline-flex rounded-xl border border-neutral-900 px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-900 hover:text-white active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            Enroll
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Sheet */}
      <div
        className={`fixed inset-0 z-[60] transition-[background-color,transform] ${
          open ? "pointer-events-auto bg-black/20" : "pointer-events-none bg-transparent"
        } md:hidden`}
        aria-hidden={!open}
      >
        <div
          ref={sheetRef}
          className={`absolute right-0 top-0 h-full w-[88%] max-w-xs bg-white shadow-xl border-l border-neutral-200 transition-transform duration-200 will-change-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex h-16 items-center justify-between px-3 border-b border-neutral-200/60">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Rova" width={24} height={24} />
              <span className="text-sm font-semibold tracking-tight">Rova</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="px-2 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "block rounded-xl px-3 py-2 text-[15px]",
                  isActive(link.href)
                    ? "text-neutral-900 bg-neutral-100"
                    : "text-neutral-700 hover:bg-neutral-50",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t border-neutral-200/60 p-3 flex items-center gap-2">
            <button
              onClick={toggleLocale}
              className="inline-flex flex-1 justify-center rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            >
              BN/EN
            </button>
            <Link
              href={{ pathname: "/enroll", query: { product: "basic" } }}
              className="inline-flex flex-1 justify-center rounded-xl border border-neutral-900 px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            >
              Enroll
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

/*
Usage:
1) Save as app/components/Header.tsx and import in app/layout.tsx inside <body>.

2) Tailwind utilities assumed. If using a container class, ensure body has bg-white.

3) Replace /logo.svg with your actual logo. Keep empty brand text per rule; header shows logo only.

4) i18n: adjust toggleLocale() to your routing (next-intl/next-i18next). This is a minimal, route-based toggle.

5) Accessibility: focus-visible rings added, mobile sheet traps scroll and closes on outside click.
*/
