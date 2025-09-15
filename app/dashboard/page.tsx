import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth(); // v5 way

  if (!session?.user) {
    redirect("/login"); // লগইন না থাকলে login এ পাঠাবে
  }

  const user = session.user as any;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">হ্যালো, {user?.name ?? "শিক্ষার্থী"} 👋</h1>
      <p className="mt-2 text-gray-700">আপনার ইমেইল: {user?.email}</p>
      <p className="mt-2">রোল: {user?.role}</p>
    </main>
  );
}
