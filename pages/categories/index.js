import Seo from "@/components/Seo";
import CategoryCard from "@/components/CategoryCard";
import { getAllEntries } from "@/lib/content";

export default function CategoriesIndex({ categories }) {
  return (
    <>
      <Seo
        title="ジャンルから探す"
        description="高齢者施設・介護・生前整理・遺品整理・相続・不動産売却・墓地霊園など、ジャンルごとに分かりやすく紹介しています。"
        path="/categories"
      />
      <div className="max-w-content mx-auto px-6 py-16">
        <h1 className="font-serif text-3xl text-pine mb-3">ジャンルから探す</h1>
        <p className="text-ink/70 font-sans mb-10 max-w-2xl">
          「何を」相談したいかが決まっている方は、こちらからジャンル別に選び方のポイントを確認できます。
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const categories = getAllEntries("categories").map(({ content, ...rest }) => rest);
  return { props: { categories } };
}
