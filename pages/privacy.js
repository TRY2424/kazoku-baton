import Seo from "@/components/Seo";

export default function Privacy() {
  return (
    <>
      <Seo title="プライバシーポリシー" description="関西 家族のバトンのプライバシーポリシーです。" path="/privacy" />
      <div className="max-w-content mx-auto px-6 py-16 max-w-2xl font-sans text-sm text-ink/80 leading-loose">
        <h1 className="font-serif text-3xl text-pine mb-8">プライバシーポリシー</h1>

        <h2 className="font-serif text-xl text-pine mt-8 mb-3">アクセスの記録について</h2>
        <p>
          このサイトでは、Googleアナリティクスなど、どのページがよく読まれているかを調べる仕組み（アクセス解析ツール）を使うことがあります。これらの仕組みはCookie（クッキー）というデータを使いますが、お名前やご住所など、個人を特定できる情報は含まれません。
        </p>

        <h2 className="font-serif text-xl text-pine mt-8 mb-3">広告について</h2>
        <p>
          このサイトでは、Googleアドセンスなど、外部の会社が配信する広告を使う場合があります。広告を配信する会社は、見ている方の興味に合わせた広告を出すためにCookieを使うことがあります。Cookieの止め方や、Googleアドセンスについてのくわしい説明は、
          <a
            href="https://policies.google.com/technologies/ads?hl=ja"
            target="_blank"
            rel="noopener"
            className="text-terracottadark underline"
          >
            Googleの広告ポリシーのページ
          </a>
          でご確認いただけます。
        </p>

        <h2 className="font-serif text-xl text-pine mt-8 mb-3">アフィリエイト広告について</h2>
        <p>
          このサイトは、いくつかのアフィリエイトプログラム（会社から紹介料をいただいて、商品やサービスをご案内するしくみ）に参加しています。
        </p>

        <h2 className="font-serif text-xl text-pine mt-8 mb-3">情報の正確さについて</h2>
        <p>
          このサイトの内容は、できるだけ正確になるよう努めていますが、内容の正しさや安全性を完全に保証するものではありません。このサイトの情報を使ったことで生じたトラブルや損害について、責任を負いかねますので、あらかじめご了承ください。
        </p>
      </div>
    </>
  );
}
