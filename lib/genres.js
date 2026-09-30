/**
 * ジャンルの一覧(ヘッダーの帯・記事のラベル・コラム一覧の切り替えで共通)。
 * content/categories の slug と order 順にそろえる。
 */
export const GENRES = [
  { slug: "koreisha-shisetsu", label: "高齢者施設" },
  { slug: "kaigo-service", label: "介護サービス" },
  { slug: "seizen-seiri", label: "生前整理" },
  { slug: "ihin-seiri", label: "遺品整理" },
  { slug: "souzoku", label: "相続" },
  { slug: "fudousan-baikyaku", label: "不動産売却" },
  { slug: "bochi-reien", label: "墓地・霊園" },
];

export function getGenre(slug) {
  return GENRES.find((genre) => genre.slug === slug) || null;
}

/** 記事のメインのジャンル(categories の1つ目) */
export function getMainGenre(post) {
  return getGenre((post.categories || [])[0]);
}
