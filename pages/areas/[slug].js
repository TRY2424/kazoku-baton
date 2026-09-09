import Seo from "@/components/Seo";
import AffiliateCTA from "@/components/AffiliateCTA";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageAccent from "@/components/PageAccent";
import BusinessList from "@/components/BusinessList";
import { getAllSlugs, getEntryBySlug, renderMarkdown, getBusinessesByArea } from "@/lib/content";

export default function AreaPage({ area, contentHtml, businesses }) {
  return (
    <>
      <Seo title={area.title} description={area.description} path={`/areas/${area.slug}`} />
      <article className="max-w-content mx-auto px-6 py-16">
        <Breadcrumbs
          items={[
            { label: "トップ", href: "/" },
            { label: "エリアから探す", href: "/areas" },
            { label: area.title },
          ]}
        />
        <PageAccent />
        <h1 className="font-serif text-3xl sm:text-4xl text-pine mb-2">
          {area.title}
        </h1>
        <p className="text-ink/60 font-sans mb-10">{area.catch}</p>

        <div
          className="prose-custom max-w-none font-sans text-ink/90 leading-loose
            [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-pine [&_h2]:mt-12 [&_h2]:mb-4
            [&_p]:mb-5 [&_ul]:mb-5 [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5
            [&_blockquote]:border-l-4 [&_blockquote]:border-terracotta [&_blockquote]:pl-4
            [&_blockquote]:text-sm [&_blockquote]:text-ink/50 [&_blockquote]:mt-8"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {businesses.length > 0 && (
          <section className="mt-14 pt-10 border-t hairline">
            <h2 className="font-serif text-2xl text-pine mb-2">
              {area.title}の業者(例)
            </h2>
            <p className="text-sm text-ink/60 font-sans mb-6">
              このエリアに対応している業者の例です。
            </p>
            <BusinessList businesses={businesses} />
          </section>
        )}

        <AffiliateCTA
          title={`${area.title}の業者を比較する`}
          description="このエリアに対応している業者を含め、複数社にまとめて相談できます。"
          href="#"
        />

        <AdSlot />
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllSlugs("areas");
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const area = getEntryBySlug("areas", params.slug);
  const contentHtml = await renderMarkdown(area.content);
  const { content, ...areaMeta } = area;
  const businesses = getBusinessesByArea(params.slug);
  return { props: { area: areaMeta, contentHtml, businesses } };
}
