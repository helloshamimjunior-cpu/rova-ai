// app/enroll/page.tsx
"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const COURSES = {
  basic:        { id: "basic",        title: "Basic",        price: 3000 },
  intermediate: { id: "intermediate", title: "Intermediate", price: 6000 },
  advanced:     { id: "advanced",     title: "Advanced",     price: 12000 },
  micro:        { id: "micro",        title: "Micro",        price: 700 }, // range 500–800 → mid 700
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
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );

  const coreSet = ["basic", "intermediate", "advanced"] as const;
  const isAllCoreSelected = coreSet.every((c) => selected.includes(c));

  // subtotal
  const subtotal = useMemo(
    () => selected.reduce((sum, id) => sum + COURSES[id].price, 0),
    [selected]
  );

  // coupon (single course only)
  const [couponInput, setCouponInput] = useState(sp.get("coupon") ?? "");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(
    sp.get("coupon") && SINGLE_COUPONS[sp.get("coupon")!.toUpperCase()]
      ? sp.get("coupon")!.toUpperCase()
      : null
  );
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
    // product param: সিলেক্টেড কোর্সগুলোর তালিকা
    const params = new URLSearchParams();
    params.set("product", selected.join(","));
    params.set("amount", String(total));
    if (appliedCoupon && isSingle) params.set("coupon", appliedCoupon);
    if (isAllCoreSelected) params.set("bundle", "1");
    router.push(`/enroll?${params.toString()}&confirm=1`);
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-center">Enroll</h1>
          <p className="mt-2 text-sm text-neutral-600 text-center">
            নিচ থেকে কোর্সগুলো সিলেক্ট করুন। Basic + Intermediate + Advanced একসাথে নিলে <b>20% off</b> অটো লাগবে।
            Single course নিলে কুপন ব্যবহার করতে পারবেন।
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            {!isAllCoreSelected ? (
              <button
                onClick={selectAllCore}
                className="rounded-lg border border-emerald-500/70 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-600 hover:text-white"
              >
                Select all core (20% off)
              </button>
            ) : (
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                All core selected (20% off)
              </span>
            )}
            <button
              onClick={clearAll}
              className="rounded-lg border px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100"
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
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                className={[
                  "rounded-2xl border p-5 text-left transition-all",
                  "bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm",
                  active
                    ? "border-indigo-500 ring-2 ring-indigo-500/50"
                    : "border-neutral-200 hover:shadow-md",
                ].join(" ")}
                aria-pressed={active}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="mt-1 text-sm text-neutral-600">
                      ৳{course.price.toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={[
                      "mt-1 h-5 w-5 rounded border",
                      active
                        ? "grid place-items-center border-indigo-500 bg-indigo-500 text-white"
                        : "border-neutral-300",
                    ].join(" ")}
                    aria-hidden
                  >
                    {active ? "✓" : ""}
                  </span>
                </div>
                {id === "micro" && (
                  <p className="mt-2 text-xs text-neutral-500">
                    Short, topic-based mini course
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* summary */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm lg:col-span-2">
            <h2 className="text-base font-semibold mb-3">Selected</h2>
            <ul className="divide-y">
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
                <div className="flex items-center justify-between text-emerald-600">
                  <span>{discountLabel}</span>
                  <span>-৳{discountToApply.toLocaleString()}</span>
                </div>
              )}

              <div className="flex items-center justify-between border-top pt-3 font-semibold">
                <span>Total</span>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ৳{total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* coupon (single only) */}
          {isSingle && (
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold">Coupon (single course only)</h3>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="SINGLE10, OFF500…"
                  className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                {!appliedCoupon ? (
                  <button
                    onClick={applyCoupon}
                    className="rounded-lg border border-indigo-500 px-3 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  >
                    Apply
                  </button>
                ) : (
                  <button onClick={removeCoupon} className="rounded-lg border px-3 py-2 text-sm">
                    Remove
                  </button>
                )}
              </div>
              {appliedCoupon && (
                <p className="mt-2 text-xs text-emerald-700">
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

        {/* actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={proceedToPay}
            className="inline-flex items-center justify-center rounded-xl border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-600 hover:text-white"
          >
            Proceed to pay
          </button>
          {!isAllCoreSelected && (
            <Link
              href="/enroll?product=all"
              className="text-sm text-neutral-600 hover:underline"
              title="All courses নিতে চাইলে 20% off পাবেন"
            >
              All courses নিন (20% off)
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
