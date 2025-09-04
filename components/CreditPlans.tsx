// components/CreditPlans.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Gift, CalendarClock, CreditCard } from "lucide-react";

type PackId = "pack_5" | "pack_20" | "pack_50" | "pack_100" | "pack_500" | "pack_1000";

async function checkout(packId: PackId) {
  // চেষ্টা করি /api/checkout → না থাকলে /credits?pack=...
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packId }),
    });
    if (res.ok) {
      const { url } = await res.json();
      if (url) {
        window.location.href = url;
        return;
      }
    }
  } catch {}
  window.location.href = `/credits?pack=${packId}`;
}

function Bullet({
  children,
  color = "text-neutral-700",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${color}`} />
      <span className="text-sm text-neutral-700">{children}</span>
    </li>
  );
}

export default function CreditPlans() {
  const [loading, setLoading] = useState<PackId | null>(null);

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-center mb-6">ক্রেডিট প্ল্যান</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Free */}
        <div className="rounded-2xl border border-blue-200/60 bg-gradient-to-b from-blue-50/70 to-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-700">ফ্রি ৫ ক্রেডিট</h3>
          </div>
          <p className="mt-1 text-sm text-neutral-600">
            শুরুতেই বেসিক কনটেন্ট/টুলস অনলক।
          </p>

          <ul className="mt-4 space-y-2">
            <Bullet color="text-blue-600">Onboarding টাস্ক কমপ্লিট করলে ক্রেডিট</Bullet>
            <Bullet color="text-blue-600">বেসিক টেমপ্লেট ও স্যাম্পল প্রোজেক্ট</Bullet>
            <Bullet color="text-blue-600">১× সাপোর্ট থ্রেডে প্রশ্ন</Bullet>
          </ul>

          <Link
            href="/signup?bonus=5"
            className="mt-6 block w-full rounded-xl border border-blue-500 px-3 py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-500 hover:text-white transition-colors"
          >
            এখনই ক্লেইম করো
          </Link>
        </div>

        {/* Subscription */}
        <div className="rounded-2xl border border-amber-200/60 bg-gradient-to-b from-amber-50/70 to-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-amber-700" />
            <h3 className="text-lg font-semibold text-amber-700">সাবস্ক্রিপশন</h3>
          </div>
          <p className="mt-1 text-sm text-neutral-600">
            মাসিক ক্রেডিট + প্রিমিয়াম সাপোর্ট।
          </p>

          <ul className="mt-4 space-y-2">
            <Bullet color="text-amber-700">৳৭০০/মাসে ১৫ ক্রেডিট — Starter</Bullet>
            <Bullet color="text-amber-700">Premium ৳১,২০০/মাস — বেশি লিমিট</Bullet>
            <Bullet color="text-amber-700">Pro ৳২,০০০/মাস — টিম অ্যাক্সেস</Bullet>
          </ul>

          <Link
            href="/contact?topic=subscription"
            className="mt-6 block w-full rounded-xl border border-amber-600 px-3 py-2 text-center text-sm font-medium text-amber-700 hover:bg-amber-600 hover:text-white transition-colors"
          >
            সাবস্ক্রিপশন নাও
          </Link>

          <p className="mt-2 text-xs text-neutral-500">
            * Stripe/bKash সেটআপের পর অটো-বিলিং চালু হবে।
          </p>
        </div>

        {/* Extra Bundles */}
        <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-emerald-700" />
            <h3 className="text-lg font-semibold text-emerald-700">Extra Bundles</h3>
          </div>
          <p className="mt-1 text-sm text-neutral-600">
            ৫/২০/৫০ credits · Workshop/Portfolio Review
          </p>

          <ul className="mt-4 space-y-2">
            <Bullet color="text-emerald-700">Instant টপ-আপ (one-time)</Bullet>
            <Bullet color="text-emerald-700">ওয়ার্কশপ/রিভিউ স্লটে প্রায়োরিটি</Bullet>
            <Bullet color="text-emerald-700">রিসিট/ইনভয়েস ইমেইলে</Bullet>
          </ul>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {[
              { id: "pack_5" as PackId, label: "+5" },
              { id: "pack_20" as PackId, label: "+20" },
              { id: "pack_50" as PackId, label: "+50" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={async () => {
                  setLoading(p.id);
                  await checkout(p.id);
                  setLoading(null);
                }}
                disabled={loading === p.id}
                className="rounded-xl border border-emerald-600 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors disabled:opacity-60"
              >
                {loading === p.id ? "…" : p.label}
              </button>
            ))}
          </div>

          <p className="mt-3 text-xs text-neutral-500">
            Test card: 4242 4242 4242 4242 · future date · any CVC.
          </p>
        </div>
      </div>
    </section>
  );
}
