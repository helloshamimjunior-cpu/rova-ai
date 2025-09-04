'use client'

import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useState, Suspense } from 'react'

/* ---------- Types & Demo Data (inline) ---------- */
type Level = 'basic' | 'intermediate' | 'advanced' | 'micro'
type Course = {
  id: string
  slug: string
  level: Level
  titleBn: string
  summaryBn: string
  durationHr: number
  lessons: number
  features: string[]
}

const COURSES: Course[] = [
  { id: 'c-basic', slug: 'basic', level: 'basic', titleBn: 'বেসিক এআই ফান্ডামেন্টালস',
    summaryBn: 'প্রম্পটিং, LLM ধারণা, টুলিং বেসিক—শুরু করার জন্য প্রয়োজনীয় সবকিছু।',
    durationHr: 8, lessons: 16, features: ['Prompting 101','LLM vs Traditional','Hands-on mini projects'] },
  { id: 'c-intermediate', slug: 'intermediate', level: 'intermediate', titleBn: 'ইন্টারমিডিয়েট প্র‍্যাকটিস',
    summaryBn: 'কাজে লাগানোর কৌশল—ওয়ার্কফ্লো, অটোমেশন, ছোট অ্যাপ বানানো।',
    durationHr: 12, lessons: 18, features: ['Workflow design','APIs & automations','Project: mini agent'] },
  { id: 'c-advanced', slug: 'advanced', level: 'advanced', titleBn: 'অ্যাডভান্সড প্রোজেক্টস',
    summaryBn: 'এন্ড-টু-এন্ড প্রোজেক্ট—ইনফ্রা, ডিপ্লয়, স্কেলিং।',
    durationHr: 16, lessons: 20, features: ['Retrieval','Eval/Observability','Deploy at scale'] },
  { id: 'c-micro', slug: 'micro', level: 'micro', titleBn: 'মাইক্রো কোর্স (স্প্রিন্ট)',
    summaryBn: 'ফোকাসড ২-৪ ঘন্টার টপিক—দ্রুত স্কিল-আপ।',
    durationHr: 3, lessons: 6, features: ['One-topic deep dive','Hands-on lab','Certificate'] },
]

const levelLabelBn: Record<Level | 'all', string> = {
  all: 'সব', basic: 'বেসিক', intermediate: 'ইন্টারমিডিয়েট', advanced: 'অ্যাডভান্সড', micro: 'মাইক্রো',
}
const levelToProductParam: Record<Level, string> = {
  basic: 'basic', intermediate: 'intermediate', advanced: 'advanced', micro: 'micro',
}

function filterCourses(level?: string | null, q?: string | null) {
  let list = [...COURSES]
  if (level && ['basic','intermediate','advanced','micro'].includes(level)) {
    list = list.filter(c => c.level === (level as Level))
  }
  if (q) {
    const needle = q.toLowerCase()
    list = list.filter(c =>
      c.titleBn.toLowerCase().includes(needle) ||
      c.summaryBn.toLowerCase().includes(needle) ||
      c.features.some(f => f.toLowerCase().includes(needle)),
    )
  }
  return list
}

/* ---------- Inline UI pieces ---------- */
function Filters() {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()
  const active = (sp.get('level') as Level | 'all') || 'all'
  const [q, setQ] = useState(sp.get('q') ?? '')
  const TABS: (Level | 'all')[] = ['all','basic','intermediate','advanced','micro']

  function push(next: URLSearchParams) {
    router.push(`${pathname}?${next.toString()}`)
  }
  function onTabClick(tab: Level | 'all') {
    const next = new URLSearchParams(sp.toString())
    if (tab === 'all') next.delete('level'); else next.set('level', tab)
    push(next)
  }
  function onSearch(e: React.FormEvent) {
    e.preventDefault()
    const next = new URLSearchParams(sp.toString())
    q ? next.set('q', q) : next.delete('q')
    push(next)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={
              'rounded-full border px-3 py-1 text-sm transition ' +
              (active === tab
                ? 'border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                : 'border-neutral-300/70 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800')
            }
          >
            {levelLabelBn[tab as keyof typeof levelLabelBn]}
          </button>
        ))}
      </div>
      <form onSubmit={onSearch} className="flex gap-2">
        <input
          className="w-full rounded-xl border border-neutral-300/70 bg-white/90 px-3 py-2 text-sm outline-none ring-1 ring-neutral-900/5 backdrop-blur focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-neutral-700 dark:bg-neutral-900/70 dark:ring-white/10"
          placeholder="সার্চ করুন…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button className="rounded-xl border border-neutral-300/70 px-4 py-2 text-sm transition hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800" type="submit">
          সার্চ
        </button>
      </form>
    </div>
  )
}

function CourseCard({ c }: { c: Course }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/70 p-5 shadow-sm ring-1 ring-neutral-900/5 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800/60 dark:bg-neutral-900/50 dark:ring-white/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-70" />
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">{c.titleBn}</h3>
        <span className="rounded-full border border-neutral-300/70 px-3 py-1 text-xs text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
          {levelLabelBn[c.level]}
        </span>
      </div>
      <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{c.summaryBn}</p>
      <div className="mt-3 flex gap-3 text-xs text-neutral-600 dark:text-neutral-400">
        <span className="rounded-md border border-neutral-300/70 px-2 py-1 dark:border-neutral-700">⏱ {c.durationHr} ঘন্টা</span>
        <span className="rounded-md border border-neutral-300/70 px-2 py-1 dark:border-neutral-700">📚 {c.lessons} লেসন</span>
      </div>
      <ul className="mt-3 grid list-disc gap-1 pl-5 text-sm text-neutral-800 dark:text-neutral-200">
        {c.features.map((f, i) => <li key={i} className="marker:text-indigo-500">{f}</li>)}
      </ul>
      <div className="mt-4 flex gap-2">
        <Link href={`/enroll?product=${levelToProductParam[c.level]}`} className="rounded-xl border border-neutral-300/70 px-4 py-2 text-sm transition hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
          এনরোল করুন
        </Link>
        <Link href={`/courses/${c.slug}`} className="rounded-xl border border-neutral-300/70 px-4 py-2 text-sm transition hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
          বিস্তারিত
        </Link>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-indigo-500/20 transition duration-200 group-hover:ring-8" />
    </div>
  )
}

/* ---------- Page ---------- */
function CoursesBody() {
  const sp = useSearchParams()
  const level = sp.get('level')
  const q = sp.get('q')
  const list = filterCourses(level, q)
  const hasFilters = Boolean((level && ['basic','intermediate','advanced','micro'].includes(level)) || q)

  return (
    <>
      <section className="rounded-2xl border border-neutral-200/70 bg-white/70 p-4 ring-1 ring-neutral-900/5 backdrop-blur-sm dark:border-neutral-800/60 dark:bg-neutral-900/50 dark:ring-white/10">
        <Filters />
      </section>

      <section className="mt-4 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
        <span>{list.length} টি কোর্স{hasFilters ? ' • ফিল্টার অন' : ''}</span>
        {hasFilters && (
          <Link href="/courses" className="rounded-full border border-neutral-300/70 px-3 py-1 transition hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
            ফিল্টার রিসেট
          </Link>
        )}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.length === 0 ? (
          <div className="col-span-full rounded-xl border border-neutral-200/70 bg-white/70 p-6 text-center text-sm text-neutral-600 ring-1 ring-neutral-900/5 backdrop-blur-sm dark:border-neutral-800/60 dark:bg-neutral-900/50 dark:text-neutral-300 dark:ring-white/10">
            কিছু পাওয়া যায়নি। ফিল্টার/সার্চ রিসেট করে দেখুন।
          </div>
        ) : (
          list.map(c => <CourseCard key={c.id} c={c} />)
        )}
      </section>
    </>
  )
}

export default function CoursesPageClient() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-10">
      {/* নরম গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড (হোমের মতো) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_10%_10%,rgba(37,99,235,0.12),transparent),radial-gradient(50%_60%_at_90%_20%,rgba(147,51,234,0.10),transparent),linear-gradient(to_bottom,#f8fafc,white)] dark:bg-[radial-gradient(60%_70%_at_10%_10%,rgba(37,99,235,0.10),transparent),radial-gradient(50%_60%_at_90%_20%,rgba(147,51,234,0.10),transparent),linear-gradient(to_bottom,#0a0a0a,#0f0f10)]" />

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            কোর্সসমূহ
          </span>
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
          বেছে নিন—বেসিক, ইন্টারমিডিয়েট, অ্যাডভান্সড বা মাইক্রো। ফিল্টার/সার্চ ব্যবহার করুন।
        </p>
      </header>

      {/* useSearchParams নিরাপদ রাখতে Suspense দিলাম (প্রোডে সতর্কতা বন্ধ) */}
      <Suspense fallback={<div className="text-sm text-neutral-500">Loading…</div>}>
        <CoursesBody />
      </Suspense>
    </main>
  )
}
