/**
 * アフィリエイト先のリンク一覧。
 * 記事の frontmatter で cta.affiliate: "oyatoko" のように指定すると、ここのリンクが使われる。
 * href: クリック先のURL / pixel: A8などの表示回数計測用の1x1画像(あれば)
 * ASPのリンクを発行したら、ここを差し替えるだけで全記事に反映される。
 */
export const AFFILIATE_LINKS = {
  // 家族信託の「おやとこ」(今は公式ページ。ASPのリンクに差し替える)
  oyatoko: {
    href: "https://kokorono.info/afi/",
  },
  // 保険外の介護サービス「イチロウ」(A8)
  ichirou: {
    href: "https://px.a8.net/svt/ejp?a8mat=4BCNG3+1ZG6RU+54PG+5YJRM",
    pixel: "https://www17.a8.net/0.gif?a8mat=4BCNG3+1ZG6RU+54PG+5YJRM",
  },
  // 海洋散骨「シーセレモニー」(申請中。今は公式ページ。ASPのリンクに差し替える)
  seaceremony: {
    href: "https://sea-ceremony.com/",
  },
};
