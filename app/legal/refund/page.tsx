export const metadata = { title: "Refund Policy — Rova AI Academy" };

export default function RefundPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold mb-4">Refund Policy</h1>
      <p className="text-gray-700 mb-6">
        আপনার সন্তুষ্টি গুরুত্বপূর্ণ। নিচে রিফান্ড শর্তাবলি দেওয়া হলো।
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">সময়সীমা</h2>
      <p className="text-gray-700">কোর্স এনরোলমেন্টের পর ৭ দিনের মধ্যে রিফান্ড রিকোয়েস্ট করতে পারবেন।</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">যোগ্যতা</h2>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        <li>কোর্স কনটেন্ট ২০% এর কম সম্পন্ন করা</li>
        <li>অ্যাবিউজ/শেয়ারিং প্রমাণ পাওয়া গেলে রিফান্ড যোগ্য নয়</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">প্রসেস</h2>
      <p className="text-gray-700">
        `/contact` পেজে টিকিট করুন—অর্ডার আইডি, পেমেন্ট মেথড, কারণ লিখুন। ৫–৭ কর্মদিবসের মধ্যে প্রসেস হবে।
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">এক্সসেপশন</h2>
      <p className="text-gray-700">ওয়ার্কশপ/এক্সট্রা বান্ডেল—ইভেন্ট শুরু হলে রিফান্ড নয়।</p>

      <p className="text-sm text-gray-500 mt-8">শেষ আপডেট: {new Date().toLocaleDateString()}</p>
    </main>
  );
}
