import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        {/* ファビコン（検索結果やブラウザのタブに出るアイコン） */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Googleアドセンス */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5884237998308440"
          crossOrigin="anonymous"
        />
        {/* Googleアナリティクス(GA4) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-266M6M5ZC8" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-266M6M5ZC8');`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
