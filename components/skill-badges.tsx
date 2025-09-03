import Link from "next/link"

const badges = [
  { name: "Prompt Engineering", slug: "prompt-engineering" },
  { name: "RAG Basics", slug: "rag-basics" },
]

export function SkillBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((b) => (
        <Link
          key={b.slug}
          href={`/skills/${b.slug}`}
          className="rounded-full border border-gray-300 px-3 py-1 text-sm hover:shadow transition"
        >
          {b.name}
        </Link>
      ))}
    </div>
  )
}
