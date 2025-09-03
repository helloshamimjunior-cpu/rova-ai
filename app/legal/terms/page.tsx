export const metadata = { title: "Terms of Service — Rova AI Academy" };

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold mb-4">Terms of Service</h1>
      <p className="text-gray-700 mb-6">
        আমাদের সাইট/কোর্স ব্যবহার করলে আপনি নিচের শর্তসমূহে সম্মত হচ্ছেন।
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">অ্যাকাউন্ট</h2>
      <p className="text-gray-700">অ্যাকাউন্ট তথ্য সঠিক রাখা ও নিরাপদ রাখা আপনার দায়িত্ব।</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">কনটেন্ট লাইসেন্স</h2>
      <p className="text-gray-700">কোর্স কনটেন্ট শুধু ব্যক্তিগত শিক্ষার জন্য; অনুমতি ছাড়া পাবলিক শেয়ার/রিসেল নয়।</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">পেমেন্ট ও রিফান্ড</h2>
      <p className="text-gray-700">
        প্রাইসিং/বিলিং আমাদের পেজে উল্লেখিত; রিফান্ড নীতিমালা আলাদা পেজে আছে।
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">ব্যান/সাসপেনশন</h2>
      <p className="text-gray-700">অবৈধ/অপব্যবহার/চিটিং—সন্দেহে আমরা এক্সেস সীমাবদ্ধ করতে পারি।</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">দায়বদ্ধতার সীমা</h2>
      <p className="text-gray-700">আইনসম্মত সীমার মধ্যে আমাদের দায় সীমিত।</p>

      <p className="text-sm text-gray-500 mt-8">শেষ আপডেট: {new Date().toLocaleDateString()}</p>
    </main>
  );
}
