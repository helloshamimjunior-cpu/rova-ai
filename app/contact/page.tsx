"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { User, Mail, Tag, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<{ id: string } | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "ভর্তি/Enroll",
    message: "",
    website: "", // honeypot (bot trap)
  });

  const topics = [
    "ভর্তি/Enroll",
    "কোর্স/সিলেবাস",
    "পার্টনারশিপ",
    "সাপোর্ট/প্রযুক্তিগত",
    "অন্যান্য",
  ];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    // very light validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("নাম, ইমেইল ও বার্তা লাগবে।");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("সঠিক ইমেইল দিন।");
      return;
    }
    if (form.website) return; // bot

    setLoading(true);

    // 🔒 Placeholder submit (API এখনো নেই)
    await new Promise((r) => setTimeout(r, 800));
    const ticketId = "RV-" + String(Math.floor(Math.random() * 90000) + 10000);
    setDone({ id: ticketId });
    setLoading(false);
    toast.success("বার্তা পাঠানো হয়েছে!");
    setForm({ name: "", email: "", topic: "ভর্তি/Enroll", message: "", website: "" });
  };

  // success state
  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="mb-2 text-2xl font-semibold">বার্তা পাওয়া গেছে</h1>
          <p className="text-sm text-gray-600">
            আপনার টিকিট আইডি: <span className="font-mono font-medium">{done.id}</span>
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Link href="/faq" className="rounded-md border px-4 py-2 text-sm">
              FAQ দেখুন
            </Link>
            <Link
              href="/"
              className="rounded-md px-4 py-2 text-sm font-medium text-white"
              style={{ background: "var(--brand-primary)" }}
            >
              হোমে ফিরুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-3xl font-bold text-transparent">
          যোগাযোগ করুন
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          ভর্তি, সাপোর্ট বা পার্টনারশিপ—যেকোন প্রশ্ন লিখে পাঠাও।
        </p>
      </div>

      {/* Card form */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
        <form onSubmit={onSubmit} className="grid gap-4">
          {/* honeypot */}
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            className="hidden"
            aria-hidden="true"
          />

          <label className="grid gap-1">
            <span className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4 text-blue-600" /> নাম
            </span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="আপনার নাম"
            />
          </label>

          <label className="grid gap-1">
            <span className="flex items-center gap-2 text-sm font-medium">
              <Mail className="h-4 w-4 text-blue-600" /> ইমেইল
            </span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="you@example.com"
            />
          </label>

          <label className="grid gap-1">
            <span className="flex items-center gap-2 text-sm font-medium">
              <Tag className="h-4 w-4 text-blue-600" /> টপিক
            </span>
            <select
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
            >
              {topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="flex items-center gap-2 text-sm font-medium">
              <MessageSquare className="h-4 w-4 text-blue-600" /> বার্তা
            </span>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="আপনার প্রশ্ন বা বিবরণ লিখুন…"
            />
          </label>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-gray-500">আমরা ২৪–৪৮ ঘন্টার মধ্যে উত্তর দিই।</p>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
              style={{ background: "var(--brand-primary)" }}
            >
              <Send className="h-4 w-4" />
              {loading ? "পাঠানো হচ্ছে…" : "বার্তা পাঠান"}
            </button>
          </div>
        </form>
      </div>

      {/* Alt contact */}
      <div className="mx-auto mt-6 max-w-4xl text-center text-sm text-gray-600">
        জরুরি হলে ইমেইল: <span className="font-medium">support@rova.ai</span> (placeholder)
      </div>
    </div>
  );
}
