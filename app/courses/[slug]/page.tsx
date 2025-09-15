// app/courses/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseBySlug } from "../../../lib/courses";

export const dynamic = "force-static";

export default async function CourseDetailPage({
  params,
}: {
  // Next.js 15: params is a Promise
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;           // ✅ params await
  const course = getCourseBySlug(slug);
  if (!course) return notFound();

  const stats = course.stats ?? { rating: 4.7, students: "—", duration: "—", lessons: 0 };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200">
            {course.level}
          </span>
          <span className="text-xs text-gray-500">
            ⭐ {stats.rating.toFixed(1)} • 👥 {stats.students} • ⏱️ {stats.duration} • 📚 {stats.lessons} লেসন
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{course.title}</h1>
        <p className="mt-1 text-gray-600">{course.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/enroll?product=${course.slug}`}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            এনরোল করুন
          </Link>
          <Link
            href={`/courses/${slug}/learn`}   // ✅ এখানে slug ব্যবহার
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
          >
            ডেমো ট্রাই করুন
          </Link>
        </div>
      </div>

      {/* Price + Includes */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
          <div className="text-sm text-indigo-700">কোর্স ফি</div>
          <div className="mt-1 text-2xl font-bold text-indigo-900">{course.price ?? "যোগাযোগ করুন"}</div>
          <Link
            href={`/enroll?product=${course.slug}`}
            className="mt-3 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            এখনই এনরোল করুন
          </Link>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 md:col-span-2">
          <div className="text-sm font-semibold text-gray-900">কোর্সে যা যা থাকছে</div>
          <ul className="mt-2 grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
            {(course.includes ?? ["ভিডিও লেসন", "প্র্যাকটিস ফাইল", "কমিউনিটি সাপোর্ট", "সার্টিফিকেট"]).map((it, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" /> {it}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overview */}
      <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">ওভারভিউ</h2>
        <p className="text-gray-700">{course.short}</p>
        <p className="mt-2 text-gray-600">{course.tagline}</p>
      </section>

      {/* Outcomes + For who + Prereqs */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-3 text-base font-semibold text-gray-900">আপনি যা শিখবেন</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {(course.outcomes ?? []).map((o, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-indigo-500" /> {o}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-3 text-base font-semibold text-gray-900">কার জন্য উপযুক্ত</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {(course.forWho ?? []).map((o, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" /> {o}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-3 text-base font-semibold text-gray-900">প্রয়োজনীয়তা</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {(course.prereqs ?? []).map((o, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-500" /> {o}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Syllabus */}
      {course.syllabus?.length ? (
        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">সিলেবাস</h2>
          <div className="space-y-4">
            {course.syllabus.map((m, idx) => (
              <details key={idx} className="rounded-xl border border-gray-200 bg-gray-50 p-4 open:bg-white">
                <summary className="cursor-pointer select-none text-gray-900">{m.title}</summary>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {m.lessons.map((l) => (
                    <li key={l.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500" /> {l.title}
                      </div>
                      <span className="text-gray-500">{l.duration}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {/* Bottom CTA */}
      <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-indigo-900">রেডি?</h3>
        <p className="mt-1 text-sm text-indigo-800">আজ থেকেই শুরু করুন—প্রথম লেসনটি ফ্রি ট্রাই করতে পারেন।</p>
        <div className="mt-4 flex justify-center gap-2">
          <Link
            href={`/enroll?product=${course.slug}`}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            এনরোল করুন
          </Link>
          <Link
            href={`/courses/${slug}/learn`}  // ✅ এখানে slug ব্যবহার
            className="rounded-xl border border-indigo-300 bg-white px-4 py-2 text-sm text-indigo-700 hover:bg-indigo-100"
          >
            প্রথম লেসন দেখুন
          </Link>
        </div>
      </section>
    </div>
  );
}
