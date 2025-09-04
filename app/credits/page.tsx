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
  { id: "starter", title: "Starter", credits: 15, price: 750 },
  { id: "plus", title: "Plus", credits: 60, price: 3000, badge: "Popular" },
  { id: "pro", title: "Pro", credits: 120, price: 6000, badge: "Best value" },
];

// 🎟️ কুপন তালিকা
const COUPONS = {
  OFF5: { type: "percent", value: 5, label: "5% off" },
  OFF10: { type: "percent", value: 10, label: "10% off" },
  BDT200: { type: "flat", value: 200, label: "৳200 off" },
  STUDENT15: { type: "percent", value: 15, label: "Student 15% (demo)" },
} as const;

type CouponKey = keyof typeof COUPONS;

export default function BuyCreditsPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<Pack["id"]>("plus");
  const [custom, setCustom] = useState<number | "">("");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCode, setAppliedCode] = useState<CouponKey | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const selectedPack = useMemo(
    () => PACKS.find((p) => p.id === selectedId)!,
    [selectedId]
  );

  // ক্রেডিট সংখ্যা
  const qty = Math.max(1, Math.floor(Number(custom || selectedPack.credits)));

  // ইউনিট রেট (৳/ক্রেডিট) – প্যাক থেকে ডেরাইভ
  const unitBDT = Math.max(1, Math.round(selectedPack.price / selectedPack.credits)) || 50;

  // সাবটোটাল
  const undiscounted = qty * unitBDT;

  // ── ডিসকাউন্টস ───────────────────────────────────────
  // 1) Bulk
  const bulkRate = qty >= 1000 ? 0.10 : qty >= 300 ? 0.05 : 0;
  const bulkDiscount = Math.round(undiscounted * bulkRate);

  // 2) Coupon
  const coupon = appliedCode ? COUPONS[appliedCode] : null;
  const couponDiscount = coupon
    ? coupon.type === "percent"
      ? Math.round(undiscounted * (coupon.value / 100))
      : Math.round(coupon.value)
    : 0;

  // 3) Pack promo (Plus=5%, Pro=10%)
  const packPromoRate = selectedId === "pro" ? 0.10 : selectedId === "plus" ? 0.05 : 0;
  const packPromoDiscount = Math.round(undiscounted * packPromoRate);

  // ✅ সেরা (max) ডিসকাউন্টই কেবল প্রযোজ্য
  const bestDiscount = Math.min(
    Math.max(bulkDiscount, couponDiscount, packPromoDiscount),
    undiscounted
  );

  let discountSource: string | null = null;
  if (bestDiscount > 0) {
    if (bestDiscount === packPromoDiscount && packPromoRate > 0) {
      discountSource = `Pack promo ${Math.round(packPromoRate * 100)}%`;
    } else if (bestDiscount === couponDiscount && coupon) {
      discountSource = `Coupon (${coupon.label})`;
    } else if (bestDiscount === bulkDiscount && bulkRate > 0) {
      discountSource = `Bulk ${Math.round(bulkRate * 100)}%`;
    }
  }

  const total = Math.max(0, undiscounted - bestDiscount);

  // Coupon apply/remove
  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) return setCouponError("কুপন কোড লিখুন");
    if ((COUPONS as Record<string, unknown>)[code]) {
      setAppliedCode(code as CouponKey);
      setCouponError(null);
    } else {
      setAppliedCode(null);
      setCouponError("ইনভ্যালিড কুপন");
    }
  }
  function removeCoupon() {
    setAppliedCode(null);
    setCouponError(null);
    setCouponInput("");
  }

  // Checkout → enroll রুটে পাঠাই
  const handleCheckout = () => {
    const params = new URLSearchParams({
      product: "credits",
      qty: String(qty),
      amount: String(total),
    });
    if (appliedCode) params.set("coupon", appliedCode);
    if (packPromoRate > 0) params.set("promo", String(Math.round(packPromoRate * 100)));
    router.push(`/enroll?${params.toString()}`);
  };

  // প্যাকভিত্তিক কার্ড গ্রেডিয়েন্ট
  const packHue = (id: Pack["id"]) =>
    id === "starter"
      ? "from-sky-50 to-sky-100/60 dark:from-sky-950/40 dark:to-sky-900/20"
      : id === "plus"
      ? "from-indigo-50 to-indigo-100/60 dark:from-indigo-950/40 dark:to-indigo-900/20"
      : "from-violet-50 to-violet-100/60 dark:from-violet-950/40 dark:to-violet-900/20";

  return (
    <section className="relative overflow-hidden">
      {/* soft gradient bg (Enroll-এর মতো) */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_10%_10%,rgba(37,99,235,0.12),transparent),radial-gradient(50%_60%_at_90%_20%,rgba(147,51,234,0.10),transparent),linear-gradient(to_bottom,#f8fafc,white)] dark:bg-[radial-gradient(60%_70%_at_10%_10%,rgba(37,99,235,0.10),transparent),radial-gradient(50%_60%_at_90%_20%,rgba(147,51,234,0.10),transparent),linear-gradient(to_bottom,#0a0a0a,#0f0f10)]" />
      {/* glow blobs */}
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-500/10" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl dark:bg-fuchsia-500/10" />

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Buy Credits
            </span>
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
            প্যাক বেছে নিন বা কাস্টম ক্রেডিট দিন। Bulk (300+=5%, 1000+=10%), Coupon,
            আর Pack promo (Plus=5%, Pro=10%)—<b>যেটা বেশি ছাড় দেয়, সেটাই প্রযোজ্য</b>।
          </p>
        </header>

        {/* Packs */}
        <div className="grid gap-4 lg:grid-cols-3">
          {PACKS.map((p) => {
            const active = p.id === selectedId;
            const perUnit = Math.max(1, Math.round(p.price / p.credits));
            const promoHint = p.id === "pro" ? "Auto 10% off" : p.id === "plus" ? "Auto 5% off" : null;

            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={[
                  "relative w-full rounded-2xl border p-5 text-left transition-all",
                  "bg-gradient-to-br", packHue(p.id),
                  "border-neutral-200/70 dark:border-neutral-800/60",
                  "shadow-sm hover:shadow-md backdrop-blur",
                  active ? "ring-2 ring-indigo-500/60 scale-[1.01]" : "ring-1 ring-neutral-900/5",
                ].join(" ")}
                aria-pressed={active}
              >
                {p.badge && (
                  <span className="absolute right-3 top-3 rounded-full border border-indigo-200/60 bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-900/30 dark:text-indigo-200">
                    {p.badge}
                  </span>
                )}

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
                      {p.credits.toLocaleString()} credits
                    </p>
                  </div>
                  <span
                    className={[
                      "mt-1 h-5 w-5 rounded border text-xs",
                      active
                        ? "grid place-items-center border-indigo-500 bg-indigo-600 text-white"
                        : "border-neutral-300 bg-white/80 dark:bg-neutral-900/50",
                    ].join(" ")}
                    aria-hidden
                  >
                    {active ? "✓" : ""}
                  </span>
                </div>

                <p className="mt-4 text-2xl font-semibold">৳{p.price.toLocaleString()}</p>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">~৳{perUnit}/credit</p>

                {promoHint && (
                  <p className="mt-2 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/30 dark:text-emerald-200">
                    {promoHint}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* Custom + Coupon + Summary */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Custom credits */}
          <div className="rounded-2xl border border-neutral-200/70 bg-white/70 p-5 shadow-sm ring-1 ring-neutral-900/5 backdrop-blur-sm dark:border-neutral-800/60 dark:bg-neutral-900/50 dark:ring-white/10">
            <label className="block text-sm font-medium">কাস্টম ক্রেডিট (ঐচ্ছিক)</label>
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

            {/* Coupon */}
            <div className="mt-5">
              <label className="block text-sm font-medium">কুপন কোড</label>
              <div className="mt-2 flex gap-2">
                <input
              type="text"
              placeholder="কুপন কোড"
              autoComplete="off"
              spellCheck={false}
              inputMode="text"
              aria-label="Coupon code"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 rounded-lg border border-neutral-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-neutral-700 dark:bg-neutral-900"
                />
                {!appliedCode ? (
                  <button
                    onClick={applyCoupon}
                    className="rounded-lg border border-indigo-500/70 px-3 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white dark:border-indigo-400/60 dark:text-indigo-200 dark:hover:bg-indigo-500"
                  >
                    Apply
                  </button>
                ) : (
                  <button
                    onClick={removeCoupon}
                    className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  >
                    Remove
                  </button>
                )}
              </div>
              {appliedCode && (
                <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/30 dark:text-emerald-200">
                  Applied: {COUPONS[appliedCode].label}
                </p>
              )}
              {couponError && <p className="mt-2 text-xs text-red-600">{couponError}</p>}
              <p className="mt-2 text-xs text-neutral-500">
                নোট: Bulk/Coupon/Pack promo—<b>শুধু একটিই</b> প্রযোজ্য (যেটি বেশি ছাড় দেয়)।
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-neutral-200/70 bg-white/70 p-5 shadow-sm ring-1 ring-neutral-900/5 backdrop-blur-sm dark:border-neutral-800/60 dark:bg-neutral-900/50 dark:ring-white/10">
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

                {/* Discount lines */}
                <div className="space-y-2">
                  {bulkRate > 0 && (
                    <div
                      className={[
                        "flex items-center justify-between",
                        bestDiscount === bulkDiscount
                          ? "text-emerald-600"
                          : "text-neutral-400 line-through",
                      ].join(" ")}
                    >
                      <span>Bulk discount ({Math.round(bulkRate * 100)}%)</span>
                      <span>-৳{bulkDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  {appliedCode && (
                    <div
                      className={[
                        "flex items-center justify-between",
                        bestDiscount === couponDiscount
                          ? "text-emerald-600"
                          : "text-neutral-400 line-through",
                      ].join(" ")}
                    >
                      <span>Coupon {COUPONS[appliedCode].label}</span>
                      <span>-৳{couponDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  {packPromoRate > 0 && (
                    <div
                      className={[
                        "flex items-center justify-between",
                        bestDiscount === packPromoDiscount
                          ? "text-emerald-600"
                          : "text-neutral-400 line-through",
                      ].join(" ")}
                    >
                      <span>Pack promo ({Math.round(packPromoRate * 100)}%)</span>
                      <span>-৳{packPromoDiscount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t pt-3 font-semibold">
                  <span>
                    সর্বমোট{" "}
                    {discountSource ? (
                      <em className="not-italic text-xs text-neutral-500">
                        ({discountSource} applied)
                      </em>
                    ) : null}
                  </span>
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    ৳{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCheckout}
                  className="inline-flex items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
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
