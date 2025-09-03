import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
import LangToggle from "./LangToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/logo.svg" alt="Rova AI" width={28} height={28} />
          <span>Rova AI Academy</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/courses">Courses</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/community">Community</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Suspense fallback={null}>
            <LangToggle />
          </Suspense>

          <Link href="/login" className="text-sm">Login</Link>
          <Link href="/signup" className="text-sm">Signup</Link>
          <Link
            href="/enroll"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-white"
            style={{ background: "var(--brand-primary)" }}
          >
            এখনই ভর্তি হন
          </Link>
        </div>
      </div>
    </header>
  );
}
