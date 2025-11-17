import { getMembersData } from "@/lib/dataSources";

const toneBadgeClasses = {
  emerald: "bg-emerald-50 text-emerald-600",
  yellow: "bg-yellow-50 text-yellow-600",
  slate: "bg-slate-100 text-slate-500",
  blue: "bg-blue-100 text-blue-600",
  orange: "bg-orange-50 text-orange-600"
};

const MembersPage = async () => {
  const data = await getMembersData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">利用者一覧</h2>
          <p className="text-sm text-slate-500">プランに応じて表示内容と操作が変わります。</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          {data.memberPlanNotes.map((note) => (
            <span key={note.label} className={`px-3 py-1 rounded-full ${toneBadgeClasses[note.tone]}`}>
              {note.label}
            </span>
          ))}
        </div>
      </div>

    <article className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold tracking-widest text-slate-400">表示プラン</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-full border border-slate-200 text-xs text-slate-400 cursor-not-allowed" disabled>
              エントリー
            </button>
            <button className="px-3 py-1 rounded-full border border-slate-200 text-xs text-slate-600 bg-slate-50">フレキシブル</button>
            <button className="px-3 py-1 rounded-full border border-emerald-200 text-xs text-emerald-700 bg-emerald-50">フォーカス</button>
          </div>
        </div>
        <button className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm">CSVをエクスポート</button>
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="py-3 pr-4 font-semibold">利用者名 / ニックネーム</th>
              <th className="py-3 pr-4 font-semibold">モニタリングシート</th>
              <th className="py-3 pr-4 font-semibold">形式</th>
              <th className="py-3 pr-4 font-semibold">継続期間</th>
              <th className="py-3 pr-4 font-semibold">ステータス</th>
              <th className="py-3 font-semibold">選択ゲーム（フォーカス）</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.records.map((record) => (
              <tr key={record.name}>
                <td className="py-4 pr-4">
                  <p className="font-semibold text-slate-900">
                    {record.name}
                    {record.nickname && <span className="text-slate-500 text-sm">（{record.nickname}）</span>}
                  </p>
                  <a href="#" className="text-xs text-blue-600">
                    モニタリングシートを開く
                  </a>
                </td>
                <td className="py-4 pr-4">{record.sheetLabel}</td>
                <td className="py-4 pr-4">{record.inputFormat}</td>
                <td className="py-4 pr-4">{record.durationLabel}</td>
                <td className="py-4 pr-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${toneBadgeClasses[record.status.tone]}`}>
                    {record.status.label}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex flex-wrap gap-2">
                    {record.games.length ? (
                      record.games.map((game) => (
                        <span key={game} className="px-2 py-1 text-xs rounded-lg bg-slate-100 text-slate-600">
                          {game}
                        </span>
                      ))
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-lg bg-slate-100 text-slate-500">未設定</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-between gap-4 items-center">
        <p className="text-sm text-slate-500">※ 利用者の追加・解除は直接操作できません。申請フォームよりご連絡ください。</p>
        <button className="px-5 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold">利用者変更はこちら</button>
      </div>
    </article>
    </div>
  );
};

export default MembersPage;
