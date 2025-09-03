// app/reviews/page.tsx
import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold mb-4">Reviews — Coming soon</h1>
      <p className="text-gray-600 mb-6">
        এখানে পরে শিক্ষার্থীদের রিভিউ ও টেস্টিমোনিয়াল আসবে।
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/courses" className="px-4 py-2 rounded-md border">
          Courses
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
