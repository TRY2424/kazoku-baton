import Link from "next/link";

/** 記事冒頭の「結論」ボックス */
export function Conclusion({ text }) {
  if (!text) return null;
  return (
    <div className="conclusion-box mb-8">
      <p className="conclusion-label">結論から</p>
      <p className="conclusion-text">{text}</p>
    </div>
  );
}

/** 番号つきの目次 */
export function Toc({ items }) {
  if (!items || items.length < 3) return null;
  return (
    <nav className="toc-box mb-10" aria-label="目次">
      <p className="toc-title">この記事の目次</p>
      <ol>
        {items.map((t) => (
          <li key={t.id}>
            <a href={`#${t.id}`}>
              <span className="toc-num">{t.num}</span>
              <span>{t.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** キーワードタグ */
export function TagList({ tags }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="mt-12 flex flex-wrap gap-2" aria-label="キーワード">
      {tags.map((t) => (
        <Link key={t} href={`/tags/${encodeURIComponent(t)}`} className="tag-chip">
          #{t}
        </Link>
      ))}
    </div>
  );
}

/** 同じジャンルの前の記事・次の記事 */
export function PrevNext({ newer, older }) {
  if (!newer && !older) return null;
  return (
    <nav className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="前後の記事">
      {older ? (
        <Link href={`/blog/${older.slug}`} className="prevnext-card">
          <span className="prevnext-label">← 前の記事</span>
          <span className="prevnext-title">{older.title}</span>
        </Link>
      ) : <span />}
      {newer ? (
        <Link href={`/blog/${newer.slug}`} className="prevnext-card sm:text-right">
          <span className="prevnext-label">次の記事 →</span>
          <span className="prevnext-title">{newer.title}</span>
        </Link>
      ) : <span />}
    </nav>
  );
}
