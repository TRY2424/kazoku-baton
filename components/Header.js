import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Heart } from "lucide-react";
import { GENRES } from "@/lib/genres";


export default function Header() {
  const { asPath } = useRouter();
  const listRef = useRef(null);

  // スマホで、今見ているジャンルが帯の見える位置に来るようにする
  useEffect(() => {
    const list = listRef.current;
    const active = list?.querySelector('[aria-current="page"]');
    if (!list || !active) return;
    list.scrollLeft = active.offsetLeft - (list.clientWidth - active.offsetWidth) / 2;
  }, [asPath]);

  return (
    <header className="border-b hairline">
      <div className="max-w-content mx-auto px-6 pt-5 pb-3">
        <Link href="/" className="inline-flex items-baseline gap-3 group">
          <span className="font-serif text-2xl font-bold text-pine tracking-wide2 flex items-center gap-2">
            <Heart size={22} className="text-terracotta" strokeWidth={1.75} />
            関西 家族のバトン
          </span>
          <span className="hidden sm:inline text-xs text-ink/60 font-sans">
            かんさい かぞくのばとん
          </span>
        </Link>
      </div>

      {/* ジャンル帯:スマホでは横にスワイプ、PCでは1列に収まる */}
      <nav aria-label="ジャンル" className="max-w-content mx-auto relative">
        <ul ref={listRef} className="relative flex gap-1 overflow-x-auto whitespace-nowrap px-4 font-sans text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GENRES.map((genre) => {
            const href = `/categories/${genre.slug}`;
            const active = asPath.split(/[?#]/)[0] === href;
            return (
              <li key={genre.slug}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`block px-3 py-3 border-b-2 transition-colors ${
                    active
                      ? "border-terracotta text-terracottadark"
                      : "border-transparent text-pine hover:text-terracotta"
                  }`}
                >
                  {genre.label}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* 右端のぼかし:帯が横に続くことを示す(PCでは不要) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream to-transparent lg:hidden" />
      </nav>
    </header>
  );
}
