"use client";
import Link from "next/link";
import { useState } from "react";

/** ─────────────────────────────────────
 *  Course Plans (static)
 *  ────────────────────────────────────*/
const COURSE_PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: "৳3,000",
    features: ["শুরু করার জন্য কনটেন্ট", "ভিডিও লেকচার", "বেসিক কুইজ"],
  },
  {
    id: "intermediate",
    name: "Intermediate",
    price: "৳6,000",
    features: ["প্রজেক্ট ভিত্তিক কাজ", "কমিউনিটি সাপোর্ট", "অ্যাসাইনমেন্ট ফিডব্যাক"],
  },
  {
    id: "advanced",
    name: "Advanced",
    price: "৳12,000",
    features: ["সব Intermediate সুবিধা", "লাইভ 1:1 সাপোর্ট", "পোর্টফোলিও রিভিউ"],
  },
] as const;

/** ─────────────────────────────────────
 *  Credit Packs (top-up)
 *  ────────────────────────────────────*/
type Pack = { id: string; credits: number; priceLabel: string; best?: boolean };
const CREDIT_PACKS: Pack[] = [
  { id: "pack_100", credits: 100, priceLabel: "$5 (~৳600)" },
  { id: "pack_500", credits: 500, priceLabel: "$20 (~৳2400)", best: true },
  { id: "pack_1000", credits: 1000, priceLabel: "$35 (~৳4200)" },
];

export default function PricingPage() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function buyCredit(pack: Pack) {
    try {
      setLoadingId(pack.id);
      // চেষ্টা করি API checkout; না হলে /credits?pack=… এ পাঠাই
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId: pack.id }),
      });
      if (res.ok) {
        const { url } = await res.json();
        if (url) {
          window.location.href = url;
          return;
        }
      }
      window.location.href = `/credits?pack=${pack.id}`;
    } catch {
      window.location.href = `/credits?pack=${pack.id}`;
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      {/* ────────────────────── */}
      {/* কোর্স প্ল্যান           */}
      {/* ────────────────────── */}
      <h1 className="text-3xl font-bold text-center mb-12">কোর্স প্ল্যান</h1>

      <div className="grid gap-8 md:grid-cols-3">
        {COURSE_PLANS.map((plan) => (
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

      {/* ────────────────────── */}
      {/* ক্রেডিট প্ল্যান        */}
      {/* ────────────────────── */}
      <h2 className="text-2xl font-semibold mt-16 mb-6 text-center">ক্রেডিট প্ল্যান</h2>

      <div className="grid gap-8 md:grid-cols-3">
        {CREDIT_PACKS.map((p) => (
          <div
            key={p.id}
            className={[
              "rounded-2xl border bg-white shadow-sm hover:shadow-md transition p-6",
              p.best ? "ring-2 ring-[var(--brand-primary)]" : "",
            ].join(" ")}
          >
            {p.best && (
              <div className="mb-3 inline-flex items-center rounded-md border border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-2 py-1 text-xs font-medium text-[var(--brand-primary)]">
                Best Value
              </div>
            )}

            <h3 className="text-xl font-semibold">+{p.credits} Credits</h3>
            <p className="mt-1 text-neutral-600 text-sm">One-time top-up</p>
            <div className="mt-4 text-2xl font-bold">{p.priceLabel}</div>

            <button
              onClick={() => buyCredit(p)}
              disabled={loadingId === p.id}
              className="mt-5 w-full rounded-xl border border-[var(--brand-primary)] px-3 py-2 text-sm font-medium text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white transition-colors disabled:opacity-60"
            >
              {loadingId === p.id ? "Redirecting…" : "Buy credits"}
            </button>

            <p className="mt-3 text-xs text-neutral-500">
              টেস্ট মোডে Stripe ব্যবহার হয়। ডেমো কার্ড: 4242 4242 4242 4242, যেকোন ভবিষ্যৎ তারিখ, যেকোন CVC।
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
