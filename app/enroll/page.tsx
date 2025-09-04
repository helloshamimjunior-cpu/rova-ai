// app/enroll/page.tsx
"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const COURSES = {
  basic:        { id: "basic",        title: "Basic",        price: 3000, hue: "blue" },
  intermediate: { id: "intermediate", title: "Intermediate", price: 6000, hue: "green" },
  advanced:     { id: "advanced",     title: "Advanced",     price: 12000, hue: "purple" },
  micro:        { id: "micro",        title: "Micro",        price: 700,  hue: "pink" }, // 500–800 ⇒ mid
} as const;

type CourseId = keyof typeof COURSES;

const SINGLE_COUPONS: Record<
  string,
  { type: "percent" | "flat"; value: number; label: string }
> = {
  SINGLE10: { type: "percent", value: 10, label: "10% off (single course)" },
  BASIC5:   { type: "percent", value: 5,  label: "Basic 5% off" },
  OFF500:   { type: "flat",    value: 500, label: "৳500 off (single course)" },
};

export default function EnrollPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-12">Loading…</div>}>
      <EnrollInner />
    </Suspense>
  );
}

function EnrollInner() {
  const sp = useSearchParams();
  const router = useRouter();

  // URL → initial selection
  const initialSelected: CourseId[] = (() => {
    const raw = (sp.get("product") || "basic").toLowerCase().trim();
    const allAlias = ["all", "all-courses", "bundle"].includes(raw);
    if (allAlias) return ["basic", "intermediate", "advanced"];
    const parts = raw.split(",").map((x) => x.trim()).filter(Boolean);
    const valid = parts.filter((p): p is CourseId => p in COURSES);
    return valid.length ? valid : (["basic"] as CourseId[]);
  })();

  const [selected, setSelected] = useState<CourseId[]>(initialSelected);
  const isSelected = (id: CourseId) => selected.includes(id);
  const toggle = (id: CourseId) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const coreSet = ["basic", "intermediate", "advanced"] as const;
  const isAllCoreSelected = coreSet.every((c) => selected.includes(c));

  // subtotal
  const subtotal = useMemo(
    () => selected.reduce((sum, id) => sum + COURSES[id].price, 0),
    [selected]
  );

  // ── Coupon (single course only) ───────────────────────────
  // ✅ অটো-অ্যাপ্লাই নেই, URL থেকে কুপন পড়া হচ্ছে না
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const isSingle = selected.length === 1;

  // discounts
  const bundleRate = isAllCoreSelected ? 0.20 : 0;
  const bundleDiscount = Math.round(subtotal * bundleRate);

  const couponMeta = isSingle && appliedCoupon ? SINGLE_COUPONS[appliedCoupon] : undefined;
  const couponDiscount = couponMeta
    ? couponMeta.type === "percent"
      ? Math.round(subtotal * (couponMeta.value / 100))
      : Math.round(couponMeta.value)
    : 0;

  // rule: all-core bundle থাকলে কুপন নয়; single হলে কুপন
  const discountToApply = bundleRate > 0 ? bundleDiscount : couponDiscount;
  const discountLabel =
    bundleRate > 0
      ? `All courses bundle ${Math.round(bundleRate * 100)}%`
      : couponMeta
      ? `Coupon (${couponMeta.label})`
      : null;

  const total = Math.max(0, subtotal - discountToApply);

  function applyCoupon() {
    if (!isSingle) {
      setCouponError("কুপন শুধুমাত্র single course-এর জন্য প্রযোজ্য।");
      return;
    }
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError("কুপন কোড লিখুন");
      return;
    }
    if (SINGLE_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError(null);
    } else {
      setAppliedCoupon(null);
      setCouponError("ইনভ্যালিড কুপন");
    }
  }
  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponError(null);
    setCouponInput("");
  }

  function selectAllCore() {
    setSelected((cur) => Array.from(new Set([...cur, ...coreSet])) as CourseId[]);
  }
  function clearAll() {
    setSelected(["basic"]);
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError(null);
  }

  function proceedToPay() {
    const params = new URLSearchParams();
    params.set("product", selected.join(","));
    params.set("amount", String(total));
    if (isSingle && appliedCoupon) params.set("coupon", appliedCoupon); // only when applied
    if (isAllCoreSelected) params.set("bundle", "1");
    router.push(`/enroll?${params.toString()}&confirm=1`);
  }

  // ───────────────── UI ─────────────────
  return (
    <section className="relative overflow-hidden">
      {/* soft gradient bg */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_10%_10%,rgba(37,99,235,0.12),transparent),radial-gradient(50%_60%_at_90%_20%,rgba(147,51,234,0.10),transparent),linear-gradient(to_bottom,#f8fafc,white)] dark:bg-[radial-gradient(60%_70%_at_10%_10%,rgba(37,99,235,0.10),transparent),radial-gradient(50%_60%_at_90%_20%,rgba(147,51,234,0.10),transparent),linear-gradient(to_bottom,#0a0a0a,#0f0f10)]" />
      {/* glow blobs */}
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-500/10" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl dark:bg-fuchsia-500/10" />

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Enroll
            </span>
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
            নিচ থেকে কোর্সগুলো সিলেক্ট করো। Basic + Intermediate + Advanced একসাথে নিলে <b>20% off</b> অটো।
            Single course নিলে কুপন ব্যবহার করতে পারো।
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            {!isAllCoreSelected ? (
              <button
                onClick={selectAllCore}
                className="rounded-xl border border-emerald-500/70 bg-white/70 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur hover:bg-emerald-600 hover:text-white dark:bg-neutral-900/40"
              >
                Select all core (20% off)
              </button>
            ) : (
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/30 dark:text-emerald-200">
                All core selected (20% off)
              </span>
            )}
            <button
              onClick={clearAll}
              className="rounded-xl border border-neutral-200 bg-white/70 px-4 py-2 text-sm text-neutral-700 shadow-sm backdrop-blur hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/40"
            >
              Reset
            </button>
          </div>
        </header>

        {/* selector cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(COURSES) as CourseId[]).map((id) => {
            const course = COURSES[id];
            const active = isSelected(id);

            const hueClass =
              course.hue === "blue"
                ? "from-blue-50 to-blue-100/60 dark:from-blue-950/40 dark:to-blue-900/20"
                : course.hue === "green"
                ? "from-emerald-50 to-emerald-100/60 dark:from-emerald-950/40 dark:to-emerald-900/20"
                : course.hue === "purple"
                ? "from-violet-50 to-violet-100/60 dark:from-violet-950/40 dark:to-violet-900/20"
                : "from-pink-50 to-pink-100/60 dark:from-pink-950/40 dark:to-pink-900/20";

            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                className={[
                  "rounded-2xl border p-5 text-left transition-all",
                  "bg-gradient-to-br", hueClass,
                  "border-neutral-200/70 dark:border-neutral-800/60",
                  "shadow-sm hover:shadow-md backdrop-blur",
                  active ? "ring-2 ring-indigo-500/60 scale-[1.01]" : "ring-1 ring-neutral-900/5",
                ].join(" ")}
                aria-pressed={active}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
                      ৳{course.price.toLocaleString()}
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
                {id === "micro" && (
                  <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                    Short, topic-based mini course
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* summary + coupon */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* summary */}
          <div className="rounded-2xl border border-neutral-200/70 bg-white/70 p-6 shadow-sm ring-1 ring-neutral-900/5 backdrop-blur dark:border-neutral-800/60 dark:bg-neutral-900/40 dark:ring-white/10 lg:col-span-2">
            <h2 className="text-base font-semibold mb-3">Selected</h2>
            <ul className="divide-y divide-neutral-200/70 dark:divide-neutral-800/60">
              {selected.map((id) => (
                <li key={id} className="flex items-center justify-between py-3">
                  <span className="font-medium">{COURSES[id].title}</span>
                  <span>৳{COURSES[id].price.toLocaleString()}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>

              {discountToApply > 0 && discountLabel && (
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                  <span>{discountLabel}</span>
                  <span>-৳{discountToApply.toLocaleString()}</span>
                </div>
              )}

              <div className="flex items-center justify-between border-t pt-3 font-semibold">
                <span>Total</span>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ৳{total.toLocaleString()}
                </span>
              </div>

            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={proceedToPay}
                className="inline-flex items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
              >
                Proceed to pay
              </button>
              {!isAllCoreSelected && (
                <Link
                  href="/enroll?product=all"
                  className="text-sm text-neutral-700 hover:underline dark:text-neutral-300"
                  title="All courses নিতে চাইলে 20% off পাবেন"
                >
                  All courses নিন (20% off)
                </Link>
              )}
            </div>
          </div>

          {/* coupon (single only) */}
          {isSingle && (
            <div className="rounded-2xl border border-neutral-200/70 bg-white/70 p-6 shadow-sm ring-1 ring-neutral-900/5 backdrop-blur dark:border-neutral-800/60 dark:bg-neutral-900/40 dark:ring-white/10">
              <h3 className="text-sm font-semibold">Coupon (single course only)</h3>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="কুপন কোড"
                  autoComplete="off"
                  inputMode="text"
                  className="flex-1 rounded-lg border border-neutral-300/70 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-neutral-700 dark:bg-neutral-900"
                />
                {!appliedCoupon ? (
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
              {appliedCoupon && (
                <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/30 dark:text-emerald-200">
                  Applied: {SINGLE_COUPONS[appliedCoupon].label}
                </p>
              )}
              {couponError && <p className="mt-2 text-xs text-red-600">{couponError}</p>}
              <p className="mt-2 text-xs text-neutral-500">
                নোট: সব কোর একসাথে নিলে 20% bundle অটো—কুপন প্রযোজ্য নয়।
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
