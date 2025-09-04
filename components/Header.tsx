// components/Header.tsx
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
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // রুট বদলালে মেনু বন্ধ
  useEffect(() => setOpen(false), [pathname]);

  // বাইরে ক্লিক করলে মেনু বন্ধ
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  // ESC + body scroll-lock (শুধু মোবাইলে ড্রপডাউন খোলা থাকলে)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (pathname || "").startsWith(href);

  function toggleLocale() {
    const p = pathname || "/";
    if (p.startsWith("/en")) return router.push(p.replace("/en", "/bn"));
    if (p.startsWith("/bn")) return router.push(p.replace("/bn", "/en"));
    const url = new URL(window.location.href);
    const next = url.searchParams.get("lang") === "bn" ? "en" : "bn";
    url.searchParams.set("lang", next);
    router.push(url.pathname + "?" + url.searchParams.toString());
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400">
          <Image src="/logo.png" alt="Rova AI Academy" width={120} height={40} priority />
          <span className="sr-only">Rova AI Academy</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "rounded-xl px-3 py-2 text-sm border border-neutral-200 bg-white transition-colors",
                isActive(link.href)
                  ? "text-neutral-900 bg-neutral-100"
                  : "text-neutral-700 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLocale}
            className="hidden sm:inline-flex rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 transition-colors"
            aria-label="Toggle language BN/EN"
          >
            BN/EN
          </button>

          {/* Login / Signup — same blue */}
          <Link href="/login"  className="rounded-xl border border-blue-500 px-3 py-2 text-sm text-blue-600 hover:bg-blue-500 hover:text-white transition-colors">Login</Link>
          <Link href="/signup" className="rounded-xl border border-blue-500 px-3 py-2 text-sm text-blue-600 hover:bg-blue-500 hover:text-white transition-colors">Signup</Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            aria-label="Open menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown (header-এর নিচে, no page scroll) */}
      <div
        className={[
          "fixed inset-x-0 top-16 bottom-0 z-40 md:hidden overscroll-none",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        {/* overlay (header ঢাকে না) */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className={["absolute inset-0 transition-colors", open ? "bg-black/30" : "bg-transparent"].join(" ")}
        />

        {/* panel — header-এর নিচে */}
        <div
          ref={panelRef}
          className={[
            "absolute left-1/2 -translate-x-1/2 top-4 w-[92%] max-w-sm rounded-2xl border border-neutral-200 bg-white shadow-2xl",
            "transition-all duration-200",
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
        >
          {/* Nav links (no scroll) */}
          <nav className="p-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={[
                  "block rounded-xl px-4 py-2.5 text-[15px] border border-neutral-200 bg-white transition-colors",
                  isActive(link.href)
                    ? "text-neutral-900 bg-neutral-100"
                    : "text-neutral-700 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions নিচে */}
          <div className="border-t border-neutral-200/60 p-3 flex flex-col gap-2">
            <button
              onClick={toggleLocale}
              className="inline-flex justify-center rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            >
              BN/EN
            </button>
            <Link href="/login"  onClick={() => setOpen(false)} className="rounded-xl border border-blue-500 px-3 py-2 text-sm text-blue-600 hover:bg-blue-500 hover:text-white text-center transition-colors">Login</Link>
            <Link href="/signup" onClick={() => setOpen(false)} className="rounded-xl border border-blue-500 px-3 py-2 text-sm text-blue-600 hover:bg-blue-500 hover:text-white text-center transition-colors">Signup</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
