// app/enroll/page.tsx
"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

/** ─────────────────────────────
 *  Course catalog (source of truth)
 *  Pricing এখানে রাখলে সব জায়গায় এক থাকে
 *  ─────────────────────────────*/
const COURSES = {
  basic:        { id: "basic",        title: "Basic",        price: 3000 },
  intermediate: { id: "intermediate", title: "Intermediate", price: 6000 },
  advanced:     { id: "advanced",     title: "Advanced",     price: 12000 },
} as const;

type CourseId = keyof typeof COURSES;

/** Single-course coupons (ডেমো কোড—তোমার মতো সেট করো) */
const SINGLE_COUPONS: Record<string, { type: "percent" | "flat"; value: number; label: string }> = {
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

  // URL থেকে ইনপুট
  const productParam = (sp.get("product") || "basic").toLowerCase().trim();
  // multiple select সাপোর্ট: product=basic,intermediate,advanced
  const parsedList =
    productParam.includes(",")
      ? productParam.split(",").map((x) => x.trim()).filter(Boolean)
      : [productParam];

  // acceptable aliases
  const isAllBundle =
    productParam === "all" ||
    productParam === "all-courses" ||
    productParam === "bundle" ||
    hasAll(parsedList as string[]);

  const selectedCourses: CourseId[] = isAllBundle
    ? (["basic", "intermediate", "advanced"] as CourseId[])
    : (parsedList.filter((id) => id in COURSES) as CourseId[]);

  // guard: কিছুই মেলেনি তাহলে basic
  const safeCourses: CourseId[] =
    selectedCourses.length > 0 ? selectedCourses : (["basic"] as CourseId[]);

  // সাবটোটাল
  const subtotal = useMemo(
    () => safeCourses.reduce((sum, id) => sum + COURSES[id].price, 0),
    [safeCourses]
  );

  // কুপন ইনপুট (শুধু single course হলে প্রযোজ্য)
  const [couponInput, setCouponInput] = useState(sp.get("coupon") ?? "");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(
    sp.get("coupon") && SINGLE_COUPONS[sp.get("coupon")!.toUpperCase()]
      ? sp.get("coupon")!.toUpperCase()
      : null
  );
  const [couponError, setCouponError] = useState<string | null>(null);

  const isSingle = safeCourses.length === 1;

  // ── ডিসকাউন্ট ক্যাল্ক ───────────────────────────────────────
  // 1) Bundle (all courses) => 20% off
  const bundleRate = isAllCourses(safeCourses) ? 0.20 : 0;
  const bundleDiscount = Math.round(subtotal * bundleRate);

  // 2) Coupon (শুধু single-course এ প্রযোজ্য)
  const couponMeta = isSingle && appliedCoupon ? SINGLE_COUPONS[appliedCoupon] : undefined;
  const couponDiscount = couponMeta
    ? couponMeta.type === "percent"
      ? Math.round(subtotal * (couponMeta.value / 100))
      : Math.round(couponMeta.value)
    : 0;

  // NOTE: bundle থাকলে কুপন লাগবে না/চাইলে অফ—রিকায়ারমেন্ট: “single course er jonno coupon”
  // তাই bundle হলে কুপন ignore করা হচ্ছে।
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

  function proceedToPay() {
    const params = new URLSearchParams();
    params.set("product", isAllCourses(safeCourses) ? "all" : safeCourses.join(","));
    params.set("amount", String(total));
    if (appliedCoupon && isSingle) params.set("coupon", appliedCoupon);
    // তোমার চেকআউট রুট যেখানে—সেটা ব্যবহার করো।
    // ডেমোতে একই রুটে কনফার্ম ফ্ল্যাগসহ পাঠালাম:
    router.push(`/enroll?${params.toString()}&confirm=1`);
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Enroll</h1>
          <p className="mt-2 text-sm text-neutral-600">
            {isAllCourses(safeCourses)
              ? "All courses bundle — স্বয়ংক্রিয় 20% ছাড় প্রযোজ্য।"
              : "Single course — চাইলে কুপন ব্যবহার করতে পারো।"}
          </p>
        </header>

        {/* নির্বাচিত কোর্সগুলোর তালিকা */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold mb-3">Selected course{safeCourses.length > 1 ? "s" : ""}</h2>
          <ul className="divide-y">
            {safeCourses.map((id) => (
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

            {/* Discount line */}
            {discountToApply > 0 && discountLabel && (
              <div className="flex items-center justify-between text-emerald-600">
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
        </div>

        {/* Coupon only for single-course */}
        {!isAllCourses(safeCourses) && isSingle && (
          <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
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
                <button
                  onClick={removeCoupon}
                  className="rounded-lg border px-3 py-2 text-sm"
                >
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
              নোট: কুপন bundle (all courses) এর সাথে প্রযোজ্য নয়।
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={proceedToPay}
            className="inline-flex items-center justify-center rounded-xl border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-600 hover:text-white"
          >
            Proceed to pay
          </button>
          {!isAllCourses(safeCourses) && (
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

/** Utils */
function hasAll(list: string[]) {
  const need = ["basic", "intermediate", "advanced"];
  return need.every((x) => list.includes(x));
}
function isAllCourses(courses: readonly string[]) {
  return courses.length === 3 && hasAll(courses as string[]);
}
