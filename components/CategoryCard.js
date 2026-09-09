import Link from "next/link";
import { getCategoryIcon } from "@/lib/icons";

export default function CategoryCard({ category }) {
  const Icon = getCategoryIcon(category.icon);
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block border hairline border-l-4 border-l-terracotta p-6 bg-cream hover:bg-white transition-colors"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={20} className="text-terracotta shrink-0" strokeWidth={1.75} />
        <h3 className="font-serif text-xl text-pine group-hover:text-terracotta transition-colors">
          {category.title}
        </h3>
      </div>
      <p className="text-sm text-ink/70 font-sans leading-relaxed">
        {category.summary}
      </p>
    </Link>
  );
}
