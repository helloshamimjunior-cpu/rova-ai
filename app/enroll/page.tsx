import Link from "next/link";

type ProductKey = "basic" | "intermediate" | "advanced" | "micro";

const products: Record<ProductKey, { name: string; price: string; points: string[] }> = {
  basic: {
    name: "Basic",
    price: "৳১,৫০০",
    points: ["Prompt Engineering (Foundations)", "Zapier Basics (Single-step)", "Mini Project: Content Helper"],
  },
  intermediate: {
    name: "Intermediate",
    price: "৳২,৫০০",
    points: ["Zapier Multi-step", "n8n পরিচিতি + Triggers", "API/Webhooks Integrations"],
  },
  advanced: {
    name: "Advanced",
    price: "৳৬,০০০",
    points: ["Client Workflow (Discovery → SOP)", "AI Agents Basics", "Freelance Setup & Handover"],
  },
  micro: {
    name: "Micro",
    price: "৳৫০০–৳৮০০",
    points: ["Topic-based Mini Courses", "Short Workshops (2–3 hrs)", "Practice Tasks + Checklists"],
  },
};

export default async function Page({
  searchParams,
}: {
  // Next 15: searchParams is async
  searchParams: Promise<{ product?: ProductKey }>;
}) {
  const sp = await searchParams;
  const key = (sp?.product ?? "basic") as ProductKey;
  const valid = ["basic", "intermediate", "advanced", "micro"].includes(key);
  const p = products[valid ? key : "basic"];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold mb-3">Enroll — Coming soon</h1>
      <p className="text-gray-600 mb-8">
        আপনি সিলেক্ট করেছেন: <span className="font-medium">{p.name}</span> — <span>{p.price}</span>
      </p>

      <div className="rounded-xl border bg-white text-left p-6 mx-auto mb-8">
        <div className="text-lg font-semibold mb-2">{p.name} — {p.price}</div>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          {p.points.map((pt, i) => (<li key={i}>{pt}</li>))}
        </ul>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button disabled className="rounded-md px-4 py-2 text-white opacity-70 cursor-not-allowed"
                  style={{ background: "var(--brand-primary)" }}>
            পেমেন্ট (শীঘ্রই)
          </button>
          <Link href="/pricing" className="rounded-md px-4 py-2 border text-center">
            পুরো প্রাইসিং দেখুন
          </Link>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-6">অথবা অন্য প্ল্যান বেছে নিন:</div>
      <div className="flex flex-wrap justify-center gap-2">
        <Link href="/enroll?product=basic" className="px-3 py-1.5 rounded-md border">Basic</Link>
        <Link href="/enroll?product=intermediate" className="px-3 py-1.5 rounded-md border">Intermediate</Link>
        <Link href="/enroll?product=advanced" className="px-3 py-1.5 rounded-md border">Advanced</Link>
        <Link href="/enroll?product=micro" className="px-3 py-1.5 rounded-md border">Micro</Link>
      </div>

      <div className="mt-8">
        <Link href="/" className="inline-block rounded-md px-4 py-2 text-white"
              style={{ background: "var(--brand-primary)" }}>
          হোমে ফিরুন
        </Link>
      </div>
    </div>
  );
}
