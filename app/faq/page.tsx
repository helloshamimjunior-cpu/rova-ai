/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type QA = { q: string; a: string };

const sections: { title: string; items: QA[] }[] = [
  {
    title: "পেমেন্ট",
    items: [
      { q: "কিভাবে পেমেন্ট করবো?", a: "Bkash/Nagad/SSLCommerz—সবই সাপোর্টেড। পেমেন্ট পেজে নির্দেশনা থাকবে।" },
      { q: "ইনভয়েস/রিসিট পাবো?", a: "হ্যাঁ, পেমেন্ট সফল হলে ইমেইলে অটো ইনভয়েস যায়। ড্যাশবোর্ড থেকেও ডাউনলোড করা যাবে।" },
      { q: "ইএমআই/ইন্সটলমেন্ট?", a: "এখন না। পরে কার্ড/গেটওয়ে সাপোর্ট এলে অ্যাড করা হবে।" },
    ],
  },
  {
    title: "অ্যাক্সেস ও কনটেন্ট",
    items: [
      { q: "অ্যাক্সেস কতদিন?", a: "লাইফটাইম অ্যাক্সেস + ফ্রি আপডেট।" },
      { q: "কনটেন্ট ফরম্যাট?", a: "ভিডিও, নোটস, টেমপ্লেট, প্রজেক্ট ফাইল, কুইজ—সব একসাথে।" },
      { q: "ল্যাঙ্গুয়েজ?", a: "মূল কনটেন্ট বাংলায়; কিছু রিসোর্স ইংরেজি হতে পারে।" },
    ],
  },
  {
    title: "কোর্স স্ট্রাকচার",
    items: [
      { q: "লেভেল কী কী?", a: "Basic, Intermediate, Advanced, Micro-course (টপিক বেসড)।" },
      { q: "প্রজেক্ট থাকবে?", a: "হ্যাঁ, Content Bot, CRM Workflow, SOP Walkthrough ইত্যাদি।" },
      { q: "সিলেবাস দেখবো কোথায়?", a: "হোমপেজের “সিলেবাস দেখুন” বা /courses পেজে।" },
    ],
  },
  {
    title: "সাপোর্ট",
    items: [
      { q: "১ঃ১ সাপোর্ট?", a: "ড্যাশবোর্ড থেকে স্লট বুকিং। লিমিট ক্রেডিট সিস্টেমে দেখা যাবে।" },
      { q: "কমিউনিটি আছে?", a: "হ্যাঁ, /community থেকে জয়েন করা যাবে (Discord/FB গ্রুপ)।" },
      { q: "লাইভ সেশন রেকর্ডিং?", a: "রেকর্ডিং ও রিসোর্স ক্লাসের পর আপলোড করা হয়।" },
    ],
  },
  {
    title: "এনরোল/লগইন",
    items: [
      { q: "কিভাবে ভর্তি হবো?", a: "হোমপেজে “এখনই ভর্তি হন” → /enroll এ গিয়ে প্ল্যান সিলেক্ট করে পেমেন্ট।" },
      { q: "লগইন/সাইনআপ?", a: "/login ও /signup থেকে। ইমেইল + পাসওয়ার্ড, পরে OTP/Magic Link আসতে পারে।" },
      { q: "পাসওয়ার্ড ভুলে গেলে?", a: "Forgot-password থেকে রিসেট লিংক নিন।" },
    ],
  },
  {
    title: "রিফান্ড/পলিসি",
    items: [
      { q: "রিফান্ড পলিসি?", a: "কোর্সে উল্লেখিত শর্ত অনুযায়ী। বিস্তারিত /legal/refund এ।" },
      { q: "টার্মস/প্রাইভেসি?", a: "সব দেখুন /legal/terms ও /legal/privacy এ।" },
    ],
  },
  {
    title: "টেকনিক্যাল",
    items: [
      { q: "ডিভাইস/সফটওয়্যার রিকোয়ারমেন্ট?", a: "কমপক্ষে i3/Ryzen3, 8GB RAM, আপডেটেড ব্রাউজার। n8n/Zapier/API টেস্টের জন্য ইন্টারনেট স্টেবল থাকা দরকার।" },
      { q: "সার্টিফিকেট?", a: "কোর্স/প্রজেক্ট সম্পন্ন করলে ই-সার্টিফিকেট ইস্যু করা হবে।" },
    ],
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-center mb-3">FAQ</h1>
      <p className="text-center text-sm text-gray-600 mb-10">
        সাধারণ প্রশ্নোত্তর—আরো সাহায্য দরকার? <Link href="/contact" className="underline">যোগাযোগ করুন</Link>.
      </p>

      <div className="space-y-8">
        {sections.map((sec, si) => (
          <section key={si}>
            <h2 className="text-lg font-semibold mb-3">{sec.title}</h2>
            <div className="divide-y rounded-xl border bg-white">
              {sec.items.map((item, i) => (
                <details key={i} className="p-5 group open:bg-neutral-50">
                  <summary className="cursor-pointer font-medium list-none flex items-center justify-between">
                    <span>{item.q}</span>
                    <span className="text-sm text-gray-500 group-open:hidden">+</span>
                    <span className="text-sm text-gray-500 hidden group-open:inline">−</span>
                  </summary>
                  <p className="text-sm text-gray-600 mt-2">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="text-center mt-10">
        <a
          href="/enroll"
          className="inline-block rounded-md px-5 py-2 text-white"
          style={{ background: "var(--brand-primary)" }}
        >
          এখনই ভর্তি হন
        </a>
      </div>
    </div>
  );
}
