import Seo from "@/components/Seo";
import AreaCard from "@/components/AreaCard";
import { getAllEntries } from "@/lib/content";

export default function AreasIndex({ areas }) {
  return (
    <>
      <Seo
        title="エリア一覧"
        description="関西エリア（兵庫・大阪・京都・奈良・滋賀・和歌山）を、都道府県ごとに分かりやすく紹介しています。"
        path="/areas"
        // 中身が少ないため、充実させるまで検索エンジンに載せない
        noindex
      />
      <div className="max-w-content mx-auto px-6 py-16">
        <h1 className="font-serif text-3xl text-pine mb-3">エリア一覧</h1>
        <p className="text-ink/70 font-sans mb-10 max-w-2xl">
          お住まいの都道府県を選んでください。
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((area) => (
            <AreaCard key={area.slug} area={area} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const areas = getAllEntries("areas").map(({ content, ...rest }) => rest);
  return { props: { areas } };
}
