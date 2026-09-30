import Seo from "@/components/Seo";
import Link from "next/link";
import { NotebookText } from "lucide-react";
import AffiliateCTA from "@/components/AffiliateCTA";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import BusinessList from "@/components/BusinessList";
import { getAllSlugs, getAllEntries, getEntryBySlug, renderMarkdown, getBusinessesByCategory } from "@/lib/content";
import { getCategoryIcon, getBlogIcon } from "@/lib/icons";

export default function CategoryPage({ category, contentHtml, posts, businesses }) {
  const Icon = getCategoryIcon(category.icon);
  return (
    <>
      <Seo
        title={category.title}
        description={category.description}
        path={`/categories/${category.slug}`}
      />
      <article className="max-w-content mx-auto px-6 py-16">
        <Breadcrumbs
          items={[
            { label: "トップ", href: "/" },
            { label: "ジャンルから探す", href: "/categories" },
            { label: category.title },
          ]}
        />
        <div className="flex items-center gap-3 mb-2">
          <div className="shrink-0 w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center">
            <Icon size={24} className="text-terracotta" strokeWidth={1.75} />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-pine">
            {category.title}
          </h1>
        </div>
        <p className="text-ink/60 font-sans mb-10">{category.catch}</p>

        <div
          className="prose-custom max-w-none font-sans text-ink/90 leading-loose
            [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-pine [&_h2]:mt-10 [&_h2]:mb-4
            [&_p]:mb-4 [&_ul]:mb-4 [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* ジャンル → コラムへの導線 */}
        <section className="mt-14 pt-10 border-t hairline">
          <h2 className="font-serif text-2xl text-pine mb-2 flex items-center gap-2">
            <NotebookText size={22} className="text-terracotta" strokeWidth={1.75} />
            {category.title}のコラム
          </h2>
          {posts.length > 0 ? (
            <ul className="divide-y hairline border-t border-b hairline mt-6">
              {posts.map((post) => {
                const PostIcon = getBlogIcon(post.icon);
                return (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="flex items-start gap-4 py-5 group">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center mt-0.5">
                        <PostIcon size={18} className="text-terracottadark" strokeWidth={1.75} />
                      </div>
                      <div>
                        {post.featured && (
                          <span className="inline-block text-[11px] font-sans text-terracottadark bg-terracotta/10 px-2 py-0.5 mb-1">
                            はじめての方へ
                          </span>
                        )}
                        <h3 className="font-serif text-lg text-pine group-hover:text-terracotta transition-colors leading-snug">
                          {post.title}
                        </h3>
                        {post.summary && (
                          <p className="text-sm text-ink/60 font-sans mt-1 leading-relaxed">{post.summary}</p>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-ink/60 font-sans mt-4">
              このジャンルのコラムは準備中です。
            </p>
          )}
          <div className="mt-6 text-right">
            <Link href="/blog" className="text-sm text-terracottadark font-sans hover:underline">
              コラムをすべて見る
            </Link>
          </div>
        </section>

        {businesses.length > 0 && (
          <section className="mt-14 pt-10 border-t hairline">
            <h2 className="font-serif text-2xl text-pine mb-2">
              掲載している業者(例)
            </h2>
            <p className="text-sm text-ink/60 font-sans mb-6">
              現在ご紹介できる業者です。今後、エリアを広げながら増やしていく予定です。
            </p>
            <BusinessList businesses={businesses} />
          </section>
        )}

        <AffiliateCTA
          title={`${category.title}の業者を比較する`}
          description="複数の業者にまとめて相談・見積もりができるサービスです。"
          buttonLabel="無料で相談する"
          href="#"
        />

        <AdSlot />
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllSlugs("categories");
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = getEntryBySlug("categories", params.slug);
  const contentHtml = await renderMarkdown(category.content);
  const { content, ...categoryMeta } = category;
  const posts = getAllEntries("blog")
    .filter((post) => (post.categories || []).includes(params.slug))
    // featured: true の入門記事を先頭に(それ以外は新しい順のまま)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    .map(({ slug, title, summary, icon, featured }) => ({
      slug,
      title,
      summary: summary || null,
      icon: icon || null,
      featured: Boolean(featured),
    }));
  const businesses = getBusinessesByCategory(params.slug);
  return { props: { category: categoryMeta, contentHtml, posts, businesses } };
}
