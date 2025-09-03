export default function SignupPage() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="w-full max-w-md border rounded-xl p-6 bg-neutral-50 shadow-sm">
        <h1 className="text-2xl font-semibold mb-4 text-center">Signup</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md px-3 py-2"
          />
          <button
            type="submit"
            className="w-full rounded-md py-2 text-white font-medium"
            style={{ background: "var(--brand-primary)" }}
          >
            Signup
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[color:var(--brand-primary)]">
            Login
          </a>
        </p>
      </div>
    </section>
  );
}
