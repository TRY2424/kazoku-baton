import Seo from "@/components/Seo";
import AffiliateCTA from "@/components/AffiliateCTA";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllSlugs, getEntryBySlug, renderMarkdown } from "@/lib/content";
import { getBlogIcon } from "@/lib/icons";

export default function BlogPost({ post, contentHtml }) {
  const Icon = getBlogIcon(post.icon);
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

        <div
          className="prose-custom max-w-none font-sans text-ink/90 leading-loose
            [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-pine [&_h2]:mt-12 [&_h2]:mb-4
            [&_p]:mb-5 [&_ul]:mb-5 [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5
            [&_hr]:my-10 [&_hr]:border-t [&_hr]:hairline"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <AdSlot />

        <AffiliateCTA
          title="関西エリアの業者を比較する"
          description="複数の業者にまとめて相談ができるサービスです。"
          href="#"
        />
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
