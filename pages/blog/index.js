import Link from "next/link";
import Seo from "@/components/Seo";
import { getAllEntries } from "@/lib/content";
import { getBlogIcon } from "@/lib/icons";

export default function BlogIndex({ posts }) {
  return (
    <>
      <Seo
        title="コラム一覧"
        description="関西エリアの高齢者施設・介護・生前整理・遺品整理・相続・不動産売却に関するコラム一覧です。"
        path="/blog"
      />
      <div className="max-w-content mx-auto px-6 py-16">
        <h1 className="font-serif text-3xl text-pine mb-10">コラム</h1>
        <ul className="divide-y hairline border-t border-b hairline">
          {posts.map((post) => {
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
                    <span className="text-xs text-ink/50 font-sans">{post.date}</span>
                    <h2 className="font-serif text-xl text-pine group-hover:text-terracotta transition-colors mt-1">
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
