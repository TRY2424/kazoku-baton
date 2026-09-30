import Seo from "@/components/Seo";

// Googleフォーム(回答はフォームの「回答」タブで確認)
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfb6Es_59ixYmA1zSeRuePgHbDWFWlrPLbMOPhJHflF0MIyHw/viewform";

export default function Contact() {
  return (
    <>
      <Seo title="お問い合わせ" description="関西 家族のバトンへのお問い合わせフォームです。" path="/contact" />
      <div className="max-w-content mx-auto px-6 py-16 max-w-2xl">
        <h1 className="font-serif text-3xl text-pine mb-6">お問い合わせ</h1>
        <div className="font-sans text-sm text-ink/80 leading-relaxed space-y-3 mb-8">
          <p>
            記事の内容についてのご意見、情報の誤りのご指摘、掲載に関するご相談などは、下のフォームからお送りください。
          </p>
          <p>
            内容を確認のうえ、必要に応じてご記入いただいたメールアドレスにご連絡いたします。お返事までにお時間をいただく場合があります。
          </p>
          <p className="text-ink/60">
            ※ 個別の介護・相続・不動産などの具体的なご相談にはお答えできません。専門の窓口や専門家にご相談ください。
          </p>
        </div>

        <div className="border hairline bg-white">
          <iframe
            src={`${FORM_URL}?embedded=true`}
            title="お問い合わせフォーム"
            className="w-full"
            height="760"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            loading="lazy"
          >
            読み込んでいます…
          </iframe>
        </div>

        <p className="mt-4 text-xs text-ink/60 font-sans">
          フォームが表示されない場合は、
          <a href={FORM_URL} target="_blank" rel="noopener" className="text-terracottadark underline">
            こちらから直接開いてください
          </a>
          。
        </p>
      </div>
    </>
  );
}
