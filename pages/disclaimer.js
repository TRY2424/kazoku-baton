import Seo from "@/components/Seo";

export default function Disclaimer() {
  return (
    <>
      <Seo title="免責事項・広告について" description="関西 家族のバトンの免責事項・広告についてのご案内です。" path="/disclaimer" />
      <div className="max-w-content mx-auto px-6 py-16 max-w-2xl font-sans text-sm text-ink/80 leading-loose">
        <h1 className="font-serif text-3xl text-pine mb-8">免責事項・広告について</h1>

        <h2 className="font-serif text-xl text-pine mt-8 mb-3">広告について</h2>
        <p>
          このサイトの記事の中には、会社からの依頼を受けてご紹介している広告（アフィリエイト広告）が含まれます。その部分には「PR」という表示をしています。どの業者・サービスをご紹介するかは、このサイトが自分たちの基準で選んでおり、広告主の意向によって内容を変えることはありません。
        </p>

        <h2 className="font-serif text-xl text-pine mt-8 mb-3">情報の正しさについて</h2>
        <p>
          高齢者施設の空き状況や費用、不動産の相場、相続に関する制度は、時期によって変わります。このサイトに書いてある情報は、記事を書いた・更新した時点のものなので、実際の条件とは違う場合があります。ご判断の前には、必ず施設・業者や役所など、実際の窓口に確認してください。
        </p>

        <h2 className="font-serif text-xl text-pine mt-8 mb-3">専門的なアドバイスではないことについて</h2>
        <p>
          このサイトの情報は、一般的な知識としてお伝えしているもので、医療・法律・税金・介護に関する個別の相談へのお答えではありません。ご自身やご家族の状況にあわせた判断が必要なときは、ケアマネジャー、社会福祉士、司法書士、税理士、弁護士など、専門家にご相談ください。
        </p>

        <h2 className="font-serif text-xl text-pine mt-8 mb-3">読んでくださる方へ</h2>
        <p>
          このサイトは、ご家族の介護や、大切な方を亡くされた方など、さまざまな状況の方に読んでいただくことを想定しています。内容が今のお気持ちに合わないと感じられた場合は、無理に読み進めず、いったんページを閉じていただいて構いません。
        </p>
      </div>
    </>
  );
}
