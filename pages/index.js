import Link from "next/link";
import Seo from "@/components/Seo";
import CategoryCard from "@/components/CategoryCard";
import AdSlot from "@/components/AdSlot";
import AffiliateCTA from "@/components/AffiliateCTA";
import { getAllEntries } from "@/lib/content";
import { Heart, NotebookText } from "lucide-react";

export default function Home({ categories, posts }) {
  return (
    <>
      <Seo
        title="関西の実家じまい・終活 業者ガイド"
        description="関西エリア（兵庫・大阪・京都・奈良・滋賀・和歌山）にしぼった、高齢者施設・介護・生前整理・遺品整理・相続・不動産売却の業者ガイドです。"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "関西 家族のバトン",
          url: "https://kazoku-baton.net",
          inLanguage: "ja",
        }}
      />

      {/* Hero */}
      <section className="border-b hairline bg-creamdark/30">
        <div className="max-w-content mx-auto px-6 py-16 sm:py-24">
          <p className="font-sans text-sm text-terracottadark mb-4">
            関西エリア（兵庫・大阪・京都・奈良・滋賀・和歌山）
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-pine leading-snug max-w-2xl">
            親のこと、これからのこと。
            <br />
            次の世代へ、想いをつなぐ。
          </h1>
          <p className="mt-6 max-w-xl text-ink/70 font-sans leading-relaxed">
            高齢者施設・介護から、生前整理、遺品整理、相続、実家の売却まで。むずかしい言葉はできるだけ使わず、はじめての方にも分かりやすい言葉で、実家じまいの一つひとつをお手伝いします。
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/categories"
              className="inline-block border-2 border-terracotta text-terracottadark hover:bg-terracotta hover:text-cream transition-colors px-6 py-3 font-sans text-sm"
            >
              ジャンルから探す
            </Link>
            <Link
              href="/blog"
              className="inline-block border-2 border-pine text-pine hover:bg-pine hover:text-cream transition-colors px-6 py-3 font-sans text-sm"
            >
              コラムを読む
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-content mx-auto px-6">
        {/* Categories */}
        <section className="py-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-2xl text-pine flex items-center gap-2">
              <Heart size={22} className="text-terracotta" strokeWidth={1.75} />
              ジャンルから探す
            </h2>
            <Link href="/categories" className="text-sm text-terracottadark font-sans hover:underline">
              すべて見る
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </section>

        <AffiliateCTA
          title="関西エリアの業者をまとめて比較する"
          description="高齢者施設探しから生前整理・遺品整理・相続の相談まで、複数の専門業者にまとめて相談できるサービスです。"
          buttonLabel="無料で相談する"
          href="#"
        />

        <AdSlot />

        {/* Latest posts */}
        <section className="py-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-2xl text-pine flex items-center gap-2">
              <NotebookText size={22} className="text-terracotta" strokeWidth={1.75} />
              コラム
            </h2>
            <Link href="/blog" className="text-sm text-terracottadark font-sans hover:underline">
              すべて見る
            </Link>
          </div>
          <ul className="divide-y hairline border-t border-b hairline">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-5 group"
                >
                  <span className="text-xs text-ink/50 font-sans w-28 shrink-0">
                    {post.date}
                  </span>
                  <span className="font-serif text-lg text-pine group-hover:text-terracotta transition-colors">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const categories = getAllEntries("categories").map(({ content, ...rest }) => rest);
  const posts = getAllEntries("blog")
    .map(({ content, ...rest }) => rest)
    .slice(0, 5);

  return { props: { categories, posts } };
}
