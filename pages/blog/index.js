import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "@/components/Seo";
import GenreLabel from "@/components/GenreLabel";
import { getAllEntries } from "@/lib/content";
import { getBlogIcon } from "@/lib/icons";
import { GENRES } from "@/lib/genres";

export default function BlogIndex({ posts }) {
  // ?genre=ihin-seiri のように、URLで選んだジャンルを覚える(共有・戻るボタンでも保たれる)
  const { query } = useRouter();
  const selected = GENRES.some((g) => g.slug === query.genre) ? query.genre : null;
  const visible = selected ? posts.filter((p) => (p.categories || []).includes(selected)) : posts;

  const tabs = [
    { slug: null, label: "すべて", count: posts.length },
    ...GENRES.map((g) => ({
      ...g,
      count: posts.filter((p) => (p.categories || []).includes(g.slug)).length,
    })),
  ];

  return (
    <>
      <Seo
        title="コラム一覧"
        description="関西エリアの高齢者施設・介護・生前整理・遺品整理・相続・不動産売却・お墓に関するコラム一覧です。"
        path="/blog"
      />
      <div className="max-w-content mx-auto px-6 py-16">
        <h1 className="font-serif text-3xl text-pine mb-6">コラム</h1>

        {/* ジャンルの切り替え:スマホでは横にスワイプ */}
        <nav aria-label="ジャンルで絞り込む" className="-mx-6 px-6 mb-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex gap-2 whitespace-nowrap font-sans text-sm">
            {tabs.map((tab) => {
              const active = tab.slug === selected;
              return (
                <li key={tab.slug || "all"}>
                  <Link
                    href={tab.slug ? `/blog?genre=${tab.slug}` : "/blog"}
                    scroll={false}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 border transition-colors ${
                      active
                        ? "bg-pine border-pine text-cream"
                        : "border-pine/20 text-pine hover:border-pine"
                    }`}
                  >
                    {tab.label}
                    <span className={`text-xs ${active ? "text-cream/70" : "text-ink/40"}`}>{tab.count}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <ul className="divide-y hairline border-t border-b hairline">
          {visible.map((post) => {
            const Icon = getBlogIcon(post.icon);
            return (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-start gap-4 py-6 group"
                >
                  <div className="shrink-0 w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center mt-1">
                    <Icon size={18} className="text-terracottadark" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <GenreLabel post={post} />
                      <span className="text-xs text-ink/50 font-sans">{post.date}</span>
                    </div>
                    <h2 className="font-serif text-xl text-pine group-hover:text-terracotta transition-colors mt-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-ink/60 font-sans mt-2 max-w-2xl">
                      {post.summary}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllEntries("blog").map(({ content, ...rest }) => rest);
  return { props: { posts } };
}
