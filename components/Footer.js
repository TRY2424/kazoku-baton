import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t hairline mt-24 bg-pine text-cream">
      <div className="max-w-content mx-auto px-6 py-12 grid gap-8 sm:grid-cols-3 font-sans text-sm">
        <div>
          <p className="font-serif text-lg mb-2">関西 家族のバトン</p>
          <p className="text-cream/70 leading-relaxed">
            関西エリアで、高齢者施設・介護・生前整理・遺品整理・相続・不動産売却・墓地霊園など、実家じまいに関わる業者選びのお手伝いをするサイトです。むずかしい言葉はできるだけ避けて、分かりやすい説明を心がけています。掲載している情報は記事を書いた時点のものなので、最新の内容は業者や役所に直接ご確認ください。
          </p>
        </div>
        <div>
          <p className="mb-2 text-cream/90">サイトについて</p>
          <ul className="space-y-1 text-cream/70">
            <li><Link href="/about" className="hover:text-terracotta">運営者情報</Link></li>
            <li><Link href="/privacy" className="hover:text-terracotta">プライバシーポリシー</Link></li>
            <li><Link href="/disclaimer" className="hover:text-terracotta">免責事項・広告掲載について</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-cream/90">コンテンツ</p>
          <ul className="space-y-1 text-cream/70">
            <li><Link href="/categories" className="hover:text-terracotta">ジャンル一覧</Link></li>
            <li><Link href="/areas" className="hover:text-terracotta">エリア一覧</Link></li>
            <li><Link href="/blog" className="hover:text-terracotta">コラム一覧</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50 font-sans">
        © {new Date().getFullYear()} 関西 家族のバトン
      </div>
    </footer>
  );
}
