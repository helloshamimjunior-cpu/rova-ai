"use client";
import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // 👉 এখানে backend API call / Firebase Auth connect করতে পারো
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
          <button
            type="submit"
            className="w-full rounded-md bg-[color:var(--brand-primary)] py-2 text-white font-medium"
          >
            Create Account
          </button>
        </form>
      </div>
    </section>
  );
}
