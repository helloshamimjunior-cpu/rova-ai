export default function SkillPage({ params }: { params: { slug: string } }) {
  const title = params.slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600">এই স্কিলের কনটেন্ট শিগগিরই যোগ হবে।</p>
    </section>
  )
}
