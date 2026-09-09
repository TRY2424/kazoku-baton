import Link from "next/link";
import { Heart } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b hairline">
      <div className="max-w-content mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-3 group">
          <span className="font-serif text-2xl font-bold text-pine tracking-wide2 flex items-center gap-2">
            <Heart size={22} className="text-terracotta" strokeWidth={1.75} />
            関西 家族のバトン
          </span>
          <span className="hidden sm:inline text-xs text-ink/60 font-sans">
            かんさい かぞくのばとん
          </span>
        </Link>
        <nav className="flex gap-6 font-sans text-sm text-pine">
          <Link href="/categories" className="hover:text-terracotta transition-colors">
            ジャンルから探す
          </Link>
          <Link href="/areas" className="hover:text-terracotta transition-colors">
            エリアから探す
          </Link>
          <Link href="/blog" className="hover:text-terracotta transition-colors">
            コラム
          </Link>
        </nav>
      </div>
    </header>
  );
}
