// app/courses/[slug]/learn/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseBySlug, type Lesson } from "../../../../lib/courses";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Search = { lesson?: string };

// সব লেসন ফ্ল্যাট করা
function flattenLessons(course: ReturnType<typeof getCourseBySlug>): Lesson[] {
  const out: Lesson[] = [];
  (course?.syllabus ?? []).forEach((m) => m.lessons.forEach((l) => out.push(l)));
  return out;
}

export default async function LearnPage({
  params,
  searchParams,
}: {
  // ✅ Next.js 15: দুটোই Promise
  params: Promise<{ slug: string }>;
  searchParams: Promise<Search>;
}) {
  const { slug } = await params;           // ✅ await
  const sp = await searchParams;           // ✅ await

  const course = getCourseBySlug(slug);
  if (!course) return notFound();

  const lessons = flattenLessons(course);
  if (lessons.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900">কনটেন্ট আসছে</h1>
        <p className="mt-2 text-gray-600">এই কোর্সের সিলেবাস এখনও যোগ করা হয়নি।</p>
        <Link
          href={`/courses/${slug}`}
          className="mt-4 inline-block rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
        >
          ডিটেইলসে ফিরুন
        </Link>
      </div>
    );
  }

  // URL থেকে লেসন সিলেক্ট; না পেলে প্রথম লেসন
  const currentId = sp?.lesson ?? lessons[0].id;
  const current = lessons.find((l) => l.id === currentId) ?? lessons[0];
  const isLocked = !current.free; // ডেমো নয় মানে লক

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm">
        <Link href={`/courses/${slug}`} className="text-indigo-600 hover:underline">
          ← কোর্স ডিটেইলস
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Player area */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black">
            <div className="relative">
              {/* Video or placeholder */}
              {current.video ? (
                <video key={current.id} controls className="aspect-video w-full" src={current.video} />
              ) : (
                <div className="aspect-video grid w-full place-items-center bg-gray-900 text-gray-300">
                  <div className="text-center">
                    <div className="text-lg font-semibold">ভিডিও প্রিভিউ নেই</div>
                    <div className="text-sm text-gray-400">এই লেসনে ভিডিও সংযুক্ত করা হয়নি</div>
                  </div>
                </div>
              )}

              {/* Lock overlay */}
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <div className="rounded-2xl border border-indigo-400 bg-white/90 p-6 text-center shadow-lg">
                    <div className="text-base font-semibold text-gray-900">এই লেসনটি লকড</div>
                    <p className="mt-1 text-sm text-gray-700">
                      ডেমো হিসেবে প্রথম ১–২টি লেসন ফ্রি। বাকি কনটেন্ট দেখতে এনরোল করুন।
                    </p>
                    <Link
                      href={`/enroll?product=${course.slug}`}
                      className="mt-3 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      এনরোল করুন
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Current lesson meta */}
          <div className="mt-4">
            <div className="text-xs text-gray-500">{course.level}</div>
            <h1 className="mt-1 text-xl font-semibold text-gray-900">{current.title}</h1>
            <p className="mt-1 text-sm text-gray-600">
              {course.title} — {current.duration} {current.free ? "• ফ্রি" : "• লকড"}
            </p>
          </div>
        </div>

        {/* Sidebar curriculum */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-4">
              <div className="text-sm font-semibold text-gray-900">সিলেবাস</div>
              <div className="text-xs text-gray-500">{course.title}</div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-3">
              {(course.syllabus ?? []).map((mod, idx) => (
                <div key={idx} className="mb-3">
                  <div className="px-2 pb-1 text-xs font-medium text-gray-500">{mod.title}</div>

                  <ul className="space-y-1">
                    {mod.lessons.map((l) => {
                      const active = l.id === current.id;
                      const locked = !l.free;

                      return (
                        <li key={l.id}>
                          {locked ? (
                            <div
                              className={
                                "flex items-center justify-between rounded-lg border px-3 py-2 text-sm " +
                                (active
                                  ? "border-gray-300 bg-gray-50 text-gray-700"
                                  : "border-gray-200 bg-white text-gray-600")
                              }
                            >
                              <div className="flex items-center gap-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" className="fill-gray-400">
                                  <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-6h-1V9a5 5 0 1 0-10 0v2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Zm-7 0H9V9a3 3 0 1 1 6 0v2h-4Z" />
                                </svg>
                                <span className="line-clamp-1">{l.title}</span>
                              </div>
                              <span className="text-xs text-gray-400">{l.duration}</span>
                            </div>
                          ) : (
                            <Link
                              href={`/courses/${slug}/learn?lesson=${l.id}`}  // ✅ slug ব্যবহার
                              className={
                                "flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition " +
                                (active
                                  ? "border-indigo-300 bg-indigo-50 text-indigo-800"
                                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50")
                              }
                            >
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                                  ফ্রি
                                </span>
                                <span className="line-clamp-1">{l.title}</span>
                              </div>
                              <span className="text-xs text-gray-500">{l.duration}</span>
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-3">
              <Link
                href={`/enroll?product=${course.slug}`}
                className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                কোর্স আনলক করুন
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
