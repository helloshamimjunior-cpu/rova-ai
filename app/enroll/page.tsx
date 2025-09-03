import Link from "next/link";
export default function Enroll() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-semibold">Enroll</h1>
      <p className="text-sm text-muted-foreground mt-2">Coming soon</p>
      <div className="mt-4 flex gap-3">
        <Link href="/pricing" className="underline text-sm">Pricing</Link>
        <Link href="/" className="underline text-sm">Home</Link>
      </div>
    </main>
  );
}
