import Link from "next/link";
import Seo from "@/components/Seo";

export default function About() {
  return (
    <>
      <Seo
        title="運営者情報"
        description="関西 家族のバトンの運営者・夏之助の自己紹介と、サイトを作ったきっかけ、記事づくりの方針です。"
        path="/about"
      />
      <div className="max-w-content mx-auto px-6 py-16 max-w-2xl">
        <h1 className="font-serif text-3xl text-pine mb-8">運営者情報</h1>

        <section className="font-sans text-ink/85 leading-loose space-y-4 mb-12">
          <h2 className="font-serif text-2xl text-pine mb-2">このサイトを作ったきっかけ</h2>
          <p>
            はじめまして。「関西 家族のバトン」を運営している、夏之助です。
          </p>
          <p>
            わたしの親も、少しずつ高齢になってきました。介護のこと、実家のこと、お金や相続のこと。いつかは向き合わなければいけないと分かっていても、何から調べればいいのか、誰に相談すればいいのか、分からないことばかりでした。
          </p>
          <p>
            そして、親のことを考えるうちに、「これは自分自身の未来の話でもある」と気づきました。いずれ自分も年をとり、子どもや家族にバトンを渡す日が来ます。
          </p>
          <p>
            同じように悩んでいる方が、むずかしい言葉に迷わず、落ち着いて次の一歩を選べるように。そんな思いで、このサイトを作りました。
          </p>
        </section>

        <section className="font-sans text-ink/85 leading-loose mb-12">
          <h2 className="font-serif text-2xl text-pine mb-4">記事づくりの方針</h2>
          <ul className="space-y-3 list-disc pl-5">
            <li>
              <strong className="text-pine">一次情報を、できるかぎりもとにしています。</strong>
              厚生労働省・法務省・国税庁・裁判所・各自治体などの公的機関の情報や、サービスを提供している事業者の公式情報を確認して書いています。
            </li>
            <li>
              <strong className="text-pine">むずかしい言葉は、できるだけ使いません。</strong>
              専門用語を使うときは、意味をあわせて説明します。
            </li>
            <li>
              <strong className="text-pine">情報は、見直しを続けます。</strong>
              制度や料金は変わることがあるため、記事には情報の時点を書き、気づいたところから更新しています。
            </li>
            <li>
              <strong className="text-pine">広告を含む記事には、はっきり表示します。</strong>
              アフィリエイト広告を含む記事には「PR」と表示しています。紹介する内容は、広告主の意向ではなく、このサイトの基準で選んでいます（くわしくは
              <Link href="/disclaimer" className="text-terracottadark underline">免責事項・広告について</Link>
              ）。
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink/60">
            ※ このサイトは、一般的な情報をお届けするものです。個別の状況についての判断は、ケアマネジャー、地域包括支援センター、弁護士・司法書士・税理士などの専門家にご相談ください。
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-pine mb-4">サイトについて</h2>
          <dl className="font-sans text-sm text-ink/80 space-y-4">
            <div>
              <dt className="text-ink/50 mb-1">サイト名</dt>
              <dd>関西 家族のバトン</dd>
            </div>
            <div>
              <dt className="text-ink/50 mb-1">運営者</dt>
              <dd>夏之助</dd>
            </div>
            <div>
              <dt className="text-ink/50 mb-1">対象エリア</dt>
              <dd>関西（兵庫・大阪・京都・奈良・滋賀・和歌山）</dd>
            </div>
            <div>
              <dt className="text-ink/50 mb-1">扱っているテーマ</dt>
              <dd>高齢者施設、介護サービス、生前整理、遺品整理、相続、不動産売却、墓地・霊園</dd>
            </div>
            <div>
              <dt className="text-ink/50 mb-1">連絡先</dt>
              <dd>
                <Link href="/contact" className="text-terracottadark underline">お問い合わせフォーム</Link>
                からご連絡ください。記事の誤りのご指摘も歓迎しています。
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  );
}
