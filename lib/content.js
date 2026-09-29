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
