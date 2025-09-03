"use client";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    identifier: "", // 👉 এখানে email or mobile number যেকোনো একটা আসবে
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", form);
    // 👉 Backend / Firebase এ identifier check করতে হবে
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="identifier"
            placeholder="Email or Mobile Number"
            value={form.identifier}
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
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
