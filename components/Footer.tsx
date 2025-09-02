import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="font-semibold mb-2">Rova AI Academy</div>
          <p className="text-sm text-neutral-600">সাপ্তাহিক AI টিপস ও জব হাইলাইটস</p>
        </div>

        <div className="text-sm grid grid-cols-2 gap-2">
          <Link href="/about">About</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/community">Community</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/refund">Refund Policy</Link>
        </div>

        <form className="flex gap-2">
          <input placeholder="Email" className="flex-1 rounded-md border px-3 py-2" />
          <button className="rounded-md px-3 py-2 text-white" style={{ background: "#F9A826" }}>
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
}
