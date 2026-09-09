/**
 * AdSenseの実装箇所。
 * 審査通過後、pages/_document.js の <Head> 内にアドセンスの読み込みスクリプトを追加し、
 * 下記の <ins> タグをアドセンス管理画面で発行される広告ユニットのコードに置き換えてください。
 */
export default function AdSlot({ label = "広告" }) {
  return (
    <div className="my-10 border hairline bg-creamdark/50">
      <p className="text-[10px] text-ink/40 font-sans px-3 pt-2">{label}</p>
      <div className="min-h-[100px] flex items-center justify-center text-ink/30 text-xs font-sans pb-4">
        Ad Unit
      </div>
    </div>
  );
}
