import Link from "next/link";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenreLabel from "@/components/GenreLabel";
import { getAllTags, getPostsByTag } from "@/lib/content";

export default function TagPage({ tag, posts }) {
  return (
    <>
      <Seo
        title={`「${tag}」の記事`}
        description={`「${tag}」に関する記事の一覧です。`}
        path={`/tags/${encodeURIComponent(tag)}`}
        noindex
      />
      <section className="max-w-content mx-auto px-6 py-16">
        <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "コラム", href: "/blog" }, { label: `#${tag}` }]} />
        <h1 className="font-serif text-3xl text-pine mb-2">#{tag}</h1>
        <p className="text-sm text-ink/60 font-sans mb-10">「{tag}」のキーワードがついた記事（{posts.length}本）</p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="block h-full border hairline bg-white/60 hover:bg-white p-5 transition-colors group">
                <img src={`/images/eyecatch/${p.slug}.png`} alt="" width={1200} height={630} loading="lazy" className="w-full h-auto rounded-lg mb-3" />
                <div className="mb-2"><GenreLabel post={p} /></div>
                <h2 className="font-serif text-base text-pine group-hover:text-terracotta transition-colors leading-snug">{p.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  return { paths: Object.keys(getAllTags()).map((tag) => ({ params: { tag } })), fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { tag: params.tag, posts: getPostsByTag(params.tag) } };
}
