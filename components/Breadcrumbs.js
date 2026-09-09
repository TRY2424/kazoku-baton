import Link from "next/link";

const SITE_URL = "https://kazoku-baton.net"; // 実際のドメイン確定後に確認してください

export default function Breadcrumbs({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <nav aria-label="パンくずリスト" className="text-xs text-ink/50 font-sans mb-2">
        {items.map((item, i) => (
          <span key={i}>
            {item.href ? (
              <Link href={item.href} className="hover:text-terracotta">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
            {i < items.length - 1 && <span className="mx-1">›</span>}
          </span>
        ))}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
