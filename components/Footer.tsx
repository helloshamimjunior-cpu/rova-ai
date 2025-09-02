export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="font-semibold mb-2">Rova AI Academy</div>
          <p className="text-sm text-neutral-600">সাপ্তাহিক AI টিপস ও জব হাইলাইটস</p>
        </div>
        <div className="text-sm grid grid-cols-2 gap-2">
          <a href="/about">About</a><a href="/courses">Courses</a>
          <a href="/pricing">Pricing</a><a href="/community">Community</a>
          <a href="/blog">Blog</a><a href="/faq">FAQ</a>
          <a href="/contact">Contact</a><a href="/legal/privacy">Privacy</a>
          <a href="/legal/terms">Terms</a><a href="/legal/refund">Refund Policy</a>
        </div>
        <form className="flex gap-2">
          <input placeholder="Email" className="flex-1 rounded-md border px-3 py-2"/>
          <button className="rounded-md px-3 py-2 text-white" style={{background:"#F9A826"}}>Subscribe</button>
        </form>
      </div>
    </footer>
  );
}
