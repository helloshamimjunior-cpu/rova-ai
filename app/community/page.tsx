export default function CommunityPage() {
  return (
    <section className="py-16">
      <h1 className="text-3xl font-semibold text-center mb-3">Community</h1>
      <p className="text-center text-gray-600 mb-10">
        শিগগিরই লাইভ হবে—Discord/FB গ্রুপ, লাইভ সেশন, জব-লিডস।
      </p>

      <div className="mx-auto max-w-3xl grid gap-4 sm:grid-cols-2">
        <a
          href="#"
          className="rounded-xl border p-6 text-center hover:shadow transition bg-white"
        >
          <div className="text-lg font-medium mb-1">Discord</div>
          <div className="text-sm text-gray-600">চ্যাট, প্রশ্নোত্তর, স্টাডি রুম</div>
        </a>
        <a
          href="#"
          className="rounded-xl border p-6 text-center hover:shadow transition bg-white"
        >
          <div className="text-lg font-medium mb-1">Facebook Group</div>
          <div className="text-sm text-gray-600">আপডেট, হাইলাইটস, ইভেন্ট</div>
        </a>
      </div>

      <p className="text-center text-sm text-gray-500 mt-8">
        আপাতত—<a href="/faq" className="underline">FAQ</a> দেখুন বা <a href="/contact" className="underline">Contact</a> এ মেসেজ দিন।
      </p>
    </section>
  );
}
