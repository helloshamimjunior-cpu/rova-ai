export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <a href="/" className="font-semibold">Rova AI Academy</a>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="/courses">Courses</a>
          <a href="/pricing">Pricing</a>
          <a href="/community">Community</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="/login" className="text-sm">Login</a>
          <a href="/signup" className="text-sm">Signup</a>
          <a href="/enroll" className="rounded-md px-3 py-1.5 text-sm font-medium text-white" style={{background:"#2D6EEA"}}>
            এখনই ভর্তি হন
          </a>
        </div>
      </div>
    </header>
  );
}
