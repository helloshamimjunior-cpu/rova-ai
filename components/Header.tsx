"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

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

  useEffect(() => setOpen(false), [pathname]);

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
    <header className="z-50 border-b border-neutral-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-4 md:px-6">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-xl">
          <Image
            src="/logo.png"
            alt="Rova AI Academy"
            width={120}
            height={40}
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
                "rounded-xl px-3 py-2 text-sm border border-neutral-200 transition-colors",
                isActive(link.href)
                  ? "text-neutral-900 bg-neutral-100"
                  : "text-neutral-600 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className="hidden sm:inline-flex rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 transition-colors"
            aria-label="Toggle language BN/EN"
          >
            BN/EN
          </button>
          <Link
            href="/login"
            className="rounded-xl border border-blue-500 px-3 py-2 text-sm text-blue-600 hover:bg-blue-500 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-xl border border-blue-500 px-3 py-2 text-sm text-blue-600 hover:bg-blue-500 hover:text-white transition-colors"
          >
            Signup
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
              <Image src="/logo.png" alt="Rova" width={100} height={32} />
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
                  "block rounded-xl px-3 py-2 text-[15px] border border-neutral-200 transition-colors",
                  isActive(link.href)
                    ? "text-neutral-900 bg-neutral-100"
                    : "text-neutral-700 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t border-neutral-200/60 p-3 flex flex-col gap-2">
            <button
              onClick={toggleLocale}
              className="inline-flex justify-center rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            >
              BN/EN
            </button>
            <Link
              href="/login"
              className="rounded-xl border border-blue-500 px-3 py-2 text-sm text-blue-600 hover:bg-blue-500 hover:text-white text-center transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-xl border border-blue-500 px-3 py-2 text-sm text-blue-600 hover:bg-blue-500 hover:text-white text-center transition-colors"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
