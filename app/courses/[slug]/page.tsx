// app/courses/[slug]/page.tsx
import Link from "next/link";

/** ---------- Types + Demo Data (inline) ---------- */
type Lesson = { id: string; title: string; durationMin: number; videoUrl: string; freePreview?: boolean };
type Module = { id: string; title: string; lessons: Lesson[] };
type CourseDetail = {
  slug: "basic" | "intermediate" | "advanced" | "micro";
  titleBn: string;
  summaryBn: string;
  totalHr: number;
  modules: Module[];
};

const COURSES: Record<CourseDetail["slug"], CourseDetail> = {
  basic: {
    slug: "basic",
    titleBn: "বেসিক এআই ফান্ডামেন্টালস",
    summaryBn: "প্রম্পটিং, LLM ধারণা, টুলিং বেসিক—শুরু করার জন্য প্রয়োজনীয় সবকিছু।",
    totalHr: 8,
    modules: [
      {
        id: "m1",
        title: "Foundations",
        lessons: [
          { id: "l1", title: "What is an LLM? + Prompting basics", durationMin: 12, videoUrl: "https://cdn.plyr.io/static/blank.mp4", freePreview: true },
          { id: "l2", title: "Tokens, temperature, system vs user prompts", durationMin: 10, videoUrl: "https://cdn.plyr.io/static/blank.mp4" },
        ],
      },
      {
        id: "m2",
        title: "Tools & mini projects",
        lessons: [
          { id: "l3", title: "Zapier single-step hands-on", durationMin: 14, videoUrl: "https://cdn.plyr.io/static/blank.mp4" },
          { id: "l4", title: "Mini project: content helper", durationMin: 18, videoUrl: "https://cdn.plyr.io/static/blank.mp4" },
        ],
      },
    ],
  },
  intermediate: {
    slug: "intermediate",
    titleBn: "ইন্টারমিডিয়েট প্র‍্যাকটিস",
    summaryBn: "কাজে লাগানোর কৌশল—ওয়ার্কফ্লো, অটোমেশন, ছোট অ্যাপ বানানো।",
    totalHr: 12,
    modules: [
      {
        id: "m1",
        title: "Workflow design",
        lessons: [{ id: "l1", title: "Designing multi-step flows", durationMin: 16, videoUrl: "https://cdn.plyr.io/static/blank.mp4", freePreview: true }],
      },
    ],
  },
  advanced: {
    slug: "advanced",
    titleBn: "অ্যাডভান্সড প্রোজেক্টস",
    summaryBn: "এন্ড-টু-এন্ড প্রোজেক্ট—ইনফ্রা, ডিপ্লয়, স্কেলিং।",
    totalHr: 16,
    modules: [
      {
        id: "m1",
        title: "Retrieval & eval",
        lessons: [{ id: "l1", title: "RAG basics & pitfalls", durationMin: 20, videoUrl: "https://cdn.plyr.io/static/blank.mp4", freePreview: true }],
      },
    ],
  },
  micro: {
    slug: "micro",
    titleBn: "মাইক্রো কোর্স (স্প্রিন্ট)",
    summaryBn: "ফোকাসড ২-৪ ঘন্টার টপিক—দ্রুত স্কিল-আপ।",
    totalHr: 3,
    modules: [
      {
        id: "m1",
        title: "One-topic deep dive",
        lessons: [{ id: "l1", title: "Topic intro", durationMin: 9, videoUrl: "https://cdn.plyr.io/static/blank.mp4", freePreview: true }],
      },
    ],
  },
};

/** ---------- Helpers ---------- */
function flatLessons(course: CourseDetail) {
  const arr: { index: number; title: string; durationMin: number; videoUrl: string; freePreview?: boolean }[] = [];
  course.modules.forEach((m) => m.lessons.forEach((l) => arr.push({ index: arr.length, ...l })));
  return arr;
}

/** ---------- Page (Server Component) ---------- */
export default function CourseDetailPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { lesson?: string };
}) {
  const course = COURSES[params.slug as CourseDetail["slug"]];
  if (!course) {
    return (
      <main className="mx-auto max-w-3xl p-8">
        <h1 className="text-xl font-semibold">কোর্স পাওয়া যায়নি</h1>
        <p className="mt-2 text-sm text-neutral-600">URL টি চেক করে আবার চেষ্টা করুন।</p>
        <Link href="/courses" className="mt-4 inline-block rounded-lg border px-3 py-1 text-sm">
          সকল কোর্স
        </Link>
      </main>
    );
  }

  const flat = flatLessons(course);
  const totalLessons = flat.length;
  const index = Math.min(Math.max(0, Number(searchParams.lesson || 0)), totalLessons - 1);
  const current = flat[index];

  // ভবিষ্যতে: ইউজার এনরোল্ড কিনা DB/সেশন দিয়ে চেক করবে
  const isEnrolled = false;

  // আনলক রুল: এনরোল্ড হলে সব; নাহলে প্রথম freePreview টা
  const firstFree = flat.findIndex((x) => x.freePreview);
  const unlockedIndex = isEnrolled ? totalLessons - 1 : firstFree >= 0 ? firstFree : 0;
  const unlocked = isEnrolled || index <= unlockedIndex;

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-10">
      {/* নরম গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড (হোমের মত) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_10%_10%,rgba(37,99,235,0.12),transparent),radial-gradient(50%_60%_at_90%_20%,rgba(147,51,234,0.10),transparent),linear-gradient(to_bottom,#f8fafc,white)] dark:bg-[radial-gradient(60%_70%_at_10%_10%,rgba(37,99,235,0.10),transparent),radial-gradient(50%_60%_at_90%_20%,rgba(147,51,234,0.10),transparent),linear-gradient(to_bottom,#0a0a0a,#0f0f10)]" />

      {/* Hero */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{course.titleBn}</h1>
        <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">{course.summaryBn}</p>
        <div className="mt-3 flex gap-2 text-xs text-neutral-600 dark:text-neutral-400">
          <span className="rounded-md border px-2 py-1">মডিউল: {course.modules.length}</span>
          <span className="rounded-md border px-2 py-1">লেসন: {totalLessons}</span>
          <span className="rounded-md border px-2 py-1">সময়: ~{course.totalHr} ঘন্টা</span>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Player */}
        <section className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-xl border border-neutral-200/70 bg-black/5 shadow-sm ring-1 ring-neutral-900/5 dark:border-neutral-800/60 dark:ring-white/10">
            <video src={current.videoUrl} controls className="aspect-video w-full rounded-xl bg-black" />
            {!unlocked && (
              <div className="absolute inset-0 grid place-items-center bg-black/60">
                <div className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-center text-white backdrop-blur">
                  <div className="font-semibold">লেসন লকড</div>
                  <div className="mt-1 text-xs opacity-90">প্রথম ভিডিও ফ্রি প্রিভিউ। বাকি দেখতে এনরোল করুন।</div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">
            <div className="font-medium">{current.title}</div>
            {!unlocked && <div className="mt-1 text-xs text-neutral-500">ফ্রি প্রিভিউ লেসন সিলেক্ট করতে ডানদিকের তালিকা থেকে প্রথম লেসনে ক্লিক করুন।</div>}
          </div>

          {!isEnrolled && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Link href={`/enroll?product=${course.slug}`} className="rounded-xl border border-indigo-500/70 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95">
                এখনই এনরোল করুন
              </Link>
              <Link href="/buy-credits" className="rounded-xl border px-3 py-2 text-sm">
                ক্রেডিট কিনুন
              </Link>
            </div>
          )}
        </section>

        {/* Right: Curriculum */}
        <aside>
          <h3 className="mb-2 text-sm font-semibold">কারিকুলাম</h3>
          <div className="divide-y rounded-xl border border-neutral-200/70 bg-white/70 ring-1 ring-neutral-900/5 backdrop-blur-sm dark:divide-neutral-800/60 dark:border-neutral-800/60 dark:bg-neutral-900/50 dark:ring-white/10">
            {course.modules.map((m, mi) => (
              <div key={m.id} className="p-4">
                <div className="mb-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200">{m.title}</div>
                <ul className="space-y-1">
                  {m.lessons.map((l, li) => {
                    const idx = course.modules.slice(0, mi).reduce((a, mm) => a + mm.lessons.length, 0) + li;
                    const locked = idx > unlockedIndex;
                    const isActive = idx === index;
                    const q = new URLSearchParams({ lesson: String(idx) });
                    return (
                      <li key={l.id}>
                        <Link
                          href={`?${q.toString()}`}
                          className={
                            "flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition " +
                            (isActive
                              ? "border-indigo-500/40 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-200"
                              : "border-neutral-200/70 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800")
                          }
                        >
                          <span className="truncate">{l.title}</span>
                          <span className={locked ? "opacity-60" : ""}>{l.durationMin}m</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          {!isEnrolled && <p className="mt-2 text-xs text-neutral-500">নোট: প্রথম ভিডিওটি ফ্রি প্রিভিউ। বাকি কনটেন্ট দেখতে এনরোল করুন।</p>}
        </aside>
      </div>
    </main>
  );
}
