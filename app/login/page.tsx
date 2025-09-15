"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{type:"error"|"ok";text:string}|null>(null);
  const [showPw, setShowPw] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false, // আমরা নিজে রিডাইরেক্ট হ্যান্ডল করব
    });
    setLoading(false);
    if (!res || res.error) {
      setMsg({ type: "error", text: "ইমেইল/পাসওয়ার্ড মিলেনি" });
      return;
    }
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-[calc(100vh-80px)] grid place-items-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md mx-auto rounded-2xl border border-white/40 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl shadow-xl p-6">
        <h1 className="text-2xl font-semibold text-center">লগইন</h1>
        <p className="text-center text-sm text-slate-600 dark:text-slate-300 mt-1">
          আপনার অ্যাকাউন্টে ঢুকুন
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">ইমেইল</label>
            <input
              type="email"
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ring-sky-400 bg-white/70 dark:bg-slate-800/60"
              placeholder="name@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">পাসওয়ার্ড</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                className="w-full rounded-xl border px-3 py-2 pr-12 outline-none focus:ring-2 ring-sky-400 bg-white/70 dark:bg-slate-800/60"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded border"
              >
                {showPw ? "লুকাও" : "দেখাও"}
              </button>
            </div>
          </div>

          {msg && (
            <div
              className={`text-sm px-3 py-2 rounded-xl ${
                msg.type === "error"
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-green-100 text-green-700 border border-green-200"
              }`}
            >
              {msg.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-2.5 font-medium hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "লগইন হচ্ছে…" : "লগইন"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          নতুন নাকি?{" "}
          <Link className="text-sky-600 hover:underline" href="/signup">
            সাইন আপ করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
