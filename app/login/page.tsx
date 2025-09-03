export default function LoginPage() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="w-full max-w-md border rounded-xl p-6 bg-neutral-50 shadow-sm">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
        <form className="space-y-4">
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
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-[color:var(--brand-primary)]">
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
}
