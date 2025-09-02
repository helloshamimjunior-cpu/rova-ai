type Props = { searchParams: { lang?: "bn" | "en" } };

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

export default function Page({ searchParams }: Props) {
  const lang = (searchParams.lang === "en" ? "en" : "bn") as "bn" | "en";
  const t = dict[lang];

  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold mb-6">
        {t.titleA} <span className="text-blue-600">{t.titleB}</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8">{t.sub}</p>
      <div className="flex justify-center gap-4">
        <a href="/enroll" className="rounded-md px-6 py-3 text-white font-medium" style={{background:"#2D6EEA"}}>
          {t.primary}
        </a>
        <a href="/courses" className="rounded-md px-6 py-3 border font-medium">
          {t.secondary}
        </a>
      </div>
      <div className="mt-8 text-sm text-gray-500">{t.badges}</div>
    </section>
  );
}
