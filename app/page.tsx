import { Briefcase, Users, Target, CreditCard, Settings, FileText, FolderOpen } from "lucide-react";
import Link from "next/link";
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
      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">
          {t.titleA}{" "}
          <span className="text-[color:var(--brand-primary)]">{t.titleB}</span>
        </h1>

        <p className="text-lg text-gray-600 mb-8">{t.sub}</p>

        <div className="flex justify-center gap-4">
          <Link
            href="/enroll"
            className="rounded-md px-6 py-3 text-white font-medium"
            style={{ background: "var(--brand-primary)" }}
          >
            {t.primary}
          </Link>
          <Link
            href="/courses"
            className="rounded-md px-6 py-3 border font-medium"
          >
            {t.secondary}
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">{t.badges}</div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <h2 className="text-center text-2xl font-semibold mb-10">
          ইতিমধ্যেই শত শত শিক্ষার্থী Rova AI Academy-তে যুক্ত
        </h2>

        <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
          <img
            src="https://dummyimage.com/140x60/ddd/000.png&text=Student+1"
            alt="Student Logo 1"
            className="mx-auto grayscale"
          />
          <img
            src="https://dummyimage.com/140x60/ddd/000.png&text=Student+2"
            alt="Student Logo 2"
            className="mx-auto grayscale"
          />
          <img
            src="https://dummyimage.com/140x60/ddd/000.png&text=Student+3"
            alt="Student Logo 3"
            className="mx-auto grayscale"
          />
          <img
            src="https://dummyimage.com/140x60/ddd/000.png&text=Student+4"
            alt="Student Logo 4"
            className="mx-auto grayscale"
          />
          <img
            src="https://dummyimage.com/140x60/ddd/000.png&text=Student+5"
            alt="Student Logo 5"
            className="mx-auto grayscale"
          />
        </div>
      </section>
{/* Why Rova AI */}
<section className="py-16">
  <h2 className="text-center text-2xl font-semibold mb-10">কেন Rova AI Academy?</h2>

  <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
        <Briefcase className="h-6 w-6 text-blue-600" /> হাতে-কলমে প্রজেক্ট
      </div>
      <p className="text-sm text-gray-600">Content Bot, CRM Workflow, SOP Walkthrough—রিয়াল প্রজেক্টে কাজ।</p>
    </div>

    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
        <Users className="h-6 w-6 text-blue-600" /> বাংলায় গাইড + ১ঃ১ সাপোর্ট
      </div>
      <p className="text-sm text-gray-600">লাইভ সেশনে প্রশ্ন সমাধান, রেকর্ডিং ও রিসোর্সসহ।</p>
    </div>

    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
        <Target className="h-6 w-6 text-blue-600" /> ফ্রিল্যান্স/জব ফোকাস
      </div>
      <p className="text-sm text-gray-600">ক্লায়েন্ট ওয়ার্কফ্লো ডিজাইন, প্রপোজাল, পোর্টফোলিও রিভিউ।</p>
    </div>

    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
        <CreditCard className="h-6 w-6 text-blue-600" /> ক্রেডিট সিস্টেম
      </div>
      <p className="text-sm text-gray-600">ফ্রি ৫ ক্রেডিট, সাবস্ক্রিপশন/বাণ্ডেলে সহজে আপগ্রেড।</p>
    </div>
  </div>
</section>
{/* Outcomes */}
<section className="py-16 bg-white">
  <h2 className="text-center text-2xl font-semibold mb-10">
    কোর্স শেষে তুমি যা করতে পারবে
  </h2>

  <div className="mx-auto max-w-6xl grid gap-4 sm:grid-cols-2">
    <div className="rounded-xl border bg-neutral-50 p-5">
      <div className="flex items-center gap-2 mb-1 font-semibold">
        <Settings className="h-5 w-5 text-blue-600" />
        AI Agent / Automation সেটআপ
      </div>
      <p className="text-sm text-gray-600">
        Zapier / n8n দিয়ে মাল্টি-স্টেপ অটোমেশন, ওয়েবহুক/ইন্টিগ্রেশন কনফিগার।
      </p>
    </div>

    <div className="rounded-xl border bg-neutral-50 p-5">
      <div className="flex items-center gap-2 mb-1 font-semibold">
        <FileText className="h-5 w-5 text-blue-600" />
        ক্লায়েন্টের জন্য ওয়ার্কফ্লো ডিজাইন
      </div>
      <p className="text-sm text-gray-600">
        রিকোয়ায়ারমেন্ট নিয়ে SOP বানানো, প্রপোজাল ও কস্টিং তৈরি।
      </p>
    </div>

    <div className="rounded-xl border bg-neutral-50 p-5">
      <div className="flex items-center gap-2 mb-1 font-semibold">
        <FolderOpen className="h-5 w-5 text-blue-600" />
        পোর্টফোলিও + কেস স্টাডি
      </div>
      <p className="text-sm text-gray-600">
        Content Bot, CRM Workflow, SOP Walkthrough—এসব দিয়ে প্রজেক্ট শোকেস।
      </p>
    </div>

    <div className="rounded-xl border bg-neutral-50 p-5">
      <div className="flex items-center gap-2 mb-1 font-semibold">
        <Briefcase className="h-5 w-5 text-blue-600" />
        ফ্রিল্যান্স/জব রেডিনেস
      </div>
      <p className="text-sm text-gray-600">
        গিগ/প্রপোজাল টেমপ্লেট, ইন্টারভিউ প্রস্তুতি, ১ঃ১ সাপোর্টে সমস্যা সমাধান।
      </p>
    </div>
  </div>

  {/* Quick skill badges */}
  <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm">
    <span className="px-3 py-1 rounded-full border">Prompt Engineering</span>
    <span className="px-3 py-1 rounded-full border">Zapier Multi-step</span>
    <span className="px-3 py-1 rounded-full border">n8n Workflows</span>
    <span className="px-3 py-1 rounded-full border">API/Webhooks</span>
    <span className="px-3 py-1 rounded-full border">Client Proposal</span>
    <span className="px-3 py-1 rounded-full border">Portfolio Case Study</span>
  </div>
</section>
{/* Course Levels */}
<section className="py-16">
  <h2 className="text-center text-2xl font-semibold mb-10">
    কোর্স লেভেল ও প্রাইসিং
  </h2>

  <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {/* Basic */}
    <div className="rounded-xl border bg-white p-6 text-center">
      <div className="text-lg font-semibold mb-2">Basic</div>
      <div className="text-2xl font-bold text-[color:var(--brand-primary)] mb-3">৳১,৫০০</div>
      <p className="text-sm text-gray-600 mb-4">Prompt Engineering, Zapier Basics</p>
      <a href="/courses/basic" className="px-4 py-2 rounded-md text-white text-sm font-medium" style={{background:"var(--brand-primary)"}}>
        ভর্তি হন
      </a>
    </div>

    {/* Intermediate */}
    <div className="rounded-xl border bg-white p-6 text-center">
      <div className="text-lg font-semibold mb-2">Intermediate</div>
      <div className="text-2xl font-bold text-[color:var(--brand-primary)] mb-3">৳২,৫০০</div>
      <p className="text-sm text-gray-600 mb-4">Zapier Multi-step, API Integrations</p>
      <a href="/courses/intermediate" className="px-4 py-2 rounded-md text-white text-sm font-medium" style={{background:"var(--brand-primary)"}}>
        ভর্তি হন
      </a>
    </div>

    {/* Advanced */}
    <div className="rounded-xl border bg-white p-6 text-center">
      <div className="text-lg font-semibold mb-2">Advanced</div>
      <div className="text-2xl font-bold text-[color:var(--brand-primary)] mb-3">৳৬,০০০</div>
      <p className="text-sm text-gray-600 mb-4">Client workflow design, AI Agents, Freelance setup</p>
      <a href="/courses/advanced" className="px-4 py-2 rounded-md text-white text-sm font-medium" style={{background:"var(--brand-primary)"}}>
        ভর্তি হন
      </a>
    </div>

    {/* Micro */}
    <div className="rounded-xl border bg-white p-6 text-center">
      <div className="text-lg font-semibold mb-2">Micro</div>
      <div className="text-2xl font-bold text-[color:var(--brand-primary)] mb-3">৳৫০০–৳৮০০</div>
      <p className="text-sm text-gray-600 mb-4">Topic-based mini courses</p>
      <a href="/courses/micro" className="px-4 py-2 rounded-md text-white text-sm font-medium" style={{background:"var(--brand-primary)"}}>
        ভর্তি হন
      </a>
    </div>
  </div>
</section>
{/* Curriculum Preview */}
<section className="py-16 bg-white">
  <h2 className="text-center text-2xl font-semibold mb-10">
    কারিকুলাম ঝলক
  </h2>

  <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2">
    {/* Basic */}
    <div className="rounded-xl border bg-neutral-50 p-6">
      <div className="text-lg font-semibold mb-2">Basic — ৳১,৫০০</div>
      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
        <li>Prompt Engineering (Foundations)</li>
        <li>Zapier Basics (Single-step)</li>
        <li>Mini Project: Content Helper</li>
      </ul>
    </div>

    {/* Intermediate */}
    <div className="rounded-xl border bg-neutral-50 p-6">
      <div className="text-lg font-semibold mb-2">Intermediate — ৳২,৫০০</div>
      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
        <li>Zapier Multi-step Workflow</li>
        <li>n8n পরিচিতি + Triggers</li>
        <li>API/Webhook Integrations</li>
        <li>Mini Project: Lead Capture → CRM</li>
      </ul>
    </div>

    {/* Advanced */}
    <div className="rounded-xl border bg-neutral-50 p-6">
      <div className="text-lg font-semibold mb-2">Advanced — ৳৬,০০০</div>
      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
        <li>Client Workflow Design (Discovery → SOP)</li>
        <li>AI Agents Basics (LangChain/Tools)</li>
        <li>Freelance Project Setup & Handover</li>
        <li>Case Study: CRM + Agent + Notifier</li>
      </ul>
    </div>

    {/* Micro */}
    <div className="rounded-xl border bg-neutral-50 p-6">
      <div className="text-lg font-semibold mb-2">Micro — ৳৫০০–৳৮০০</div>
      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
        <li>Topic-based Mini Courses</li>
        <li>Short Workshops (2–3 hrs)</li>
        <li>Practice Tasks + Checklists</li>
      </ul>
    </div>
  </div>

  {/* Support & credits */}
  <div className="mx-auto max-w-6xl mt-8 grid gap-4 md:grid-cols-3">
    <div className="rounded-xl border bg-white p-5">
      <div className="font-semibold mb-1">ফ্রি ৫ ক্রেডিট</div>
      <p className="text-sm text-gray-600">শুরুতেই বেসিক কনটেন্ট/টাস্ক আনলক।</p>
    </div>
    <div className="rounded-xl border bg-white p-5">
      <div className="font-semibold mb-1">সাবস্ক্রিপশন</div>
      <p className="text-sm text-gray-600">৳৭০০/মাসে ১৫ ক্রেডিট · Premium ৳১,২০০ · Pro ৳২,০০০</p>
    </div>
    <div className="rounded-xl border bg-white p-5">
      <div className="font-semibold mb-1">Extra Bundles</div>
      <p className="text-sm text-gray-600">৫/২০/৫০ credits · Workshop/Portfolio Review</p>
    </div>
  </div>
</section>
{/* Testimonials */}
<section className="py-16">
  <h2 className="text-center text-2xl font-semibold mb-10">
    শিক্ষার্থীদের অভিজ্ঞতা
  </h2>

  <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {/* Testimonial 1 */}
    <div className="rounded-xl border bg-white p-6">
      <p className="text-sm text-gray-700 mb-4">
        “Rova AI কোর্স করার পরেই প্রথম ফ্রিল্যান্স প্রজেক্ট পেলাম। হাতে-কলমে
        প্র্যাকটিস খুব হেল্প করেছে।”
      </p>
      <div className="flex items-center gap-3">
        <img src="https://dummyimage.com/40x40/ddd/000.png&text=U1" alt="User 1" className="rounded-full" />
        <div>
          <div className="font-semibold text-sm">সাদিয়া রহমান</div>
          <div className="text-xs text-gray-500">Freelancer</div>
        </div>
      </div>
    </div>

    {/* Testimonial 2 */}
    <div className="rounded-xl border bg-white p-6">
      <p className="text-sm text-gray-700 mb-4">
        “Dashboard আর মেন্টর সাপোর্টের কারণে শেখাটা অনেক সহজ লেগেছে।”
      </p>
      <div className="flex items-center gap-3">
        <img src="https://dummyimage.com/40x40/ddd/000.png&text=U2" alt="User 2" className="rounded-full" />
        <div>
          <div className="font-semibold text-sm">মাহিন ইসলাম</div>
          <div className="text-xs text-gray-500">Junior Automation Specialist</div>
        </div>
      </div>
    </div>

    {/* Testimonial 3 */}
    <div className="rounded-xl border bg-white p-6">
      <p className="text-sm text-gray-700 mb-4">
        “Portfolio Review আর প্র্যাকটিক্যাল প্রজেক্টে জব ইন্টারভিউ ক্লিয়ার করতে
        সাহায্য করেছে।”
      </p>
      <div className="flex items-center gap-3">
        <img src="https://dummyimage.com/40x40/ddd/000.png&text=U3" alt="User 3" className="rounded-full" />
        <div>
          <div className="font-semibold text-sm">তানভীর আহমেদ</div>
          <div className="text-xs text-gray-500">Automation Engineer</div>
        </div>
      </div>
    </div>
  </div>

  {/* CTA */}
  <div className="text-center mt-10">
    <a
      href="/reviews"
      className="px-6 py-3 rounded-md text-white font-medium"
      style={{ background: "var(--brand-primary)" }}
    >
      আরও শিক্ষার্থীর রিভিউ দেখুন
    </a>
  </div>
</section>
{/* FAQ Teaser */}
<section className="py-16 bg-white">
  <h2 className="text-center text-2xl font-semibold mb-10">
    সাধারণ প্রশ্নোত্তর
  </h2>

  <div className="mx-auto max-w-4xl divide-y rounded-xl border bg-neutral-50">
    <details className="p-5">
      <summary className="font-medium cursor-pointer">
        কিভাবে পেমেন্ট করবো?
      </summary>
      <p className="text-sm text-gray-600 mt-2">
        Bkash/Nagad/SSLCommerz এর মাধ্যমে নিরাপদ অনলাইন পেমেন্ট করা যাবে।
      </p>
    </details>

    <details className="p-5">
      <summary className="font-medium cursor-pointer">
        কোর্স কিনলে কতদিন অ্যাক্সেস থাকবে?
      </summary>
      <p className="text-sm text-gray-600 mt-2">
        প্রতিটি কোর্সে লাইফটাইম অ্যাক্সেস থাকবে, সাথে ফ্রি আপডেট।
      </p>
    </details>

    <details className="p-5">
      <summary className="font-medium cursor-pointer">
        ১ঃ১ সাপোর্ট সেশন কিভাবে বুক করবো?
      </summary>
      <p className="text-sm text-gray-600 mt-2">
        Dashboard থেকে সাপোর্ট সেশন স্লট সিলেক্ট করে সহজে বুক করা যাবে।
      </p>
    </details>
  </div>

  <div className="text-center mt-10">
    <a
      href="/faq"
      className="px-6 py-3 rounded-md text-white font-medium"
      style={{ background: "var(--brand-primary)" }}
    >
      সব FAQ দেখুন
    </a>
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
    <a
      href="/enroll"
      className="px-6 py-3 rounded-md bg-white text-[color:var(--brand-primary)] font-medium"
    >
      এখনই ভর্তি হন
    </a>
    <a
      href="/courses"
      className="px-6 py-3 rounded-md border border-white font-medium"
    >
      কোর্স দেখুন
    </a>
  </div>
</section>
    </>
  );
}
