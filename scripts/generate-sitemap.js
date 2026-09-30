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
const staticPaths = ["/", "/categories", "/blog", "/about", "/privacy", "/disclaimer"];
const categoryPaths = getSlugs("categories").map((s) => `/categories/${s}`);
const blogPaths = getSlugs("blog").map((s) => `/blog/${s}`);

const allPaths = [...staticPaths, ...categoryPaths, ...blogPaths];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`)
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);
console.log(`sitemap.xml generated with ${allPaths.length} URLs`);
