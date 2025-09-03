// app/reviews/page.tsx
import Link from "next/link"

const reviews = [
  { id: 1, name: "রাহিম উদ্দিন", role: "স্টুডেন্ট (Basic)", text: "কোর্সের কনটেন্ট পরিষ্কার, সহজে বোঝা যায়।" },
  { id: 2, name: "সাবিনা আক্তার", role: "স্টুডেন্ট (Intermediate)", text: "লাইভ সেশনগুলো সবচেয়ে হেল্পফুল লেগেছে।" },
  { id: 3, name: "তানভীর হোসেন", role: "স্টুডেন্ট (Advanced)", text: "প্রজেক্ট-বেইজড টাস্ক খুব কাজে লেগেছে।" },
  { id: 4, name: "নুসরাত জাহান", role: "স্টুডেন্ট (Basic)", text: "ইনস্ট্রাক্টর সবসময় প্রশ্নের উত্তর দিয়েছেন।" },
  { id: 5, name: "মাহিন খান", role: "স্টুডেন্ট (Intermediate)", text: "ভিডিওগুলো ছোট ছোট ভাগে ভাগ করা ছিল, তাই সহজে ফলো করা গেছে।" },
  { id: 6, name: "সাদিয়া আক্তার", role: "স্টুডেন্ট (Advanced)", text: "রিয়েল-লাইফ প্রজেক্ট করার অভিজ্ঞতা সবচেয়ে বড় পাওয়া।" },
  { id: 7, name: "ইমরান হোসেন", role: "স্টুডেন্ট (Basic)", text: "কোর্স শেষে আত্মবিশ্বাস বেড়ে গেছে।" },
  { id: 8, name: "মেহজাবিন আহমেদ", role: "স্টুডেন্ট (Intermediate)", text: "কমিউনিটি সাপোর্ট খুবই অ্যাক্টিভ।" },
  { id: 9, name: "শাহরিয়ার ইসলাম", role: "স্টুডেন্ট (Advanced)", text: "টপিকগুলো গভীরে কভার করা হয়েছে।" },
  { id: 10, name: "ফারজানা পারভিন", role: "স্টুডেন্ট (Basic)", text: "প্র্যাকটিস কুইজ গুলো অনেক কাজে লেগেছে।" },
]

const PER_PAGE = 6

export default function ReviewsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1)
  const totalPages = Math.ceil(reviews.length / PER_PAGE)
  const start = (page - 1) * PER_PAGE
  const paginated = reviews.slice(start, start + PER_PAGE)

  const prevHref = `?page=${Math.max(1, page - 1)}`
  const nextHref = `?page=${Math.min(totalPages, page + 1)}`

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">শিক্ষার্থীদের রিভিউ</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {paginated.map((r) => (
          <div key={r.id} className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
            <div className="p-6">
              <p className="text-gray-700 mb-4">“{r.text}”</p>
              <p className="font-semibold">{r.name}</p>
              <p className="text-sm text-gray-500">{r.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* pagination (লিঙ্ক-ভিত্তিক, কোন ক্লায়েন্ট হুক নেই) */}
      <div className="flex justify-center items-center gap-4 mt-10">
        {page > 1 ? (
          <Link href={prevHref} className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50">
            ← আগের
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium border border-gray-200 text-gray-400 cursor-not-allowed">
            ← আগের
          </span>
        )}

        <span className="text-gray-600">পৃষ্ঠা {page} এর {totalPages}</span>

        {page < totalPages ? (
          <Link href={nextHref} className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50">
            পরের →
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium border border-gray-200 text-gray-400 cursor-not-allowed">
            পরের →
          </span>
        )}
      </div>
    </section>
  )
}
