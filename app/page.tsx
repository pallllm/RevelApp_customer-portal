import { getHomeData } from "@/lib/dataSources";

const badgeClasses = {
  emerald: "bg-emerald-50 text-emerald-600",
  blue: "bg-blue-50 text-blue-600",
  orange: "bg-orange-50 text-orange-600",
  slate: "bg-slate-50 text-slate-600"
};

const toEmbedUrl = (url?: string) => {
  if (!url) return "https://www.youtube.com/embed/dQw4w9WgXcQ";
  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }
  if (url.includes("youtu.be/")) {
    return url.replace("youtu.be/", "www.youtube.com/embed/");
  }
  return url;
};

const HomePage = async () => {
  const data = await getHomeData();
  const mainVideo = data.manualVideos[0];
  const embedUrl = toEmbedUrl(mainVideo?.url);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end gap-4 justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">ホーム</p>
          <h1 className="text-3xl font-bold mt-1">RevelApp 利用状況サマリー</h1>
          <p className="text-slate-500 mt-2">契約状況と利用状況をひと目で確認できます。</p>
      </div>
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-semibold">
        {data.renewalInfo}
      </span>
    </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.statCards.map((card) => (
          <article key={card.label} className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-slate-400 uppercase tracking-wider">{card.label}</p>
            <p className="text-xl font-semibold mt-2">{card.value}</p>
            <p className="text-xs text-slate-500 mt-1">{card.note}</p>
          </article>
        ))}
      </div>

    <div className="grid gap-6 xl:grid-cols-3">
      <article className="bg-white rounded-3xl p-6 shadow-sm xl:col-span-2">
        <header className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">RevelApp カレンダー</h2>
            <p className="text-sm text-slate-500">イベント / お知らせ / 支払日などを表示</p>
          </div>
          <div className="flex gap-2 text-xs text-slate-500">
            <button className="px-3 py-1 rounded-full border border-slate-200">前月</button>
            <button className="px-3 py-1 rounded-full border border-slate-200">翌月</button>
          </div>
        </header>
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400 pb-2 border-b border-slate-100">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
        <div className="grid grid-cols-7 gap-2 mt-4 text-sm">
          {data.calendarCells.map((cell) => (
            <div key={cell.day} className="h-20 border border-slate-100 rounded-xl flex flex-col p-2">
              <span className="text-xs text-slate-400">{cell.day}</span>
              {cell.badges?.map((badge) => (
                <span key={badge.label} className={`mt-auto text-[11px] px-2 py-1 rounded-lg ${badgeClasses[badge.color]}`}>
                  {badge.label}
                </span>
              ))}
            </div>
          ))}
        </div>
        <ul className="mt-6 space-y-3 text-sm">
          {data.timeline.map((item) => (
            <li key={item.dateLabel} className="flex items-start gap-3">
              <span className="w-20 text-xs text-slate-400">{item.dateLabel}</span>
              <div>
                <p className="font-semibold text-slate-800">{item.title}</p>
                <p className="text-slate-500">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </article>

      <article className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">マニュアル動画</h2>
            <p className="text-sm text-slate-500">初期設定やセルフモニタリングの手順を動画で確認</p>
          </div>
          <button className="text-xs text-blue-600 font-semibold">一覧を開く</button>
        </header>
        <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100">
          <iframe src={embedUrl} allowFullScreen title="RevelApp Manual" className="w-full h-full" />
        </div>
        <div className="space-y-2">
          {data.manualVideos.map((video) => (
            <button
              key={video.title}
              className="w-full flex items-center justify-between px-4 py-2 rounded-xl border border-slate-200 text-sm hover:bg-slate-50"
            >
              <span>{video.title}</span>
              <span className="text-xs text-slate-400">{video.duration}</span>
            </button>
          ))}
        </div>
      </article>
    </div>

      <article className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
        <header>
          <h2 className="text-xl font-semibold">WordPress + Next.js ハイブリッド構成</h2>
          <p className="text-sm text-slate-500">要件定義v1に基づき、WPの認証・設定管理とWebアプリの業務UIを連携します。</p>
        </header>
        <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-600">
          <div className="rounded-2xl border border-slate-100 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-400">WordPress側</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {data.hybridInfo.wordpress.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-100 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-400">Webアプリ側</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {data.hybridInfo.webapp.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-xs text-slate-500">{data.hybridInfo.note}</p>
      </article>
    </div>
  );
};

export default HomePage;
