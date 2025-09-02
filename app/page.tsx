export default function Page() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold mb-6">
        ৪ মাসে শূন্য থেকে <span className="text-blue-600">AI Automation Specialist</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        AI Agent, Automation ও Freelancing স্কিল শিখে ক্যারিয়ার গড়ুন — বাংলায়, হাতে-কলমে।
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="/enroll"
          className="rounded-md px-6 py-3 text-white font-medium"
          style={{ background: "#2D6EEA" }}
        >
          এখনই ভর্তি হন
        </a>
        <a
          href="/courses"
          className="rounded-md px-6 py-3 border font-medium"
        >
          সিলেবাস দেখুন
        </a>
      </div>
      <div className="mt-8 text-sm text-gray-500">
        লাইভ ১ঃ১ সাপোর্ট · ফ্রি ৫ ক্রেডিট · প্র্যাকটিক্যাল প্রজেক্ট · জব সাপোর্ট
      </div>
    </section>
  );
}
