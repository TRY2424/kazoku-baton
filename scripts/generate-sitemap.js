const fs = require("fs");
const path = require("path");

const SITE_URL = "https://kazoku-baton.net"; // 実際のドメイン確定後に確認してください

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

const staticPaths = ["/", "/areas", "/categories", "/blog", "/about", "/privacy", "/disclaimer"];
const areaPaths = getSlugs("areas").map((s) => `/areas/${s}`);
const categoryPaths = getSlugs("categories").map((s) => `/categories/${s}`);
const blogPaths = getSlugs("blog").map((s) => `/blog/${s}`);

const allPaths = [...staticPaths, ...areaPaths, ...categoryPaths, ...blogPaths];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`)
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);
console.log(`sitemap.xml generated with ${allPaths.length} URLs`);
