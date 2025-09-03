"use client";
import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Email or Mobile"
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md px-3 py-2"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-md text-white font-medium"
            style={{ background: "var(--brand-primary)" }}
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[color:var(--brand-primary)] font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
