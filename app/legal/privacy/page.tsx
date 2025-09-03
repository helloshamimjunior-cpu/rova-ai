export const metadata = { title: "Privacy Policy — Rova AI Academy" };

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-6">
        আমরা আপনার ডাটা সুরক্ষায় প্রতিশ্রুতিবদ্ধ। নিচে কীভাবে ডাটা সংগ্রহ/ব্যবহার/সংরক্ষণ করি তার সারাংশ দেওয়া হলো।
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">আমরা যা সংগ্রহ করি</h2>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        <li>নাম, ইমেইল, যোগাযোগের তথ্য</li>
        <li>সাইট ইউজেজ/অ্যানালিটিক্স (কুকিজ)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">ব্যবহার করি কেন</h2>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        <li>অ্যাকাউন্ট/সাবস্ক্রিপশন সার্ভিস চালাতে</li>
        <li>কোর্স/সাপোর্ট আপডেট পাঠাতে</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">শেয়ারিং</h2>
      <p className="text-gray-700">
        তৃতীয় পক্ষ (পেমেন্ট/ইমেইল ডেলিভারি/অ্যানালিটিক্স) — শুধু প্রয়োজন অনুযায়ী ও চুক্তির ভিত্তিতে।
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">ডাটা রিটেনশন</h2>
      <p className="text-gray-700">
        আইনগত/ব্যবসায়িক প্রয়োজন অনুযায়ী যুক্তিসঙ্গত সময় সংরক্ষণ; তারপর নিরাপদে মুছে ফেলা।
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">আপনার অধিকার</h2>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        <li>ডাটা এক্সেস/আপডেট/ডিলিট রিকোয়েস্ট</li>
        <li>মার্কেটিং ইমেইল থেকে অপ্ট-আউট</li>
      </ul>

      <p className="text-sm text-gray-500 mt-8">শেষ আপডেট: {new Date().toLocaleDateString()}</p>
    </main>
  );
}
