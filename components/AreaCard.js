import Link from "next/link";
import { MapPin } from "@/lib/icons";

export default function AreaCard({ area }) {
  return (
    <Link
      href={`/areas/${area.slug}`}
      className="group block border hairline p-6 bg-cream hover:bg-white transition-colors"
    >
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-serif text-xl text-pine group-hover:text-terracotta transition-colors flex items-center gap-1.5">
          <MapPin size={16} className="text-terracotta shrink-0" strokeWidth={2} />
          {area.title}
        </h3>
      </div>
      <p className="text-sm text-ink/70 font-sans leading-relaxed mb-4">
        {area.summary}
      </p>
    </Link>
  );
}
