import Seo from "@/components/Seo";
import AreaCard from "@/components/AreaCard";
import AffiliateCTA from "@/components/AffiliateCTA";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import BusinessList from "@/components/BusinessList";
import { getAllSlugs, getAllEntries, getEntryBySlug, renderMarkdown, getBusinessesByCategory } from "@/lib/content";
import { getCategoryIcon } from "@/lib/icons";

export default function CategoryPage({ category, contentHtml, areas, businesses }) {
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

        {/* ジャンル → エリアを選ぶ導線 */}
        <section className="mt-14 pt-10 border-t hairline">
          <h2 className="font-serif text-2xl text-pine mb-2">
            {category.title}を、エリアから探す
          </h2>
          <p className="text-sm text-ink/60 font-sans mb-8">
            お住まいの都道府県を選ぶと、そのエリアの詳しい情報にうつれます。
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {areas.map((area) => (
              <AreaCard key={area.slug} area={area} />
            ))}
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
  const areas = getAllEntries("areas").map(({ content, ...rest }) => rest);
  const businesses = getBusinessesByCategory(params.slug);
  return { props: { category: categoryMeta, contentHtml, areas, businesses } };
}
