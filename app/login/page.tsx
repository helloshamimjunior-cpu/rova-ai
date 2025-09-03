// app/login/page.tsx
import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold mb-4">Login — Coming soon</h1>
      <p className="text-gray-600 mb-6">
        এখানে পরে Login form (ইমেইল + পাসওয়ার্ড) আসবে।
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/signup" className="px-4 py-2 rounded-md border">
          Signup
        </Link>
        <Link
          href="/"
          className="px-4 py-2 rounded-md text-white"
          style={{ background: "var(--brand-primary)" }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
