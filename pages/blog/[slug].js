import Seo from "@/components/Seo";
import AffiliateCTA from "@/components/AffiliateCTA";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllSlugs, getEntryBySlug, renderMarkdown } from "@/lib/content";
import { getBlogIcon } from "@/lib/icons";
import { AFFILIATE_LINKS } from "@/lib/affiliates";

const proseClass = `prose-custom max-w-none font-sans text-ink/90 leading-loose
  [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-pine [&_h2]:mt-12 [&_h2]:mb-4
  [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-pine [&_h3]:mt-8 [&_h3]:mb-3
  [&_p]:mb-5 [&_ul]:mb-5 [&_ol]:mb-5 [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
  [&_table]:w-full [&_table]:mb-6 [&_table]:text-sm [&_th]:border [&_th]:hairline [&_th]:bg-creamdark/50 [&_th]:p-2 [&_th]:text-left
  [&_td]:border [&_td]:hairline [&_td]:p-2 [&_td]:align-top
  [&_blockquote]:border-l-4 [&_blockquote]:border-terracotta/40 [&_blockquote]:pl-4 [&_blockquote]:text-ink/70
  [&_hr]:my-10 [&_hr]:border-t [&_hr]:hairline`;

export default function BlogPost({ post, contentHtml }) {
  const Icon = getBlogIcon(post.icon);
  // frontmatter に cta(affiliate または href)がある記事だけ、記事専用のPR枠を出す。
  // 本文中の <!-- cta --> の位置にも同じPR枠を差し込む。
  const affiliate = AFFILIATE_LINKS[post.cta?.affiliate];
  const cta = post.cta && {
    title: post.cta.title,
    description: post.cta.description,
    buttonLabel: post.cta.buttonLabel,
    href: affiliate?.href || post.cta.href,
  };
  const hasCta = Boolean(cta?.href && cta.href !== "#");
  const contentParts = hasCta
    ? contentHtml.split("<!-- cta -->")
    : [contentHtml.replaceAll("<!-- cta -->", "")];

  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          inLanguage: "ja",
          publisher: {
            "@type": "Organization",
            name: "関西 家族のバトン",
          },
        }}
      />
      <article className="max-w-content mx-auto px-6 py-16">
        <Breadcrumbs
          items={[
            { label: "トップ", href: "/" },
            { label: "コラム", href: "/blog" },
            { label: post.title },
          ]}
        />
        <div className="flex items-center gap-3 mb-3">
          <div className="shrink-0 w-11 h-11 rounded-full bg-terracotta/10 flex items-center justify-center">
            <Icon size={22} className="text-terracottadark" strokeWidth={1.75} />
          </div>
          <p className="text-xs text-ink/50 font-sans">{post.date}</p>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-pine mb-10 leading-snug">
          {post.title}
        </h1>

        {/* ステマ規制のため、小さくしすぎたり薄くしすぎたりしないこと */}
        {hasCta && (
          <p className="text-xs text-ink/60 font-sans text-right -mt-6 mb-8">
            この記事にはPRが含まれています
          </p>
        )}

        {contentParts.map((html, i) => (
          <div key={i}>
            <div className={proseClass} dangerouslySetInnerHTML={{ __html: html }} />
            {hasCta && i < contentParts.length - 1 && <AffiliateCTA {...cta} show />}
          </div>
        ))}

        <AdSlot />

        {hasCta ? (
          // 計測用の1x1画像は、二重カウントを防ぐため最後のPR枠にだけ付ける
          <AffiliateCTA {...cta} pixel={affiliate?.pixel} show />
        ) : (
          <AffiliateCTA
            title="関西エリアの業者を比較する"
            description="複数の業者にまとめて相談ができるサービスです。"
            href="#"
          />
        )}
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllSlugs("blog");
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getEntryBySlug("blog", params.slug);
  const contentHtml = await renderMarkdown(post.content);
  const { content, ...postMeta } = post;
  return { props: { post: postMeta, contentHtml } };
}
