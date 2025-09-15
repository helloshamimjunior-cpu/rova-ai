// app/courses/page.tsx
import Link from "next/link";
import Image from "next/image";
import { searchCourses } from "../../lib/courses";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Params = { level?: string; q?: string };
const LEVELS = ["All", "Basic", "Intermediate", "Advanced", "Micro"] as const;

// ⭐ রেটিং আইকন
function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1" aria-label={`রেটিং ${value.toFixed(1)} স্টার`}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < full;
        const isHalf = !filled && i === full && half;
        return (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className={filled ? "fill-yellow-500" : isHalf ? "fill-yellow-300" : "fill-gray-300"}
            aria-hidden
          >
            <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      })}
    </div>
  );
}

// ✅ EXTRA টাইপ: tag অপশনাল
type Extra = {
  tag?: "নতুন" | "জনপ্রিয়";
  rating: number;
  students: string;
  duration: string;
  lessons: number;
  skills: string[];
};

// ✅ EXTRA অবজেক্টে স্পষ্ট টাইপ বসানো হলো
const EXTRA: Record<"basic" | "intermediate" | "advanced" | "micro", Extra> = {
  basic: {
    tag: "জনপ্রিয়",
    rating: 4.8,
    students: "1.6k+",
    duration: "5h 10m",
    lessons: 16,
    skills: ["প্রম্পটিং", "AI টুলস", "ডকস/শিটস"],
  },
  intermediate: {
    tag: "নতুন",
    rating: 4.7,
    students: "980+",
    duration: "6h 45m",
    lessons: 22,
    skills: ["Zapier", "Make", "API বেসিক"],
  },
  advanced: {
    rating: 4.9,
    students: "720+",
    duration: "8h 30m",
    lessons: 26,
    skills: ["RAG", "ভেক্টর সার্চ", "ইভ্যালুয়েশন"],
  },
  micro: {
    rating: 4.6,
    students: "2.1k+",
    duration: "3h 00m",
    lessons: 28,
    skills: ["কুইক টিপস", "ডেটা ক্লিনআপ"],
  },
};

export default async function CoursesPage({
  searchParams,
}: {
  // Next 15: Promise হিসেবে আসে
  searchParams: Promise<Params>;
}) {
  const sp = await searchParams;
  const level = (sp?.level ?? "All") as (typeof LEVELS)[number];
  const q = sp?.q ?? "";

  const data = searchCourses(level, q);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Hero */}
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-r from-indigo-50 to-cyan-50 p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">আমাদের কোর্সসমূহ</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          লেভেল বেছে নিন, সার্চ করুন, আর দ্রুত শেখা শুরু করুন। প্রতিটি কার্ডে থাম্বনেইল, রেটিং, ছাত্রসংখ্যা, ডিউরেশন, লেসন ও স্কিল দেখানো আছে।
        </p>

        {/* Search + Tabs */}
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
          <form className="flex-1" action="/courses">
            <input
              defaultValue={q}
              name="q"
              placeholder="সার্চ করুন…"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
            <input type="hidden" name="level" value={level} />
          </form>

          <div className="flex flex-wrap gap-2">
            {LEVELS.map((l) => (
              <a
                key={l}
                href={`/courses?level=${l}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                className={
                  "rounded-xl px-4 py-2 text-sm font-medium transition " +
                  (level === l
                    ? "bg-indigo-500 text-white shadow"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50")
                }
              >
                {l === "All" ? "সব" : l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6 text-sm text-gray-700">
        মোট {data.length} টি কোর্স পাওয়া গেছে {q ? <>— “{q}”</> : null}
        {level !== "All" ? <> — লেভেল: {level}</> : null}
      </div>

      {/* Grid */}
      {data.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-600">
          কিছু পাওয়া যায়নি—সার্চ বা ট্যাব বদলে দেখুন।
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((c) => {
            const x = EXTRA[c.slug as keyof typeof EXTRA];

            return (
              <div
                key={c.slug}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                {/* Thumbnail */}
                <figure className="relative -mx-6 -mt-6 mb-4 aspect-[16/9] overflow-hidden">
                  <Image
                    src={`/courses/${c.slug}.jpg`}
                    alt={`${c.title} থাম্বনেইল`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-90" />
                  {x?.tag ? (
                    <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200 backdrop-blur">
                      {x.tag}
                    </span>
                  ) : null}
                </figure>

                {/* Meta */}
                <div className="relative z-10 mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200">
                    {c.level}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-gray-900">{c.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{c.short}</p>
                  <p className="mt-1 text-xs text-gray-500">{c.tagline}</p>
                </div>

                {/* Stats */}
                <div className="relative z-10 mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-700">
                  <span className="inline-flex items-center gap-1">
                    <Stars value={x.rating} />
                    <span className="ml-1 text-xs text-gray-600">{x.rating.toFixed(1)}</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" className="fill-gray-400" aria-hidden>
                      <path d="M12 12c2.76 0 5-2.69 5-6s-2.24-5-5-5-5 2.24-5 5 2.24 6 5 6zm0 2c-4.33 0-8 2.17-8 5v3h16v-3c0-2.83-3.67-5-8-5z" />
                    </svg>
                    {x.students}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" className="stroke-gray-500" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {x.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" className="stroke-gray-500" fill="none" aria-hidden>
                      <rect x="4" y="4" width="16" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M4 14h16" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M4 18h10" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    {x.lessons} লেসন
                  </span>
                </div>

                {/* Skills */}
                {x.skills.length ? (
                  <div className="relative z-10 mt-3 flex flex-wrap gap-2">
                    {x.skills.slice(0, 4).map((s) => (
                      <span key={s} className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700">
                        #{s}
                      </span>
                    ))}
                  </div>
                ) : null}

                {/* Actions */}
                <div className="relative z-10 mt-6 flex gap-2">
                  <Link
                    href={`/courses/${c.slug}`}
                    className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-center text-sm text-gray-700 hover:bg-gray-50"
                  >
                    বিস্তারিত
                  </Link>
                  <Link
                    href={`/enroll?product=${c.slug}`}
                    className="flex-1 rounded-xl bg-indigo-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-indigo-600"
                  >
                    এনরোল করুন
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
