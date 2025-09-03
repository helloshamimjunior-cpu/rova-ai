import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 border-t">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-3">
        
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2 font-semibold mb-3">
            <Image src="/logo.png" alt="Rova AI" width={32} height={32} />
            <span className="text-lg font-bold">Rova AI Academy</span>
          </Link>
          <p className="text-sm text-gray-600">
            হাতে-কলমে AI Automation শেখার প্ল্যাটফর্ম। ক্যারিয়ার এগিয়ে নিতে
            যোগ দিন।
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link href="/about">About</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/community">Community</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/refund">Refund</Link>
        </div>

        {/* Newsletter + Social */}
        <div>
          <form className="flex gap-2 mb-4">
            <input
              placeholder="Email"
              className="flex-1 rounded-md border px-3 py-2 text-sm"
            />
            <button
              className="rounded-md px-3 py-2 text-white text-sm font-medium"
              style={{ background: "var(--brand-primary)" }}
            >
              Subscribe
            </button>
          </form>

          <div className="flex gap-4 text-gray-600">
            <a href="#"><Facebook className="h-5 w-5 hover:text-blue-600" /></a>
            <a href="#"><Twitter className="h-5 w-5 hover:text-sky-500" /></a>
            <a href="#"><Linkedin className="h-5 w-5 hover:text-blue-700" /></a>
            <a href="#"><Youtube className="h-5 w-5 hover:text-red-600" /></a>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white py-4 text-center text-xs">
        © {new Date().getFullYear()} Rova AI Academy. All rights reserved.
      </div>
    </footer>
  );
}
