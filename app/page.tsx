// app/page.tsx
"use client";

import {
  Briefcase, Users, Target, CreditCard,
  Settings, FileText, FolderOpen,
  BookOpen, Layers, Rocket
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const sp = useSearchParams();
  const lang = sp.get("lang") === "en" ? "en" : "bn";

  const dict = {
    bn: {
      titleA: "৪ মাসে শূন্য থেকে",
      titleB: "AI Automation Specialist",
      sub: "AI Agent, Automation ও Freelancing স্কিল শিখে ক্যারিয়ার গড়ুন — বাংলায়, হাতে-কলমে।",
      primary: "এখনই ভর্তি হন",
      secondary: "সিলেবাস দেখুন",
      badges: "লাইভ ১ঃ১ সাপোর্ট · ফ্রি ৫ ক্রেডিট · প্র্যাকটিক্যাল প্রজেক্ট · জব সাপোর্ট",
    },
    en: {
      titleA: "Become from zero in 4 months —",
      titleB: "AI Automation Specialist",
      sub: "Learn AI Agents, Automation & Freelancing — hands-on, in Bangla.",
      primary: "Enroll Now",
      secondary: "View Syllabus",
      badges: "Live 1:1 Support · 5 Free Credits · Practical Projects · Job Support",
    },
  } as const;

  const t = dict[lang];

  return (
    <>
      {/* HERO — full-bleed background */}
      <section className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden">
        {/* BG image — fills entire section */}
        <Image
          src="/hero-automation.png"
          alt=""
          fill
          priority
          aria-hidden={true}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />

        {/* left gradient so text is readable */}
        <div
          className="absolute inset-y-0 left-0 -z-10 w-[85%] md:w-1/2
                     bg-gradient-to-r from-white/95 via-white/80 to-transparent"
        />

        {/* inner content stays constrained */}
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
          {/* left: text */}
          <div className="text-center md:text-left">
            <h1 className="mb-6 text-4xl font-bold">
              {t.titleA}{" "}
              <span className="text-[color:var(--brand-primary)]">{t.titleB}</span>
            </h1>

            <p className="mb-8 text-lg text-gray-700">{t.sub}</p>

            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <Link
                href="/enroll"
                className="rounded-md px-6 py-3 font-medium text-white"
                style={{ background: "var(--brand-primary)" }}
              >
                {t.primary}
              </Link>
              <Link
                href="/courses"
                className="rounded-md border bg-white/70 px-6 py-3 font-medium backdrop-blur"
              >
                {t.secondary}
              </Link>
            </div>

            <div className="mt-4 text-sm text-gray-600">{t.badges}</div>
          </div>

          {/* right: framed visual */}
          <div className="hidden md:block">
            <div className="rounded-2xl border bg-white/70 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur">
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image
                  src="/hero-automation.png"
                  alt="AI agent routing automations"
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-white/90 shadow-md">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[var(--brand-primary)]" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credits CTA */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div
          className="relative overflow-hidden rounded-2xl border border-neutral-200 p-5 sm:p-6
                     bg-gradient-to-r from-blue-50 to-indigo-50
                     dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-900"
          style={{ ["--brand-primary" as any]: "var(--brand-primary, #2563eb)" }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/80 ring-1 ring-blue-100 dark:bg-neutral-800/80 dark:ring-neutral-700">
                <CreditCard className="h-5 w-5 text-[color:var(--brand-primary)]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  Buy Credits
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  1:1 সাপোর্ট, ওয়ার্কশপ, পোর্টফোলিও রিভিউ—টপ-আপ করে বুক করো।
                </p>
              </div>
            </div>

            <Link
              href="/credits"
              className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium
                         border-[color:var(--brand-primary)]
                         text-[color:var(--brand-primary)]
                         transition-colors hover:bg-[color:var(--brand-primary)] hover:text-white"
              aria-label="Buy credits"
            >
              Buy credits
            </Link>
          </div>

          {/* subtle glow */}
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-500/10" />
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="group mx-auto flex w-fit items-center gap-3 rounded-2xl border border-neutral-200/70 bg-white/70 p-2 pl-3 pr-4 shadow-sm ring-1 ring-neutral-900/5 transition-all duration-300 hover:shadow-md backdrop-blur-sm dark:border-neutral-800/60 dark:bg-neutral-900/50 dark:ring-white/10">
            {/* Avatar stack (initials) */}
            <ul className="flex -space-x-2">
              {["Sadia Rahman", "Mahin Islam", "Tanvir Ahmed", "Nadia Khan", "Rafiul"].map((n) => {
                const initials = n
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();
                return (
                  <li key={n}>
                    <span
                      aria-label={n}
                      className="grid h-9 w-9 place-content-center rounded-full border border-white/70 bg-gradient-to-br from-neutral-100 to-neutral-200 text-[11px] font-semibold tracking-wide text-neutral-700 shadow-sm ring-1 ring-neutral-900/5 dark:border-neutral-900/40 dark:from-neutral-700 dark:to-neutral-800 dark:text-neutral-100"
                    >
                      {initials}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-semibold text-transparent">
                300+ শিক্ষার্থী
              </span>
              <span className="hidden sm:inline"> — প্রতি সপ্তাহে বাড়ছে</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Why Rova AI */}
      <section className="bg-white py-16">
        <h2 className="mb-10 text-center text-2xl font-semibold">কেন Rova AI Academy?</h2>

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-gradient-to-br from-blue-50 to-white p-5 transition hover:scale-105 hover:shadow-md">
            <div className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <Briefcase className="h-6 w-6 text-blue-600" /> হাতে-কলমে প্রজেক্ট
            </div>
            <p className="text-sm text-gray-600">Content Bot, CRM Workflow, SOP Walkthrough—রিয়াল প্রজেক্টে কাজ।</p>
          </div>

          <div className="rounded-xl border bg-gradient-to-br from-green-50 to-white p-5 transition hover:scale-105 hover:shadow-md">
            <div className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <Users className="h-6 w-6 text-green-600" /> বাংলায় গাইড + ১ঃ১ সাপোর্ট
            </div>
            <p className="text-sm text-gray-600">লাইভ সেশনে প্রশ্ন সমাধান, রেকর্ডিং ও রিসোর্সসহ।</p>
          </div>

          <div className="rounded-xl border bg-gradient-to-br from-purple-50 to-white p-5 transition hover:scale-105 hover:shadow-md">
            <div className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <Target className="h-6 w-6 text-purple-600" /> ফ্রিল্যান্স/জব ফোকাস
            </div>
            <p className="text-sm text-gray-600">ক্লায়েন্ট ওয়ার্কফ্লো ডিজাইন, প্রপোজাল, পোর্টফোলিও রিভিউ।</p>
          </div>

          <div className="rounded-xl border bg-gradient-to-br from-pink-50 to-white p-5 transition hover:scale-105 hover:shadow-md">
            <div className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <CreditCard className="h-6 w-6 text-pink-600" /> ক্রেডিট সিস্টেম
            </div>
            <p className="text-sm text-gray-600">ফ্রি ৫ ক্রেডিট, সাবস্ক্রিপশন/বাণ্ডেলে সহজে আপগ্রেড।</p>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-white py-16">
        <h2 className="mb-10 text-center text-2xl font-semibold">কোর্স শেষে তুমি যা করতে পারবে</h2>

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-gradient-to-r from-blue-50 to-blue-100 p-5 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-1 flex items-center gap-2 font-semibold">
              <Settings className="h-5 w-5 text-blue-600" />
              AI Agent / Automation সেটআপ
            </div>
            <p className="text-sm text-gray-600">Zapier / n8n দিয়ে মাল্টি-স্টেপ অটোমেশন, ওয়েবহুক/ইন্টিগ্রেশন কনফিগার।</p>
          </div>

          <div className="rounded-xl border bg-gradient-to-r from-green-50 to-green-100 p-5 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-1 flex items-center gap-2 font-semibold">
              <FileText className="h-5 w-5 text-green-600" />
              ক্লায়েন্টের জন্য ওয়ার্কফ্লো ডিজাইন
            </div>
            <p className="text-sm text-gray-600">রিকোয়ায়ারমেন্ট নিয়ে SOP বানানো, প্রপোজাল ও কস্টিং তৈরি।</p>
          </div>

          <div className="rounded-xl border bg-gradient-to-r from-purple-50 to-purple-100 p-5 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-1 flex items-center gap-2 font-semibold">
              <FolderOpen className="h-5 w-5 text-purple-600" />
              পোর্টফোলিও + কেস স্টাডি
            </div>
            <p className="text-sm text-gray-600">Content Bot, CRM Workflow, SOP Walkthrough—এসব দিয়ে প্রজেক্ট শোকেস।</p>
          </div>

          <div className="rounded-xl border bg-gradient-to-r from-pink-50 to-pink-100 p-5 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-1 flex items-center gap-2 font-semibold">
              <Briefcase className="h-5 w-5 text-pink-600" />
              ফ্রিল্যান্স/জব রেডিনেস
            </div>
            <p className="text-sm text-gray-600">গিগ/প্রপোজাল টেমপ্লেট, ইন্টারভিউ প্রস্তুতি, ১ঃ১ সাপোর্টে সমস্যা সমাধান।</p>
          </div>
        </div>

        {/* Quick skill badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm">
          <Link href="/skills/prompt-engineering" className="rounded-full border px-3 py-1 transition hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white">
            Prompt Engineering
          </Link>
          <Link href="/skills/zapier" className="rounded-full border px-3 py-1 transition hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white">
            Zapier Multi-step
          </Link>
          <Link href="/skills/n8n" className="rounded-full border px-3 py-1 transition hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white">
            n8n Workflows
          </Link>
          <Link href="/skills/api-webhooks" className="rounded-full border px-3 py-1 transition hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white">
            API/Webhooks
          </Link>
          <Link href="/skills/client-proposal" className="rounded-full border px-3 py-1 transition hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white">
            Client Proposal
          </Link>
          <Link href="/skills/portfolio-case-study" className="rounded-full border px-3 py-1 transition hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white">
            Portfolio Case Study
          </Link>
        </div>
      </section>

      {/* Course Levels */}
      <section className="py-16">
        <h2 className="mb-10 text-center text-2xl font-semibold">কোর্স লেভেল ও প্রাইসিং</h2>

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Basic */}
          <div className="rounded-xl border bg-gradient-to-b from-blue-50 to-white p-6 text-center transition hover:shadow-md">
            <BookOpen className="mx-auto mb-3 h-8 w-8 text-blue-600" />
            <div className="mb-2 text-lg font-semibold">Basic</div>
            <div className="mb-3 text-2xl font-bold text-[color:var(--brand-primary)]">৳১,৫০০</div>
            <p className="mb-4 text-sm text-gray-600">Prompt Engineering, Zapier Basics</p>
            <Link href="/enroll?product=basic" className="rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--brand-primary)" }}>
              ভর্তি হন
            </Link>
          </div>

          {/* Intermediate */}
          <div className="rounded-xl border bg-gradient-to-b from-green-50 to-white p-6 text-center transition hover:shadow-md">
            <Layers className="mx-auto mb-3 h-8 w-8 text-green-600" />
            <div className="mb-2 text-lg font-semibold">Intermediate</div>
            <div className="mb-3 text-2xl font-bold text-[color:var(--brand-primary)]">৳২,৫০০</div>
            <p className="mb-4 text-sm text-gray-600">Zapier Multi-step, API Integrations</p>
            <Link href="/enroll?product=intermediate" className="rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--brand-primary)" }}>
              ভর্তি হন
            </Link>
          </div>

          {/* Advanced */}
          <div className="rounded-xl border bg-gradient-to-b from-purple-50 to-white p-6 text-center transition hover:shadow-md">
            <Rocket className="mx-auto mb-3 h-8 w-8 text-purple-600" />
            <div className="mb-2 text-lg font-semibold">Advanced</div>
            <div className="mb-3 text-2xl font-bold text-[color:var(--brand-primary)]">৳৬,০০০</div>
            <p className="mb-4 text-sm text-gray-600">Client workflow design, AI Agents, Freelance setup</p>
            <Link href="/enroll?product=advanced" className="rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--brand-primary)" }}>
              ভর্তি হন
            </Link>
          </div>

          {/* Micro */}
          <div className="rounded-xl border bg-gradient-to-b from-pink-50 to-white p-6 text-center transition hover:shadow-md">
            <Target className="mx-auto mb-3 h-8 w-8 text-pink-600" />
            <div className="mb-2 text-lg font-semibold">Micro</div>
            <div className="mb-3 text-2xl font-bold text-[color:var(--brand-primary)]">৳৫০০–৳৮০০</div>
            <p className="mb-4 text-sm text-gray-600">Topic-based mini courses</p>
            <Link href="/enroll?product=micro" className="rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--brand-primary)" }}>
              ভর্তি হন
            </Link>
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">কারিকুলাম ঝলক</h2>

        {/* Cards */}
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {/* Basic */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-3 text-xl font-semibold text-blue-600">Basic — ৳১,৫০০</div>
            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
              <li>Prompt Engineering (Foundations)</li>
              <li>Zapier Basics (Single-step)</li>
              <li>Mini Project: Content Helper</li>
            </ul>
          </div>

          {/* Intermediate */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-3 text-xl font-semibold text-green-600">Intermediate — ৳২,৫০০</div>
            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
              <li>Zapier Multi-step Workflow</li>
              <li>n8n পরিচিতি + Triggers</li>
              <li>API/Webhook Integrations</li>
              <li>Mini Project: Lead Capture → CRM</li>
            </ul>
          </div>

          {/* Advanced */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-3 text-xl font-semibold text-purple-600">Advanced — ৳৬,০০০</div>
            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
              <li>Client Workflow Design (Discovery → SOP)</li>
              <li>AI Agents Basics (LangChain/Tools)</li>
              <li>Freelance Project Setup & Handover</li>
              <li>Case Study: CRM + Agent + Notifier</li>
            </ul>
          </div>

          {/* Micro */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-3 text-xl font-semibold text-pink-600">Micro — ৳৫০০–৳৮০০</div>
            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
              <li>Topic-based Mini Courses</li>
              <li>Short Workshops (2–3 hrs)</li>
              <li>Practice Tasks + Checklists</li>
            </ul>
          </div>
        </div>

        {/* Support & credits */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-gradient-to-r from-blue-50 to-white p-6 text-center shadow-sm">
            <div className="mb-2 font-bold text-blue-600">ফ্রি ৫ ক্রেডিট</div>
            <p className="text-sm text-gray-600">শুরুতেই বেসিক কনটেন্ট/টাস্ক আনলক।</p>
          </div>
          <div className="rounded-xl border bg-gradient-to-r from-yellow-50 to-white p-6 text-center shadow-sm">
            <div className="mb-2 font-bold text-yellow-600">সাবস্ক্রিপশন</div>
            <p className="text-sm text-gray-600">৳৭০০/মাসে ১৫ ক্রেডিট · Premium ৳১,২০০ · Pro ৳২,০০০</p>
          </div>
          <div className="rounded-xl border bg-gradient-to-r from-green-50 to-white p-6 text-center shadow-sm">
            <div className="mb-2 font-bold text-green-600">Extra Bundles</div>
            <p className="text-sm text-gray-600">৫/২০/৫০ credits · Workshop/Portfolio Review</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-16">
        <h2 className="mb-3 text-center text-2xl font-semibold">শিক্ষার্থীদের অভিজ্ঞতা</h2>
        <p className="mb-10 text-center text-sm text-gray-500">রিয়াল প্রজেক্ট + ১ঃ১ সাপোর্ট—ফলাফল নিজেরাই বলছে</p>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 1 */}
          <article className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
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
                className="h-14 w-14 rounded-full"
                sizes="56px"
              />
              <div>
                <div className="text-sm font-semibold">সাদিয়া রহমান</div>
                <div className="text-xs text-gray-500">Freelancer</div>
              </div>
            </div>
          </article>

          {/* 2 */}
          <article className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
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
                className="h-14 w-14 rounded-full"
                sizes="56px"
              />
              <div>
                <div className="text-sm font-semibold">মাহিন ইসলাম</div>
                <div className="text-xs text-gray-500">Junior Automation Specialist</div>
              </div>
            </div>
          </article>

          {/* 3 */}
          <article className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
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
                className="h-14 w-14 rounded-full"
                sizes="56px"
              />
              <div>
                <div className="text-sm font-semibold">তানভীর আহমেদ</div>
                <div className="text-xs text-gray-500">Automation Engineer</div>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 font-medium text-white hover:opacity-95"
            style={{ background: "var(--brand-primary)" }}
          >
            আরও রিভিউ দেখুন
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-16">
        <h2 className="mb-3 text-center text-2xl font-semibold">সাধারণ প্রশ্নোত্তর</h2>
        <p className="mb-10 text-center text-sm text-gray-500">সবচেয়ে বেশি করা প্রশ্ন ও উত্তর</p>

        <div className="mx-auto max-w-3xl divide-y rounded-2xl border bg-neutral-50">
          <details className="group p-5">
            <summary className="flex cursor-pointer items-center justify-between font-medium">
              কিভাবে পেমেন্ট করবো?
              <span className="transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-2 text-sm text-gray-600">Bkash/Nagad/SSLCommerz এর মাধ্যমে নিরাপদ অনলাইন পেমেন্ট করা যাবে।</p>
          </details>

          <details className="group p-5">
            <summary className="flex cursor-pointer items-center justify-between font-medium">
              কোর্স কিনলে কতদিন অ্যাক্সেস থাকবে?
              <span className="transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-2 text-sm text-gray-600">প্রতিটি কোর্সে লাইফটাইম অ্যাক্সেস থাকবে, সাথে ফ্রি আপডেট।</p>
          </details>

          <details className="group p-5">
            <summary className="flex cursor-pointer items-center justify-between font-medium">
              ১ঃ১ সাপোর্ট সেশন কিভাবে বুক করবো?
              <span className="transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-2 text-sm text-gray-600">Dashboard থেকে সাপোর্ট সেশন স্লট সিলেক্ট করে সহজে বুক করা যাবে।</p>
          </details>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 font-medium text-white hover:opacity-95"
            style={{ background: "var(--brand-primary)" }}
          >
            সব FAQ দেখুন
          </Link>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="rounded-none bg-[color:var(--brand-primary)] py-16 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">আজই শুরু করুন — ফ্রি ৫ ক্রেডিট সহ</h2>
        <p className="mb-6 text-lg">Rova AI Academy এর সাথে Automation ও AI স্কিল শিখে ক্যারিয়ার এগিয়ে নিন</p>
        <div className="flex justify-center gap-4">
          <Link href="/enroll" className="rounded-md bg-white px-6 py-3 font-medium text-[color:var(--brand-primary)]">
            এখনই ভর্তি হন
          </Link>
          <Link href="/courses" className="rounded-md border border-white px-6 py-3 font-medium">
            কোর্স দেখুন
          </Link>
        </div>
      </section>
    </>
  );
}
