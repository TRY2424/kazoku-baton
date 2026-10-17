// 記事のアイキャッチ画像(1200x630)を public/images/eyecatch/{slug}.png に作る。
// 使い方: npm run eyecatch        (まだ画像がない記事だけ作る)
//         npm run eyecatch -- --all (全部作り直す)
// フォントは Windows の BIZ UDゴシック(SIL OFL)を使うので、このPCで実行してから git push する。
import fs from "fs";
import path from "path";
import { createRequire } from "module";
import matter from "gray-matter";
import { Resvg } from "@resvg/resvg-js";

const require = createRequire(import.meta.url);
const root = process.cwd();
const blogDir = path.join(root, "content", "blog");
const outDir = path.join(root, "public", "images", "eyecatch");
const all = process.argv.includes("--all");
const FONTS = ["C:/Windows/Fonts/BIZ-UDGothicR.ttc", "C:/Windows/Fonts/BIZ-UDGothicB.ttc"];

// ジャンルごとの色(背景・飾りの丸・アクセント・ラベル)とアイコン(lucide)
const THEMES = {
  "koreisha-shisetsu": { label: "高齢者施設", bg: "#9BE3DE", deco: "#5CC8C0", accent: "#1F7A8C", pill: "#F25F5C", icon: "building-2" },
  "kaigo-service": { label: "介護サービス", bg: "#FFB5A7", deco: "#FF8C7A", accent: "#E63946", pill: "#2A9D8F", icon: "heart" },
  "seizen-seiri": { label: "生前整理", bg: "#C7EE8F", deco: "#96D35F", accent: "#3A7D44", pill: "#F28C28", icon: "box" },
  "ihin-seiri": { label: "遺品整理", bg: "#FFC8A2", deco: "#FF9F68", accent: "#D1495B", pill: "#00798C", icon: "archive" },
  souzoku: { label: "相続", bg: "#D6C1EB", deco: "#B08FD6", accent: "#6A4C93", pill: "#FF6F91", icon: "scale" },
  "fudousan-baikyaku": { label: "不動産売却", bg: "#A9D6FF", deco: "#6FB1FC", accent: "#1D4E89", pill: "#FF9F1C", icon: "home" },
  "bochi-reien": { label: "墓地・霊園", bg: "#FFC8DD", deco: "#FF99C8", accent: "#C9184A", pill: "#4C956C", icon: "flower-2" },
  "oya-kuruma": { label: "親の車・運転", bg: "#FFD166", deco: "#FFB703", accent: "#EF476F", pill: "#06A39A", icon: "car" },
};

function iconSvg(name) {
  // lucide-react のアイコン定義([タグ, 属性] の配列)を SVG に組み立てる
  const src = fs.readFileSync(require.resolve(`lucide-react/dist/esm/icons/${name}.js`), "utf8");
  const arr = src.slice(src.indexOf("["), src.lastIndexOf("]") + 1);
  // eslint-disable-next-line no-new-func
  const nodes = Function(`return ${arr}`)();
  return nodes
    .map(([tag, attrs]) => {
      const a = Object.entries(attrs)
        .filter(([k]) => k !== "key")
        .map(([k, v]) => `${k}="${v}"`)
        .join(" ");
      return `<${tag} ${a}/>`;
    })
    .join("");
}

// 白に寄せた薄い色
function tint(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [n >> 16, (n >> 8) & 255, n & 255].map((c) => Math.round(c + (255 - c) * amount));
  return `#${ch.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// 日本語の折り返し:1行の最大文字数で切り、できれば助詞や記号の直後で区切る
const BREAK_AFTER = "のはをにでとがへもや、。・？！）」』";
// 行の頭に来てはいけない文字(句読点・閉じかっこ・長音など)
const NO_START = "、。・？！）」』ー…ぁぃぅぇぉっゃゅょァィゥェォッャュョ";
function wrap(text, max, maxLines) {
  const lines = [];
  let rest = text;
  while (rest.length > max && lines.length < maxLines - 1) {
    let cut = max;
    for (let i = max; i >= Math.ceil(max * 0.6); i--) {
      if (BREAK_AFTER.includes(rest[i - 1])) {
        cut = i;
        break;
      }
    }
    while (cut < rest.length && NO_START.includes(rest[cut])) cut++;
    lines.push(rest.slice(0, cut));
    rest = rest.slice(cut);
  }
  if (rest.length > max) rest = rest.slice(0, max - 1) + "…";
  lines.push(rest);
  return lines;
}

function build(post) {
  const theme = THEMES[(post.categories || [])[0]] || THEMES["kaigo-service"];
  // 画像に載せる見出しは「｜」か最初の「？」「。」までにして、残りを小見出しにする
  // (frontmatter の eyecatchTitle / eyecatchSub で個別に指定もできる)
  let main = post.title;
  let sub = "";
  const bar = main.indexOf("｜");
  if (bar > 0) {
    sub = main.slice(bar + 1);
    main = main.slice(0, bar);
  } else {
    const m = main.match(/^(.{6,}?[？。！])(.+)$/);
    if (m) {
      main = m[1];
      sub = m[2];
    }
  }
  main = (post.eyecatchTitle || main).trim().replace(/。$/, "");
  sub = (post.eyecatchSub ?? sub).trim();

  // タイトルの長さで文字の大きさを変える(左の文字エリアは幅およそ620px)
  let size = 66;
  let perLine = 9;
  if (main.length > 18) {
    size = 54;
    perLine = 11;
  }
  if (main.length > 33) {
    size = 46;
    perLine = 13;
  }
  const lines = wrap(main, perLine, 3);
  const lineH = Math.round(size * 1.36);
  const titleTop = 140 + 54 + 40 + size;
  const subY = titleTop + lineH * (lines.length - 1) + 70;
  // 小見出しは1行だけ(タイトルが3行のときは載せない)
  const subLines = sub && lines.length < 3 ? [sub.length > 19 ? sub.slice(0, 18) + "…" : sub] : [];
  const label = theme.label;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="${theme.bg}"/>
<circle cx="1120" cy="70" r="120" fill="${theme.deco}"/>
<circle cx="90" cy="590" r="90" fill="${tint(theme.bg, 0.45)}"/>
<circle cx="1150" cy="560" r="36" fill="${theme.pill}"/>
<circle cx="60" cy="60" r="22" fill="${theme.accent}"/>
<rect x="60" y="70" width="1080" height="490" rx="36" fill="#FFFFFF"/>
<circle cx="930" cy="315" r="170" fill="${tint(theme.accent, 0.86)}"/>
<g transform="translate(810,195) scale(10)" fill="none" stroke="${theme.accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${iconSvg(theme.icon)}</g>
<rect x="120" y="120" width="${label.length * 28 + 48}" height="54" rx="27" fill="${theme.pill}"/>
<text x="144" y="157" font-family="BIZ UDGothic" font-weight="700" font-size="28" fill="#FFFFFF">${esc(label)}</text>
${lines
  .map((l, i) => `<text x="120" y="${titleTop + i * lineH}" font-family="BIZ UDGothic" font-weight="700" font-size="${size}" fill="#2B2D42">${esc(l)}</text>`)
  .join("\n")}
${subLines
  .map((l, i) => `<text x="120" y="${subY + i * 42}" font-family="BIZ UDGothic" font-size="30" fill="${theme.accent}">${esc(l)}</text>`)
  .join("\n")}
<text x="120" y="522" font-family="BIZ UDGothic" font-weight="700" font-size="26" fill="#8D99AE">関西 家族のバトン</text>
</svg>`;
}

fs.mkdirSync(outDir, { recursive: true });
let made = 0;
for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"))) {
  const slug = file.replace(/\.md$/, "");
  const out = path.join(outDir, `${slug}.png`);
  if (!all && fs.existsSync(out)) continue;
  const { data } = matter(fs.readFileSync(path.join(blogDir, file), "utf8"));
  if (data.draft) continue;
  const png = new Resvg(build({ ...data, slug }), {
    font: { loadSystemFonts: false, fontFiles: FONTS, defaultFontFamily: "BIZ UDGothic" },
  })
    .render()
    .asPng();
  fs.writeFileSync(out, png);
  made++;
}
console.log(`eyecatch: ${made} 枚を作成`);
