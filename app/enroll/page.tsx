// app/enroll/page.tsx
import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold mb-4">Enroll — Coming soon</h1>
      <p className="text-gray-600 mb-6">
        এই পেজে পরে full enrollment flow (courses + subscriptions + payment) আসবে।
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/pricing" className="px-4 py-2 rounded-md border">
          Pricing
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
