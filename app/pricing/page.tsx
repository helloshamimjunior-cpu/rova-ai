import Link from "next/link"

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "৳3,000",
    features: [
      "শুরু করার জন্য কনটেন্ট",
      "ভিডিও লেকচার",
      "বেসিক কুইজ",
    ],
  },
  {
    id: "intermediate",
    name: "Intermediate",
    price: "৳6,000",
    features: [
      "প্রজেক্ট ভিত্তিক কাজ",
      "কমিউনিটি সাপোর্ট",
      "অ্যাসাইনমেন্ট ফিডব্যাক",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    price: "৳12,000",
    features: [
      "সব Intermediate সুবিধা",
      "লাইভ 1:1 সাপোর্ট",
      "পোর্টফোলিও রিভিউ",
    ],
  },
]

export default function PricingPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-12">কোর্স প্ল্যান</h1>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition p-6 flex flex-col"
          >
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-2xl font-bold mb-4">{plan.price}</p>

            <ul className="mb-6 space-y-2 text-gray-700 text-sm flex-1">
              {plan.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>

            <Link
              href={`/enroll?product=${plan.id}`}
              className="block text-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 hover:opacity-90 transition"
            >
              এনরোল করো
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
