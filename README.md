# 関西 家族のバトン（Next.js版）

関西エリア（兵庫・大阪・京都・奈良・滋賀・和歌山）の、高齢者施設・介護・生前整理・遺品整理・相続・不動産売却・墓地霊園に関する情報サイトです。西宮・芦屋くらし業者ポータルと同じ構成で作っています。

## セットアップ

```bash
npm install
npm run dev
```

`http://localhost:3000` で確認できます。

## ディレクトリ構成

```
content/
  areas/       ... エリアページの中身（Markdown）。region: フィールドで都道府県ごとに分類
  categories/  ... ジャンルページの中身（Markdown）
  blog/        ... コラム記事の中身（Markdown）
  businesses.json ... 実在業者のデータ
pages/
  index.js              ... トップページ
  areas/index.js         ... エリア一覧（都道府県別）
  areas/[slug].js        ... エリア詳細
  categories/index.js    ... ジャンル一覧
  categories/[slug].js   ... ジャンル詳細（エリア別の業者一覧つき）
  blog/index.js          ... コラム一覧
  blog/[slug].js         ... コラム詳細
components/               ... 共通パーツ
```

## 記事・業者の追加方法

`content/areas/`・`content/categories/`・`content/blog/` にMarkdownファイルを追加するだけで、対応するページが自動生成されます。業者データは `content/businesses.json` に、`areaSlugs` と `categorySlugs` を指定して追加します。

## 反映方法

ファイルを上書きコピーしたあと、`update.bat` をダブルクリックするだけでGitHub・Vercel経由で本番サイトに反映されます。

## アフィリエイト・広告の設定

- `components/AffiliateCTA.js` の `href` に、ASPが発行するリンクを設定してください
- `pages/_document.js` に、AdSense審査通過後のスクリプトを追加します（西宮・芦屋サイトと同じPublisher IDが使えます）
- `public/ads.txt` も同様に更新してください

## 注意：このサイト特有の配慮事項

高齢者施設・介護・遺品整理・相続など、読む方の心理的な負担が大きいテーマを扱っています。記事を追加する際は、以下を心がけてください。

- 「早く」「今すぐ」といった急かす表現を避ける
- 断定的な医療・法律アドバイスをしない（専門家への相談を促す）
- 読む方の気持ちに寄り添う言葉選びをする
