import { getRewardData } from "@/lib/dataSources";

const toneBadgeClasses = {
  emerald: "bg-emerald-50 text-emerald-600",
  yellow: "bg-yellow-50 text-yellow-600",
  slate: "bg-slate-100 text-slate-600",
  blue: "bg-blue-100 text-blue-600",
  orange: "bg-orange-50 text-orange-600"
};

const RewardsPage = async () => {
  const data = await getRewardData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">工賃</h2>
          <p className="text-sm text-slate-500">ゲーム・作業の実績に応じた工賃と請求状況を確認できます。</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white">
            <option>2024年</option>
            <option>2023年</option>
          </select>
          <select className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white">
            <option>第3四半期</option>
            <option>第4四半期</option>
          </select>
          <select className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white">
            <option>総合</option>
            <option>事業所別</option>
          </select>
          <button className="px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold">レポートを出力</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.kpis.map((card) => (
          <section key={card.label} className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-slate-400 uppercase tracking-wider">{card.label}</p>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
            <p className="text-xs text-slate-500 mt-1">{card.note}</p>
          </section>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="bg-white rounded-3xl p-6 shadow-sm lg:col-span-2">
          <header className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">工賃推移グラフ</h3>
              <p className="text-xs text-slate-500">施設全体の月次工賃合計（折れ線グラフ想定）</p>
            </div>
            <div className="text-xs text-slate-400">Chart.js</div>
          </header>
          <div className="h-64 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm">
            Line chart placeholder
          </div>
        </article>
        <article className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold">ゲーム単価のデザイン</h3>
          <p className="text-sm text-slate-500">サービス継続期間に応じてポイント単価が変動します。</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center px-4 py-3 rounded-2xl bg-slate-50">
              <span className="text-sm font-semibold">0〜3ヶ月</span>
              <span className="text-base font-bold text-slate-900">1 pt = 1円</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 rounded-2xl bg-blue-50">
              <span className="text-sm font-semibold">4〜6ヶ月</span>
              <span className="text-base font-bold text-blue-700">1 pt = 1.2円</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 rounded-2xl bg-emerald-50">
              <span className="text-sm font-semibold">7ヶ月〜</span>
              <span className="text-base font-bold text-emerald-700">1 pt = 1.5円</span>
            </div>
          </div>
        </article>
      </div>

      <article className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
        <header className="flex flex-wrap gap-3 items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">利用者ごとの工賃金額</h3>
            <p className="text-xs text-slate-500">年月：2024年11月</p>
          </div>
          <button className="text-sm text-blue-600 font-semibold">CSVダウンロード</button>
        </header>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-100">
                <th className="py-3 pr-4 font-semibold">利用者名</th>
                <th className="py-3 pr-4 font-semibold">ポイント合計</th>
                <th className="py-3 pr-4 font-semibold">単価</th>
                <th className="py-3 pr-4 font-semibold">工賃金額</th>
                <th className="py-3 pr-4 font-semibold">支払ステータス</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.memberRows.map((row) => (
                <tr key={row.name}>
                  <td className="py-4 pr-4">{row.name}</td>
                  <td className="py-4 pr-4">{row.points}</td>
                  <td className="py-4 pr-4">{row.unitPrice}</td>
                  <td className="py-4 pr-4 font-semibold">{row.rewardAmount}</td>
                  <td className="py-4 pr-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${toneBadgeClasses[row.status.tone]}`}>
                      {row.status.label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
        <header>
          <h3 className="text-lg font-semibold">工賃明細 &amp; RevelAppへの請求書</h3>
          <p className="text-xs text-slate-500">PDFリンクと発行ステータスを月ごとに表示</p>
        </header>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-100">
                <th className="py-3 pr-4 font-semibold">年月</th>
                <th className="py-3 pr-4 font-semibold">工賃明細</th>
                <th className="py-3 pr-4 font-semibold">RevelApp請求書</th>
                <th className="py-3 font-semibold">ステータス</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.docRows.map((row) => (
                <tr key={row.period}>
                  <td className="py-4 pr-4">{row.period}</td>
                  <td className="py-4 pr-4">
                    <a href={row.detailUrl} className="text-blue-600 underline text-sm">
                      PDFをダウンロード
                    </a>
                  </td>
                  <td className="py-4 pr-4">
                    <a href={row.invoiceUrl} className="text-blue-600 underline text-sm">
                      PDFをダウンロード
                    </a>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${toneBadgeClasses[row.status.tone]}`}>
                      {row.status.label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
};

export default RewardsPage;
