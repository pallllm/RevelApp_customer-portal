import { fetchContractData } from "@/lib/api";

const ContractPage = async () => {
  const data = await fetchContractData(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">ご契約情報</h2>
          <p className="text-sm text-slate-500">いつでも参照できるよう契約内容を整理して表示します。</p>
        </div>
        <button className="px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold">編集申請</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="bg-white rounded-3xl p-6 shadow-sm space-y-4 lg:col-span-2">
          <h3 className="text-lg font-semibold">{data.basic.title}</h3>
          <dl className="grid gap-y-4 gap-x-8 sm:grid-cols-2 text-sm">
            {data.basic.entries.map((entry) => (
              <div key={entry.label}>
                <dt className="text-slate-500">{entry.label}</dt>
                <dd className="font-semibold text-slate-900">{entry.value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold">{data.contacts.title}</h3>
          <dl className="space-y-4 text-sm">
            {data.contacts.entries.map((entry) => (
              <div key={entry.label}>
                <dt className="text-slate-500">{entry.label}</dt>
                <dd className="font-semibold text-slate-900">{entry.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>

      <article className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">{data.plan.title}</h3>
        <dl className="grid gap-y-4 gap-x-8 sm:grid-cols-2 text-sm">
          {data.plan.entries.map((entry) => (
            <div key={entry.label}>
              <dt className="text-slate-500">{entry.label}</dt>
              <dd className="font-semibold text-slate-900">{entry.value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs text-slate-500">{data.note}</p>
      </article>
    </div>
  );
};

export default ContractPage;
