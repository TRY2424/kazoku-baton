const fs = require("fs");
const path = require("path");

const SITE_URL = "https://www.kazoku-baton.net"; // 本番は www 付き(wwwなしはVercelでwwwへリダイレクト)

function getSlugs(dir) {
  const full = path.join(process.cwd(), "content", dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    // draft: true の記事はサイトマップに載せない
    .filter((s) => !/^draft:\s*true\s*$/m.test(fs.readFileSync(path.join(full, `${s}.md`), "utf-8").split(/^---\s*$/m)[1] || ""));
}

// エリアのページは noindex にしているため、サイトマップにも載せない
const staticPaths = ["/", "/categories", "/blog", "/about", "/contact", "/privacy", "/disclaimer"];
const categoryPaths = getSlugs("categories").map((s) => `/categories/${s}`);
const blogPaths = getSlugs("blog").map((s) => `/blog/${s}`);

const allPaths = [...staticPaths, ...categoryPaths, ...blogPaths];

// 各ページの更新日（frontmatter の updated、なければ date）を <lastmod> に入れる。
// 一覧などのページは、サイト全体でいちばん新しい日付にする。
function readDate(dir, slug) {
  const f = path.join(process.cwd(), "content", dir, `${slug}.md`);
  if (!fs.existsSync(f)) return null;
  const fm = (fs.readFileSync(f, "utf-8").split(/^---\s*$/m)[1]) || "";
  const pick = (k) => { const m = fm.match(new RegExp("^" + k + ":\\s*\"?([0-9]{4}-[0-9]{2}-[0-9]{2})", "m")); return m ? m[1] : null; };
  return pick("updated") || pick("date");
}
function lastmodFor(p) {
  const m = p.match(/^\/([a-z]+)\/(.+)$/);
  return m ? readDate(m[1], m[2]) : null;
}

const __all = (typeof allPaths !== 'undefined' ? allPaths : paths);
const __latest = __all.map(lastmodFor).filter(Boolean).sort().at(-1);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map((p) => `  <url><loc>${SITE_URL}${p}</loc>${(lastmodFor(p) || __latest) ? `<lastmod>${lastmodFor(p) || __latest}</lastmod>` : ""}</url>`)
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);
console.log(`sitemap.xml generated with ${allPaths.length} URLs`);
