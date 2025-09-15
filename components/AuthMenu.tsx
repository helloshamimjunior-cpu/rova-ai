// components/AuthMenu.tsx
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

export default async function AuthMenu() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className="px-3 py-1.5 rounded border hover:bg-blue-50">
          লগইন
        </Link>
        <Link
          href="/signup"
          className="px-3 py-1.5 rounded bg-blue-600 text-white hover:opacity-90"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  async function doLogout() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <form action={doLogout} className="flex items-center gap-3">
      <span className="text-sm text-gray-700">
        👋 {session.user.name ?? session.user.email}
      </span>
      <button
        className="px-3 py-1.5 rounded border hover:bg-gray-50"
        type="submit"
      >
        লগআউট
      </button>
    </form>
  );
}
