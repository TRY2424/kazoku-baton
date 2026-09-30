import { ArrowRight } from "lucide-react";

/**
 * アフィリエイトリンク用のCTAコンポーネント。
 * 「PR」ラベルは削除せず、リンク先URLは各ASPの発行するタグに差し替えてください。
 */

// PR枠の表示スイッチ。再表示するときは true に戻してください。
const SHOW_AFFILIATE_CTA = false;

export default function AffiliateCTA({
  title,
  description,
  buttonLabel = "無料で相談する",
  href = "#",
  pixel,
  show = SHOW_AFFILIATE_CTA,
}) {
  if (!show) return null;

  return (
    <div className="my-10 border-2 border-terracotta bg-white p-6">
      <span className="inline-block text-[10px] tracking-wide2 text-white bg-terracotta px-2 py-0.5 mb-3 font-sans">
        PR
      </span>
      <h3 className="font-serif text-lg text-pine mb-2">{title}</h3>
      <p className="text-sm text-ink/70 font-sans leading-relaxed mb-4">
        {description}
      </p>
      <a
        href={href}
        rel="nofollow sponsored noopener"
        target="_blank"
        className="inline-flex items-center gap-1.5 bg-terracotta hover:bg-terracottadark text-white text-sm font-sans px-5 py-3 transition-colors"
      >
        {buttonLabel}
        <ArrowRight size={16} strokeWidth={2} />
      </a>
      {pixel && <img src={pixel} width="1" height="1" alt="" className="border-0" />}
    </div>
  );
}
