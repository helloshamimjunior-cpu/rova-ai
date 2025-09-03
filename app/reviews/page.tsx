// app/reviews/page.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSearchParams, useRouter } from "next/navigation"

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

export default function ReviewsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = parseInt(searchParams.get("page") || "1", 10)

  const totalPages = Math.ceil(reviews.length / PER_PAGE)
  const start = (page - 1) * PER_PAGE
  const paginated = reviews.slice(start, start + PER_PAGE)

  const goToPage = (p: number) => {
    router.push(`/reviews?page=${p}`)
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">শিক্ষার্থীদের রিভিউ</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {paginated.map((r) => (
          <Card key={r.id} className="rounded-2xl shadow-sm hover:shadow-md transition">
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">“{r.text}”</p>
              <p className="font-semibold">{r.name}</p>
              <p className="text-sm text-gray-500">{r.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => goToPage(page - 1)}
        >
          ← আগের
        </Button>
        <span className="text-gray-600">
          পৃষ্ঠা {page} এর {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => goToPage(page + 1)}
        >
          পরের →
        </Button>
      </div>
    </section>
  )
}
