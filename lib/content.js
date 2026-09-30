import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

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

export async function renderMarkdown(markdown) {
  return marked.parse(markdown || "");
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
