// app/buy-credits/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Pack = {
  id: string;
  title: string;
  credits: number;
  price: number; // BDT
  badge?: string;
};

const PACKS: Pack[] = [
  { id: "starter", title: "Starter", credits: 100, price: 990 },
  { id: "plus", title: "Plus", credits: 300, price: 2790, badge: "Popular" },
  { id: "pro", title: "Pro", credits: 1000, price: 8900, badge: "Best value" },
];

export default function BuyCreditsPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<Pack["id"]>("plus");
  const [custom, setCustom] = useState<number | "">("");

  const selectedPack = useMemo(
    () => PACKS.find(p => p.id === selectedId)!,
    [selectedId]
  );

  const qty = typeof custom === "number" && custom > 0 ? custom : selectedPack.credits;

  // অনুমানভিত্তিক ডিসকাউন্ট: 300+=5%, 1000+=10% (চাইলে বদলে নেবেন)
  const baseUnit = 12; // প্রতি ক্রেডিট বেস মূল্য (BDT) – UI ক্যাল্কের জন্য
  const undiscounted = qty * baseUnit;
  const discountRate = qty >= 1000 ? 0.1 : qty >= 300 ? 0.05 : 0;
  const discount = Math.round(undiscounted * discountRate);
  const total = Math.max(0, undiscounted - discount);

  const handleCheckout = () => {
    // কোর্স এনরোলের মতোই এনরোল রুট ব্যবহার করছি
    router.push(`/enroll?product=credits&qty=${qty}&amount=${total}`);
  };

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Buy Credits</h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            যেকোনো প্যাক সিলেক্ট করুন বা কাস্টম ক্রেডিট লিখুন—চেকআউটে কোর্সের মতোই এগোবে।
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {PACKS.map((p) => {
            const active = p.id === selectedId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={[
                  "relative w-full rounded-2xl border p-5 text-left transition-all",
                  "bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm",
                  "border-neutral-200/70 dark:border-neutral-800/60",
                  "hover:shadow-md",
                  active ? "ring-2 ring-indigo-500/60" : "ring-1 ring-neutral-900/5",
                ].join(" ")}
              >
                {p.badge && (
                  <span className="absolute right-3 top-3 rounded-full border border-indigo-200/60 bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-900/30 dark:text-indigo-200">
                    {p.badge}
                  </span>
                )}
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                  {p.credits.toLocaleString()} credits
                </p>
                <p className="mt-4 text-2xl font-semibold">
                  ৳{p.price.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  ~৳{Math.round(p.price / p.credits)}/credit
                </p>
              </button>
            );
          })}
        </div>

        {/* Custom input + Summary */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200/70 bg-white/70 p-5 ring-1 ring-neutral-900/5 backdrop-blur-sm dark:border-neutral-800/60 dark:bg-neutral-900/50 dark:ring-white/10">
            <label className="block text-sm font-medium">
              কাস্টম ক্রেডিট (ঐচ্ছিক)
            </label>
            <input
              type="number"
              min={1}
              placeholder={selectedPack.credits.toString()}
              value={custom}
              onChange={(e) =>
                setCustom(e.target.value === "" ? "" : Math.max(1, Number(e.target.value)))
              }
              className="mt-2 w-full rounded-lg border border-neutral-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-neutral-700 dark:bg-neutral-900"
            />
            <p className="mt-2 text-xs text-neutral-500">
              ফাঁকা রাখলে নির্বাচিত প্যাকের {selectedPack.credits} ক্রেডিট ধরা হবে।
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-neutral-200/70 bg-white/70 p-5 ring-1 ring-neutral-900/5 backdrop-blur-sm dark:border-neutral-800/60 dark:bg-neutral-900/50 dark:ring-white/10">
              <h4 className="text-sm font-semibold">অর্ডার সামারি</h4>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>ক্রেডিট</span>
                  <span>{qty.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>সাবটোটাল</span>
                  <span>৳{undiscounted.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600">
                    <span>ডিসকাউন্ট ({Math.round(discountRate * 100)}%)</span>
                    <span>-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t pt-3 font-semibold">
                  <span>সর্বমোট</span>
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    ৳{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCheckout}
                  className="inline-flex items-center justify-center rounded-xl border border-blue-500/70 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white dark:border-blue-400/60 dark:text-blue-200 dark:hover:bg-blue-500"
                >
                  Proceed to pay
                </button>
                <span className="text-xs text-neutral-500">
                  সিকিউর পেমেন্ট • রিফান্ড পলিসি প্রযোজ্য
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
