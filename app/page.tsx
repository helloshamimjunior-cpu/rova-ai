import {
  Briefcase, Users, Target, CreditCard,
  Settings, FileText, FolderOpen,
  BookOpen, Layers, Rocket
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Page({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = searchParams?.lang === "en" ? "en" : "bn";

  const dict = {
    bn: {
      titleA: "৪ মাসে শূন্য থেকে",
      titleB: "AI Automation Specialist",
      sub: "AI Agent, Automation ও Freelancing স্কিল শিখে ক্যারিয়ার গড়ুন — বাংলায়, হাতে-কলমে।",
      primary: "এখনই ভর্তি হন",
      secondary: "সিলেবাস দেখুন",
      badges:
        "লাইভ ১ঃ১ সাপোর্ট · ফ্রি ৫ ক্রেডিট · প্র্যাকটিক্যাল প্রজেক্ট · জব সাপোর্ট",
    },
    en: {
      titleA: "Become from zero in 4 months —",
      titleB: "AI Automation Specialist",
      sub: "Learn AI Agents, Automation & Freelancing — hands-on, in Bangla.",
      primary: "Enroll Now",
      secondary: "View Syllabus",
      badges:
        "Live 1:1 Support · 5 Free Credits · Practical Projects · Job Support",
    },
  } as const;

  const t = dict[lang];

  return (
    <>
{/* HERO — full-bleed background (covers left & right) */}
<section className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden">
  {/* BG image — fills entire section */}
  <Image
    src="/hero-automation.png"
    alt=""
    fill
    priority
    aria-hidden
    className="absolute inset-0 -z-10 h-full w-full object-cover"
  />

  {/* left gradient so text is readable */}
  <div className="absolute inset-y-0 left-0 -z-10 w-[85%] md:w-1/2
                  bg-gradient-to-r from-white/95 via-white/80 to-transparent" />

  {/* inner content stays constrained */}
  <div className="mx-auto max-w-6xl grid items-center gap-8 px-4 py-12 md:py-20 md:grid-cols-2">
    {/* left: text */}
    <div className="text-center md:text-left">
      <h1 className="text-4xl font-bold mb-6">
        {t.titleA}{" "}
        <span className="text-[color:var(--brand-primary)]">{t.titleB}</span>
      </h1>

      <p className="text-lg text-gray-700 mb-8">{t.sub}</p>

      <div className="flex flex-wrap justify-center md:justify-start gap-3">
        <Link
          href="/enroll"
          className="rounded-md px-6 py-3 text-white font-medium"
          style={{ background: "var(--brand-primary)" }}
        >
          {t.primary}
        </Link>
        <Link
          href="/courses"
          className="rounded-md px-6 py-3 border font-medium bg-white/70 backdrop-blur"
        >
          {t.secondary}
        </Link>
      </div>

      <div className="mt-4 text-sm text-gray-600">{t.badges}</div>
    </div>

    {/* right: framed visual */}
    <div className="hidden md:block">
      <div className="rounded-2xl border bg-white/70 backdrop-blur p-2 shadow-xl ring-1 ring-black/5">
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <Image
            src="/hero-automation.png"
            alt="AI agent routing automations"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-12 w-12 rounded-full bg-white/90 shadow-md grid place-items-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[var(--brand-primary)]">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Credits CTA (REPLACE THIS BLOCK) */}
<section className="mx-auto max-w-6xl px-4 py-10">
  <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-blue-50 to-indigo-50 p-5 sm:p-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/80 ring-1 ring-blue-100">
          <CreditCard className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-neutral-900">Buy Credits</h3>
          <p className="text-sm text-neutral-600">
            1:1 সাপোর্ট, ওয়ার্কশপ, পোর্টফোলিও রিভিউ—টপ-আপ করে বুক করো।
          </p>
        </div>
      </div>

      <Link
        href="/credits"
        className="inline-flex items-center rounded-xl border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
      >
        Buy credits
      </Link>
    </div>

    {/* subtle glow */}
    <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />
  </div>
</section>

{/* Social Proof (REPLACE THIS BLOCK) */}
<section className="py-12 bg-white">
  <div className="mx-auto max-w-6xl px-4 flex flex-col items-center gap-4">
    <div className="flex -space-x-3">
      {["Sadia Rahman","Mahin Islam","Tanvir Ahmed","Nadia Khan","Rafiul"].map((n, i) => (
        <Image
          key={i}
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(n)}&background=E5E7EB&color=111827&size=64`}
          alt={n}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full ring-2 ring-white"
        />
      ))}
    </div>
    <p className="text-sm text-neutral-600">
      Trusted by <span className="font-semibold text-neutral-900">300+ learners</span> — growing every week.
    </p>
  </div>
</section>


      {/* Why Rova AI */}
      <section className="py-16 bg-white">
        <h2 className="text-center text-2xl font-semibold mb-10">কেন Rova AI Academy?</h2>

        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm hover:shadow-md hover:scale-105 transition">
            <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
              <Briefcase className="h-6 w-6 text-blue-600" /> হাতে-কলমে প্রজেক্ট
            </div>
            <p className="text-sm text-gray-600">
              Content Bot, CRM Workflow, SOP Walkthrough—রিয়াল প্রজেক্টে কাজ।
            </p>
          </div>

          <div className="rounded-xl border bg-gradient-to-br from-green-50 to-white p-5 shadow-sm hover:shadow-md hover:scale-105 transition">
            <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
              <Users className="h-6 w-6 text-green-600" /> বাংলায় গাইড + ১ঃ১ সাপোর্ট
            </div>
            <p className="text-sm text-gray-600">
              লাইভ সেশনে প্রশ্ন সমাধান, রেকর্ডিং ও রিসোর্সসহ।
            </p>
          </div>

          <div className="rounded-xl border bg-gradient-to-br from-purple-50 to-white p-5 shadow-sm hover:shadow-md hover:scale-105 transition">
            <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
              <Target className="h-6 w-6 text-purple-600" /> ফ্রিল্যান্স/জব ফোকাস
            </div>
            <p className="text-sm text-gray-600">
              ক্লায়েন্ট ওয়ার্কফ্লো ডিজাইন, প্রপোজাল, পোর্টফোলিও রিভিউ।
            </p>
          </div>

          <div className="rounded-xl border bg-gradient-to-br from-pink-50 to-white p-5 shadow-sm hover:shadow-md hover:scale-105 transition">
            <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
              <CreditCard className="h-6 w-6 text-pink-600" /> ক্রেডিট সিস্টেম
            </div>
            <p className="text-sm text-gray-600">
              ফ্রি ৫ ক্রেডিট, সাবস্ক্রিপশন/বাণ্ডেলে সহজে আপগ্রেড।
            </p>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 bg-white">
        <h2 className="text-center text-2xl font-semibold mb-10">
          কোর্স শেষে তুমি যা করতে পারবে
        </h2>

        <div className="mx-auto max-w-6xl grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-gradient-to-r from-blue-50 to-blue-100 p-5 hover:shadow-lg hover:-translate-y-1 transition">
            <div className="flex items-center gap-2 mb-1 font-semibold">
              <Settings className="h-5 w-5 text-blue-600" />
              AI Agent / Automation সেটআপ
            </div>
            <p className="text-sm text-gray-600">
              Zapier / n8n দিয়ে মাল্টি-স্টেপ অটোমেশন, ওয়েবহুক/ইন্টিগ্রেশন কনফিগার।
            </p>
          </div>

          <div className="rounded-xl border bg-gradient-to-r from-green-50 to-green-100 p-5 hover:shadow-lg hover:-translate-y-1 transition">
            <div className="flex items-center gap-2 mb-1 font-semibold">
              <FileText className="h-5 w-5 text-green-600" />
              ক্লায়েন্টের জন্য ওয়ার্কফ্লো ডিজাইন
            </div>
            <p className="text-sm text-gray-600">
              রিকোয়ায়ারমেন্ট নিয়ে SOP বানানো, প্রপোজাল ও কস্টিং তৈরি।
            </p>
          </div>

          <div className="rounded-xl border bg-gradient-to-r from-purple-50 to-purple-100 p-5 hover:shadow-lg hover:-translate-y-1 transition">
            <div className="flex items-center gap-2 mb-1 font-semibold">
              <FolderOpen className="h-5 w-5 text-purple-600" />
              পোর্টফোলিও + কেস স্টাডি
            </div>
            <p className="text-sm text-gray-600">
              Content Bot, CRM Workflow, SOP Walkthrough—এসব দিয়ে প্রজেক্ট শোকেস।
            </p>
          </div>

          <div className="rounded-xl border bg-gradient-to-r from-pink-50 to-pink-100 p-5 hover:shadow-lg hover:-translate-y-1 transition">
            <div className="flex items-center gap-2 mb-1 font-semibold">
              <Briefcase className="h-5 w-5 text-pink-600" />
              ফ্রিল্যান্স/জব রেডিনেস
            </div>
            <p className="text-sm text-gray-600">
              গিগ/প্রপোজাল টেমপ্লেট, ইন্টারভিউ প্রস্তুতি, ১ঃ১ সাপোর্টে সমস্যা সমাধান।
            </p>
          </div>
        </div>

        {/* Quick skill badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm">
          <Link href="/skills/prompt-engineering" className="px-3 py-1 rounded-full border hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white transition">
            Prompt Engineering
          </Link>
          <Link href="/skills/zapier" className="px-3 py-1 rounded-full border hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white transition">
            Zapier Multi-step
          </Link>
          <Link href="/skills/n8n" className="px-3 py-1 rounded-full border hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white transition">
            n8n Workflows
          </Link>
          <Link href="/skills/api-webhooks" className="px-3 py-1 rounded-full border hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white transition">
            API/Webhooks
          </Link>
          <Link href="/skills/client-proposal" className="px-3 py-1 rounded-full border hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white transition">
            Client Proposal
          </Link>
          <Link href="/skills/portfolio-case-study" className="px-3 py-1 rounded-full border hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white transition">
            Portfolio Case Study
          </Link>
        </div>
      </section>

      {/* Course Levels */}
      <section className="py-16">
        <h2 className="text-center text-2xl font-semibold mb-10">কোর্স লেভেল ও প্রাইসিং</h2>

        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Basic */}
          <div className="rounded-xl border bg-gradient-to-b from-blue-50 to-white p-6 text-center hover:shadow-md transition">
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-lg font-semibold mb-2">Basic</div>
            <div className="text-2xl font-bold text-[color:var(--brand-primary)] mb-3">৳১,৫০০</div>
            <p className="text-sm text-gray-600 mb-4">Prompt Engineering, Zapier Basics</p>
            <Link
              href="/enroll?product=basic"
              className="px-4 py-2 rounded-md text-white text-sm font-medium"
              style={{ background: "var(--brand-primary)" }}
            >
              ভর্তি হন
            </Link>
          </div>

          {/* Intermediate */}
          <div className="rounded-xl border bg-gradient-to-b from-green-50 to-white p-6 text-center hover:shadow-md transition">
            <Layers className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <div className="text-lg font-semibold mb-2">Intermediate</div>
            <div className="text-2xl font-bold text-[color:var(--brand-primary)] mb-3">৳২,৫০০</div>
            <p className="text-sm text-gray-600 mb-4">Zapier Multi-step, API Integrations</p>
            <Link
              href="/enroll?product=intermediate"
              className="px-4 py-2 rounded-md text-white text-sm font-medium"
              style={{ background: "var(--brand-primary)" }}
            >
              ভর্তি হন
            </Link>
          </div>

          {/* Advanced */}
          <div className="rounded-xl border bg-gradient-to-b from-purple-50 to-white p-6 text-center hover:shadow-md transition">
            <Rocket className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <div className="text-lg font-semibold mb-2">Advanced</div>
            <div className="text-2xl font-bold text-[color:var(--brand-primary)] mb-3">৳৬,০০০</div>
            <p className="text-sm text-gray-600 mb-4">Client workflow design, AI Agents, Freelance setup</p>
            <Link
              href="/enroll?product=advanced"
              className="px-4 py-2 rounded-md text-white text-sm font-medium"
              style={{ background: "var(--brand-primary)" }}
            >
              ভর্তি হন
            </Link>
          </div>

          {/* Micro */}
          <div className="rounded-xl border bg-gradient-to-b from-pink-50 to-white p-6 text-center hover:shadow-md transition">
            <Target className="h-8 w-8 text-pink-600 mx-auto mb-3" />
            <div className="text-lg font-semibold mb-2">Micro</div>
            <div className="text-2xl font-bold text-[color:var(--brand-primary)] mb-3">৳৫০০–৳৮০০</div>
            <p className="text-sm text-gray-600 mb-4">Topic-based mini courses</p>
            <Link
              href="/enroll?product=micro"
              className="px-4 py-2 rounded-md text-white text-sm font-medium"
              style={{ background: "var(--brand-primary)" }}
            >
              ভর্তি হন
            </Link>
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <h2 className="text-center text-3xl font-bold mb-12">কারিকুলাম ঝলক</h2>

        {/* Cards */}
        <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2">
          {/* Basic */}
          <div className="rounded-2xl border shadow-sm bg-white p-6 hover:shadow-md transition">
            <div className="text-xl font-semibold mb-3 text-blue-600">Basic — ৳১,৫০০</div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>Prompt Engineering (Foundations)</li>
              <li>Zapier Basics (Single-step)</li>
              <li>Mini Project: Content Helper</li>
            </ul>
          </div>

          {/* Intermediate */}
          <div className="rounded-2xl border shadow-sm bg-white p-6 hover:shadow-md transition">
            <div className="text-xl font-semibold mb-3 text-green-600">Intermediate — ৳২,৫০০</div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>Zapier Multi-step Workflow</li>
              <li>n8n পরিচিতি + Triggers</li>
              <li>API/Webhook Integrations</li>
              <li>Mini Project: Lead Capture → CRM</li>
            </ul>
          </div>

          {/* Advanced */}
          <div className="rounded-2xl border shadow-sm bg-white p-6 hover:shadow-md transition">
            <div className="text-xl font-semibold mb-3 text-purple-600">Advanced — ৳৬,০০০</div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>Client Workflow Design (Discovery → SOP)</li>
              <li>AI Agents Basics (LangChain/Tools)</li>
              <li>Freelance Project Setup & Handover</li>
              <li>Case Study: CRM + Agent + Notifier</li>
            </ul>
          </div>

          {/* Micro */}
          <div className="rounded-2xl border shadow-sm bg-white p-6 hover:shadow-md transition">
            <div className="text-xl font-semibold mb-3 text-pink-600">Micro — ৳৫০০–৳৮০০</div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>Topic-based Mini Courses</li>
              <li>Short Workshops (2–3 hrs)</li>
              <li>Practice Tasks + Checklists</li>
            </ul>
          </div>
        </div>

        {/* Support & credits */}
        <div className="mx-auto max-w-6xl mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-gradient-to-r from-blue-50 to-white p-6 text-center shadow-sm">
            <div className="font-bold mb-2 text-blue-600">ফ্রি ৫ ক্রেডিট</div>
            <p className="text-sm text-gray-600">শুরুতেই বেসিক কনটেন্ট/টাস্ক আনলক।</p>
          </div>
          <div className="rounded-xl border bg-gradient-to-r from-yellow-50 to-white p-6 text-center shadow-sm">
            <div className="font-bold mb-2 text-yellow-600">সাবস্ক্রিপশন</div>
            <p className="text-sm text-gray-600">৳৭০০/মাসে ১৫ ক্রেডিট · Premium ৳১,২০০ · Pro ৳২,০০০</p>
          </div>
          <div className="rounded-xl border bg-gradient-to-r from-green-50 to-white p-6 text-center shadow-sm">
            <div className="font-bold mb-2 text-green-600">Extra Bundles</div>
            <p className="text-sm text-gray-600">৫/২০/৫০ credits · Workshop/Portfolio Review</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-16">
        <h2 className="text-center text-2xl font-semibold mb-3">শিক্ষার্থীদের অভিজ্ঞতা</h2>
        <p className="text-center text-sm text-gray-500 mb-10">রিয়াল প্রজেক্ট + ১ঃ১ সাপোর্ট—ফলাফল নিজেরাই বলছে</p>

        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 1 */}
          <article className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none">“</span>
              <p className="text-sm text-gray-700">
                Rova AI কোর্স করার পরেই প্রথম ফ্রিল্যান্স প্রজেক্ট পেলাম। হাতে-কলমে প্র্যাকটিস খুব কাজে দিয়েছে।
              </p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Image
                src="https://ui-avatars.com/api/?name=Sadia+Rahman&background=2D6EEA&color=fff&size=56"
                alt="Sadia Rahman"
                width={56}
                height={56}
                className="rounded-full h-14 w-14"
                sizes="56px"
              />
              <div>
                <div className="font-semibold text-sm">সাদিয়া রহমান</div>
                <div className="text-xs text-gray-500">Freelancer</div>
              </div>
            </div>
          </article>

          {/* 2 */}
          <article className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none">“</span>
              <p className="text-sm text-gray-700">
                Dashboard আর মেন্টর সাপোর্টের জন্য শেখাটা দ্রুত হয়েছে। টেমপ্লেট + SOP গুলো সোনার খনি।
              </p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Image
                src="https://ui-avatars.com/api/?name=Mahin+Islam&background=F9A826&color=fff&size=56"
                alt="Mahin Islam"
                width={56}
                height={56}
                className="rounded-full h-14 w-14"
                sizes="56px"
              />
              <div>
                <div className="font-semibold text-sm">মাহিন ইসলাম</div>
                <div className="text-xs text-gray-500">Junior Automation Specialist</div>
              </div>
            </div>
          </article>

          {/* 3 */}
          <article className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none">“</span>
              <p className="text-sm text-gray-700">
                Portfolio review + কেস স্টাডি রেডি থাকায় ইন্টারভিউ ক্লিয়ার করা সহজ হয়েছে।
              </p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Image
                src="https://ui-avatars.com/api/?name=Tanvir+Ahmed&background=10B981&color=fff&size=56"
                alt="Tanvir Ahmed"
                width={56}
                height={56}
                className="rounded-full h-14 w-14"
                sizes="56px"
              />
              <div>
                <div className="font-semibold text-sm">তানভীর আহমেদ</div>
                <div className="text-xs text-gray-500">Automation Engineer</div>
              </div>
            </div>
          </article>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-white font-medium hover:opacity-95"
            style={{ background: "var(--brand-primary)" }}
          >
            আরও রিভিউ দেখুন
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-white">
        <h2 className="text-center text-2xl font-semibold mb-3">সাধারণ প্রশ্নোত্তর</h2>
        <p className="text-center text-sm text-gray-500 mb-10">সবচেয়ে বেশি করা প্রশ্ন ও উত্তর</p>

        <div className="mx-auto max-w-3xl divide-y rounded-2xl border bg-neutral-50">
          <details className="group p-5">
            <summary className="flex justify-between items-center font-medium cursor-pointer">
              কিভাবে পেমেন্ট করবো?
              <span className="transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <p className="text-sm text-gray-600 mt-2">
              Bkash/Nagad/SSLCommerz এর মাধ্যমে নিরাপদ অনলাইন পেমেন্ট করা যাবে।
            </p>
          </details>

          <details className="group p-5">
            <summary className="flex justify-between items-center font-medium cursor-pointer">
              কোর্স কিনলে কতদিন অ্যাক্সেস থাকবে?
              <span className="transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <p className="text-sm text-gray-600 mt-2">
              প্রতিটি কোর্সে লাইফটাইম অ্যাক্সেস থাকবে, সাথে ফ্রি আপডেট।
            </p>
          </details>

          <details className="group p-5">
            <summary className="flex justify-between items-center font-medium cursor-pointer">
              ১ঃ১ সাপোর্ট সেশন কিভাবে বুক করবো?
              <span className="transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <p className="text-sm text-gray-600 mt-2">
              Dashboard থেকে সাপোর্ট সেশন স্লট সিলেক্ট করে সহজে বুক করা যাবে।
            </p>
          </details>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-white font-medium hover:opacity-95"
            style={{ background: "var(--brand-primary)" }}
          >
            সব FAQ দেখুন
          </Link>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 bg-[color:var(--brand-primary)] text-white text-center rounded-none">
        <h2 className="text-3xl font-bold mb-4">
          আজই শুরু করুন — ফ্রি ৫ ক্রেডিট সহ
        </h2>
        <p className="text-lg mb-6">
          Rova AI Academy এর সাথে Automation ও AI স্কিল শিখে ক্যারিয়ার এগিয়ে নিন
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/enroll"
            className="px-6 py-3 rounded-md bg-white text-[color:var(--brand-primary)] font-medium"
          >
            এখনই ভর্তি হন
          </Link>
          <Link
            href="/courses"
            className="px-6 py-3 rounded-md border border-white font-medium"
          >
            কোর্স দেখুন
          </Link>
        </div>
      </section>
    </>
  );
}
