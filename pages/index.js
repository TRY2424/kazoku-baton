import Link from "next/link";
import Seo from "@/components/Seo";
import CategoryCard from "@/components/CategoryCard";
import HeroIllustration from "@/components/HeroIllustration";
import AdSlot from "@/components/AdSlot";
import AffiliateCTA from "@/components/AffiliateCTA";
import { getAllEntries } from "@/lib/content";
import { Heart, NotebookText } from "lucide-react";

export default function Home({ categories, posts }) {
  return (
    <>
      <Seo
        title="親と家族のこれからガイド｜関西の介護・相続・住まいの相談先"
        description="関西エリア（兵庫・大阪・京都・奈良・滋賀・和歌山）にしぼった、高齢者施設・介護・生前整理・遺品整理・相続・不動産売却の業者ガイドです。"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "関西 家族のバトン",
          url: "https://www.kazoku-baton.net",
          inLanguage: "ja",
        }}
      />

      {/* Hero */}
      <section className="border-b hairline bg-creamdark/30">
        <div className="max-w-content mx-auto px-6 py-6 sm:py-12 grid lg:grid-cols-2 gap-4 lg:gap-10 items-center">
          <div>
            <p className="font-sans text-xs sm:text-sm text-terracottadark mb-2 sm:mb-3">
              関西エリア（兵庫・大阪・京都・奈良・滋賀・和歌山）
            </p>
            {/* 句の途中で折り返さないよう、句ごとに inline-block にする */}
            <h1 className="font-serif text-2xl sm:text-4xl xl:text-5xl text-pine leading-snug">
              <span className="inline-block">親のこと、</span>
              <span className="inline-block">これからのこと。</span>
              <br />
              <span className="inline-block">次の世代へ、</span>
              <span className="inline-block">想いをつなぐ。</span>
            </h1>
            <p className="mt-3 sm:mt-6 max-w-xl text-sm sm:text-base text-ink/70 font-sans leading-relaxed">
              高齢者施設・介護から、生前整理、遺品整理、相続、実家の売却まで。むずかしい言葉はできるだけ使わず、はじめての方にも分かりやすい言葉で、実家じまいの一つひとつをお手伝いします。
            </p>
          </div>
          {/* スマホでは小さめにして、ジャンルのカードを早く見せる */}
          <HeroIllustration className="w-full max-w-[220px] sm:max-w-sm lg:max-w-md mx-auto" />
        </div>
      </section>

      <div className="max-w-content mx-auto px-6">
        {/* Categories */}
        <section className="pt-10 pb-16">
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
