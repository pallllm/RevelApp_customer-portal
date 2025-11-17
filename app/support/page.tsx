import { getSupportData } from "@/lib/dataSources";

const SupportPage = async () => {
  const data = await getSupportData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">サポートページ</h2>
          <p className="text-sm text-slate-500">既存のWordPressサポートサイトと連携します。</p>
        </div>
        <a href="#" className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold">
          WP サポートサイトへ
        </a>
      </div>

      <article className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">サポートメニュー</h3>
        <ul className="grid gap-4 md:grid-cols-2 text-sm">
          {data.links.map((link) => (
            <li key={link.title} className="p-4 rounded-2xl border border-slate-100 flex flex-col gap-2">
              <p className="font-semibold">{link.title}</p>
              <p className="text-slate-500 text-sm">{link.description}</p>
              <a href={link.url} className="text-blue-600 text-sm font-semibold">
                開く
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-500">※ SaaS管理画面からは別タブで遷移します。</p>
      </article>
    </div>
  );
};

export default SupportPage;
