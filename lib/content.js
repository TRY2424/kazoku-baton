import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

// Markdown の画像は、キャプションと出典つきの figure にする。
//   ![キャプション](/images/photos/x.jpg "写真：〇〇／Pexels|https://...")
marked.use({
  renderer: {
    image(href, title, text) {
      const [credit, creditUrl] = (title || "").split("|");
      const creditHtml = credit
        ? `<span class="photo-credit">${creditUrl ? `<a href="${creditUrl}" target="_blank" rel="noopener">${credit}</a>` : credit}</span>`
        : "";
      return `<figure class="photo"><img src="${href}" alt="${text}" loading="lazy"><figcaption><span>${text}</span>${creditHtml}</figcaption></figure>`;
    },
  },
});

const contentDir = path.join(process.cwd(), "content");

function getDir(type) {
  return path.join(contentDir, type);
}

// frontmatter に draft: true がある記事は、本番ビルドでは公開しない(npm run dev では表示される)。
const hideDrafts = process.env.NODE_ENV === "production";

export function getAllSlugs(type) {
  const dir = getDir(type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .filter((slug) => !(hideDrafts && getEntryBySlug(type, slug).draft));
}

export function getEntryBySlug(type, slug) {
  const filePath = path.join(getDir(type), `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, ...data, content };
}

// 「」などの記号のすぐ外に ** を付けると marked が太字にしないので、先に <strong> に置き換える
function fixBold(text) {
  return (text || "").replace(/\*\*([^*\n]+?)\*\*/g, "<strong>$1</strong>");
}

export async function renderMarkdown(markdown) {
  return marked.parse(fixBold(markdown));
}

export function getAllEntries(type) {
  const slugs = getAllSlugs(type);
  return slugs
    .map((slug) => getEntryBySlug(type, slug))
    .sort((a, b) => {
      if (a.order != null && b.order != null) return a.order - b.order;
      return new Date(b.date || 0) - new Date(a.date || 0);
    });
}

/**
 * 記事の最後に出す「あわせて読みたい」記事を選ぶ。
 * frontmatter の related: [slug, ...] で指定した記事を先に並べ、
 * 足りない分は、同じジャンル(categories)とタグ(tags)が多く重なる記事から自動で選ぶ。
 */
export function getRelatedPosts(post, limit = 3) {
  const others = getAllEntries("blog").filter((p) => p.slug !== post.slug);
  const picked = (post.related || [])
    .map((slug) => others.find((p) => p.slug === slug))
    .filter(Boolean);

  const overlap = (a = [], b = []) => a.filter((x) => b.includes(x)).length;
  const auto = others
    .filter((p) => !picked.includes(p))
    .map((p) => ({
      p,
      score: overlap(p.categories, post.categories) * 2 + overlap(p.tags, post.tags),
    }))
    .filter(({ score }) => score > 0)
    // 同点なら新しい順(getAllEntries の並び)のまま
    .sort((a, b) => b.score - a.score)
    .map(({ p }) => p);

  return [...picked, ...auto]
    .slice(0, limit)
    .map(({ slug, title, summary, icon, categories }) => ({
      slug,
      title,
      summary: summary || null,
      icon: icon || null,
      categories: categories || [],
    }));
}

/**
 * 実在する業者のデータ(content/businesses.json)。
 */
export function getAllBusinesses() {
  const filePath = path.join(contentDir, "businesses.json");
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function getBusinessesByArea(areaSlug) {
  return getAllBusinesses().filter((b) => (b.areaSlugs || []).includes(areaSlug));
}

export function getBusinessesByCategory(categorySlug) {
  return getAllBusinesses().filter((b) => (b.categorySlugs || []).includes(categorySlug));
}

/**
 * 本文の大見出し(h2)に番号(01・02…)とidをつけ、目次の項目を返す。
 * 「出典」の見出しには番号をつけず、目次にも入れない。
 */
export function addToc(html) {
  let n = 0;
  const toc = [];
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (m, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    if (/出典/.test(text)) return `<h2 class="h2-source">${inner}</h2>`;
    n += 1;
    const id = `sec${n}`;
    const num = String(n).padStart(2, "0");
    toc.push({ id, text, num });
    return `<h2 id="${id}"><span class="h2-num">${num}</span>${inner}</h2>`;
  });
  return { html: out, toc };
}

/** 同じジャンル(最初のカテゴリ)の中で、日付順に1つ前・1つ後の記事 */
export function getPrevNext(post) {
  const main = (post.categories || [])[0];
  const list = getAllEntries("blog").filter((p) => (p.categories || [])[0] === main);
  const i = list.findIndex((p) => p.slug === post.slug);
  const pick = (p) => (p ? { slug: p.slug, title: p.title } : null);
  return { newer: pick(list[i - 1]), older: pick(list[i + 1]) };
}

/** すべてのタグと、それぞれの記事数 */
export function getAllTags() {
  const counts = {};
  for (const p of getAllEntries("blog")) for (const t of p.tags || []) counts[t] = (counts[t] || 0) + 1;
  return counts;
}

export function getPostsByTag(tag) {
  return getAllEntries("blog")
    .filter((p) => (p.tags || []).includes(tag))
    .map(({ slug, title, summary, categories, date }) => ({ slug, title, summary: summary || null, categories: categories || [], date: String(date || "") }));
}
