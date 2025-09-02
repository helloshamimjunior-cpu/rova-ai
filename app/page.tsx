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
  <h2 className="text-center text-2xl font-semibold mb-10">
    কেন Rova AI Academy?
  </h2>

  <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {/* Card 1 */}
    <div className="rounded-xl border bg-white p-5">
      <div className="text-lg font-semibold mb-2">হাতে-কলমে প্রজেক্ট</div>
      <p className="text-sm text-gray-600">
        Content Bot, CRM Workflow, SOP Walkthrough—রিয়াল প্রজেক্টে কাজ।
      </p>
    </div>

    {/* Card 2 */}
    <div className="rounded-xl border bg-white p-5">
      <div className="text-lg font-semibold mb-2">বাংলায় গাইড + ১ঃ১ সাপোর্ট</div>
      <p className="text-sm text-gray-600">
        লাইভ সেশনে প্রশ্ন সমাধান, রেকর্ডিং ও রিসোর্সসহ।
      </p>
    </div>

    {/* Card 3 */}
    <div className="rounded-xl border bg-white p-5">
      <div className="text-lg font-semibold mb-2">ফ্রিল্যান্স/জব ফোকাস</div>
      <p className="text-sm text-gray-600">
        ক্লায়েন্ট ওয়ার্কফ্লো ডিজাইন, প্রপোজাল, পোর্টফোলিও রিভিউ।
      </p>
    </div>

    {/* Card 4 */}
    <div className="rounded-xl border bg-white p-5">
      <div className="text-lg font-semibold mb-2">ক্রেডিট সিস্টেম</div>
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
    <div className="rounded-xl border bg-neutral-50 p-5">
      <div className="font-semibold mb-1">AI Agent / Automation সেটআপ</div>
      <p className="text-sm text-gray-600">
        Zapier / n8n দিয়ে মাল্টি-স্টেপ অটোমেশন, ওয়েবহুক/ইন্টিগ্রেশন কনফিগার।
      </p>
    </div>

    <div className="rounded-xl border bg-neutral-50 p-5">
      <div className="font-semibold mb-1">ক্লায়েন্টের জন্য ওয়ার্কফ্লো ডিজাইন</div>
      <p className="text-sm text-gray-600">
        রিকোয়ায়ারমেন্ট নিয়ে SOP বানানো, প্রপোজাল ও কস্টিং তৈরি।
      </p>
    </div>

    <div className="rounded-xl border bg-neutral-50 p-5">
      <div className="font-semibold mb-1">পোর্টফোলিও + কেস স্টাডি</div>
      <p className="text-sm text-gray-600">
        Content Bot, CRM Workflow, SOP Walkthrough—এসব দিয়ে প্রজেক্ট শোকেস।
      </p>
    </div>

    <div className="rounded-xl border bg-neutral-50 p-5">
      <div className="font-semibold mb-1">ফ্রিল্যান্স/জব রেডিনেস</div>
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
    </>
  );
}
