import { Building2, ExternalLink } from "lucide-react";

export default function BusinessList({ businesses }) {
  if (!businesses || businesses.length === 0) return null;

  return (
    <div className="space-y-4">
      {businesses.map((b) => (
        <div key={b.id} className="border hairline p-5 bg-cream">
          <div className="flex items-start gap-3">
            <Building2 size={18} className="text-pine shrink-0 mt-0.5" strokeWidth={1.75} />
            <div className="flex-1">
              {b.url ? (
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-lg font-bold text-terracottadark hover:text-terracotta underline decoration-terracotta/40 underline-offset-4 transition-colors inline-flex items-center gap-1.5"
                >
                  {b.name}
                  <ExternalLink size={14} strokeWidth={2.5} className="shrink-0" />
                </a>
              ) : (
                <p className="font-serif text-lg font-bold text-pine">{b.name}</p>
              )}
              <p className="text-xs text-ink/60 font-sans mt-1">{b.address}</p>
              {b.note && (
                <p className="text-sm text-ink/70 font-sans mt-2 leading-relaxed">{b.note}</p>
              )}
            </div>
          </div>
        </div>
      ))}
      <p className="text-xs text-ink/40 font-sans pt-1">
        ※ 掲載情報は変更される場合があります。最新情報は各社の公式サイト等でご確認ください。
      </p>
    </div>
  );
}
