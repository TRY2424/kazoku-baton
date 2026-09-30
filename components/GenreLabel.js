import { getMainGenre } from "@/lib/genres";

/** 記事のジャンルを示す小さなラベル(例:「遺品整理」) */
export default function GenreLabel({ post, className = "" }) {
  const genre = getMainGenre(post);
  if (!genre) return null;
  return (
    <span
      className={`inline-block text-[11px] leading-none font-sans text-pine bg-pine/10 px-2 py-1 ${className}`}
    >
      {genre.label}
    </span>
  );
}
