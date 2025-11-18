import { fetchHealthGraphData } from "@/lib/api";

const gameColorPalette = ["bg-indigo-50 text-indigo-600", "bg-pink-50 text-pink-600", "bg-amber-50 text-amber-600", "bg-slate-100 text-slate-600"];

const calendarStateClasses = {
  none: "bg-slate-50 text-slate-500",
  entry: "bg-emerald-100 text-emerald-700",
  strong: "bg-emerald-200 text-emerald-800",
  warning: "bg-red-100 text-red-600"
} as const;

const calendarLegend = [
  { state: "entry", label: "実施" },
  { state: "strong", label: "連続実施" },
  { state: "warning", label: "体調注意" }
] as const;

const HealthGraphPage = async () => {
  const data = await fetchHealthGraphData(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">体調の見える化グラフ</h2>
          <p className="text-sm text-slate-500">年月と利用者を指定してモニタリング状況を確認します。</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white">
            <option>2024年</option>
            <option>2023年</option>
          </select>
          <select className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white">
            <option>11月</option>
            <option>10月</option>
          </select>
          <select className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white">
            <option>佐藤 光</option>
            <option>村上 花</option>
            <option>木村 大</option>
          </select>
          <button className="px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold">表示</button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-3">
          {data.metrics.map((metric) => (
            <article key={metric.label} className="bg-white rounded-3xl p-6 shadow-sm space-y-3">
              <p className="text-sm text-slate-500">{metric.label}</p>
              <p className="text-4xl font-bold">{metric.value}</p>
              <p className="text-xs text-emerald-600">{metric.note}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="bg-white rounded-3xl p-6 shadow-sm space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">プレイしたゲーム</h3>
                <p className="text-xs text-slate-500">直近1ヶ月でプレイしたゲームバッジ</p>
              </div>
              <button className="text-xs text-blue-600 font-semibold">履歴を表示</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {data.games.map((game, index) => (
                <span key={game} className={`px-4 py-2 rounded-full text-sm font-semibold ${gameColorPalette[index % gameColorPalette.length]}`}>
                  {game}
                </span>
              ))}
            </div>
          </article>
          <article className="bg-white rounded-3xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">入力カレンダー</h3>
                <p className="text-xs text-slate-500">セルフモニタリング実施日</p>
              </div>
              <span className="text-xs text-slate-400">11月</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-[11px]">
              {data.calendar.map((cell) => (
                <span
                  key={cell.day}
                  className={`h-8 flex items-center justify-center rounded ${
                    calendarStateClasses[cell.state ?? "none"]
                  }`}
                >
                  {cell.day}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
              {calendarLegend.map((legend) => (
                <span key={legend.state} className={`px-2 py-1 rounded ${calendarStateClasses[legend.state]}`}>
                  {legend.label}
                </span>
              ))}
            </div>
          </article>
        </div>

        <article className="bg-emerald-50 rounded-3xl p-6 shadow-sm flex items-start gap-4">
          <span className="text-3xl" role="img" aria-label="AIコメント">
            💬
          </span>
          <div>
            <p className="text-sm text-slate-600">セルフモニタリングAIコメント</p>
            <p className="text-lg font-semibold">「{data.comment}」</p>
            <p className="text-xs text-slate-500 mt-1">※ 将来的に自動生成ロジックを実装予定</p>
          </div>
        </article>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="bg-white rounded-3xl p-6 shadow-sm">
            <header className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">体調スコア</h3>
                <p className="text-xs text-slate-500">折れ線グラフ＋天気アイコン（Chart.js想定）</p>
              </div>
              <span className="text-xs text-slate-400">表示例</span>
            </header>
            <div className="h-56 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm">
              Chart.js line chart placeholder
            </div>
          </article>
          <article className="bg-white rounded-3xl p-6 shadow-sm">
            <header className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">セルフモニタリング実施率</h3>
                <p className="text-xs text-slate-500">棒グラフ（実施日数 / プレイ日数）</p>
              </div>
              <span className="text-xs text-slate-400">表示例</span>
            </header>
            <div className="h-56 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm">
              Chart.js bar chart placeholder
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default HealthGraphPage;
