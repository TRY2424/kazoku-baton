import Link from "next/link";
import Seo from "@/components/Seo";

export default function About() {
  return (
    <>
      <Seo title="運営者情報" description="関西 家族のバトンの運営者情報です。" path="/about" />
      <div className="max-w-content mx-auto px-6 py-16 max-w-2xl">
        <h1 className="font-serif text-3xl text-pine mb-8">運営者情報</h1>
        <dl className="font-sans text-sm text-ink/80 space-y-4">
          <div>
            <dt className="text-ink/50 mb-1">サイト名</dt>
            <dd>関西 家族のバトン</dd>
          </div>
          <div>
            <dt className="text-ink/50 mb-1">運営者</dt>
            <dd>関西 家族のバトン 事務局</dd>
          </div>
          <div>
            <dt className="text-ink/50 mb-1">連絡先</dt>
            <dd>
              <Link href="/contact" className="text-terracottadark underline">お問い合わせフォーム</Link>
              からご連絡ください。
            </dd>
          </div>
          <div>
            <dt className="text-ink/50 mb-1">サイトの目的</dt>
            <dd>
              関西エリア（兵庫・大阪・京都・奈良・滋賀・和歌山）で、高齢者施設・介護・生前整理・遺品整理・相続・不動産売却・墓地霊園など、実家じまいに関わる業者選びの参考情報を、分かりやすい言葉でお届けすることを目的としています。
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
