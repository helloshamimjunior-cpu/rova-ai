import { notFound } from "next/navigation"

const SKILLS = {
  "prompt-engineering": {
    title: "Prompt Engineering",
    summary: "প্রম্পট ডিজাইন, চেইনিং, সিস্টেম প্রম্পট—হ্যান্ডস-অন গাইড।",
    topics: ["Zero/One-shot", "Few-shot", "Chain-of-Thought", "Guardrails"],
  },
  "rag-basics": {
    title: "RAG Basics",
    summary: "Retrieval-augmented generation সেটআপের বুনিয়াদি।",
    topics: ["Chunking", "Embeddings", "Vector DB", "Eval"],
  },
  "zapier": {
    title: "Zapier Multi-step",
    summary: "Zapier দিয়ে মাল্টি-স্টেপ অটোমেশন ও ইন্টিগ্রেশন।",
    topics: ["Triggers", "Actions", "Webhooks", "Filters"],
  },
  "n8n": {
    title: "n8n Workflows",
    summary: "ওপেন সোর্স n8n দিয়ে কাস্টম অটোমেশন।",
    topics: ["Nodes", "Expressions", "Integrations", "Deploy"],
  },
  "api-webhooks": {
    title: "API / Webhooks",
    summary: "ওয়েবহুক কনফিগারেশন, API কল, ডাটা এক্সচেঞ্জ।",
    topics: ["REST Basics", "Auth", "Postman", "Error Handling"],
  },
  "client-proposal": {
    title: "Client Proposal",
    summary: "প্রফেশনাল প্রপোজাল লেখা, কস্টিং আর স্কোপ ডেফিনিশন।",
    topics: ["SOP", "Templates", "Pricing Models", "Negotiation"],
  },
  "portfolio-case-study": {
    title: "Portfolio Case Study",
    summary: "প্রজেক্ট শোকেস ও কেস স্টাডি তৈরি।",
    topics: ["Project Demo", "Docs", "Slides", "Storytelling"],
  },
} as const

type SkillKey = keyof typeof SKILLS

export default function SkillPage({ params }: { params: { slug: string } }) {
  const skill = SKILLS[params.slug as SkillKey]
  if (!skill) return notFound()

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{skill.title}</h1>
      <p className="text-gray-600 mb-6">{skill.summary}</p>

      <div className="grid gap-4 md:grid-cols-2">
        {skill.topics.map((t) => (
          <div
            key={t}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-5"
          >
            <h3 className="font-semibold mb-1">{t}</h3>
            <p className="text-sm text-gray-600">শিগগিরই কনটেন্ট যোগ হবে।</p>
          </div>
        ))}
      </div>
    </section>
  )
}
