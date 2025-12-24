import type { ChangeRequest, RequestTypeInfo } from "@/types/changeRequest";
import { requestTypeInfoList } from "@/mocks/changeRequest";

interface RequestHistoryProps {
  requests: ChangeRequest[];
}

const statusConfig = {
  pending: {
    label: "申請中",
    className: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
    dotColor: "bg-yellow-500"
  },
  reviewing: {
    label: "確認中",
    className: "bg-gradient-to-r from-blue-400 to-cyan-500 text-white",
    dotColor: "bg-blue-500"
  },
  approved: {
    label: "承認済み",
    className: "bg-gradient-to-r from-purple-400 to-pink-500 text-white",
    dotColor: "bg-purple-500"
  },
  completed: {
    label: "完了",
    className: "bg-gradient-to-r from-emerald-400 to-teal-500 text-white",
    dotColor: "bg-emerald-500"
  },
  rejected: {
    label: "却下",
    className: "bg-gradient-to-r from-red-400 to-rose-500 text-white",
    dotColor: "bg-red-500"
  }
};

const getRequestTypeInfo = (type: string): RequestTypeInfo | undefined => {
  return requestTypeInfoList.find(info => info.type === type);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const RequestDetailContent = ({ request }: { request: ChangeRequest }) => {
  const { payload } = request;

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
      <span className="text-xs font-semibold text-slate-500 min-w-[100px]">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value}</span>
    </div>
  );

  switch (payload.type) {
    case "add_member":
      return (
        <div className="space-y-2">
          <DetailRow label="利用者名" value={`${payload.data.memberName} (${payload.data.memberNameKana})`} />
          <DetailRow label="生年月日" value={payload.data.birthDate} />
          <DetailRow label="利用開始日" value={payload.data.startDate} />
          {payload.data.pcAssignment && <DetailRow label="割当PC" value={payload.data.pcAssignment} />}
          {payload.data.focusGame && <DetailRow label="フォーカスゲーム" value={payload.data.focusGame} />}
          {payload.data.notes && (
            <div className="p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
              <p className="text-sm text-blue-900">{payload.data.notes}</p>
            </div>
          )}
        </div>
      );

    case "remove_member":
      return (
        <div className="space-y-2">
          <DetailRow label="利用者名" value={payload.data.memberName} />
          <DetailRow label="利用終了日" value={payload.data.endDate} />
          <DetailRow label="理由" value={payload.data.reason} />
          {payload.data.notes && (
            <div className="p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
              <p className="text-sm text-blue-900">{payload.data.notes}</p>
            </div>
          )}
        </div>
      );

    case "change_game":
      return (
        <div className="space-y-2">
          <DetailRow label="利用者名" value={payload.data.memberName} />
          <DetailRow label="現在のゲーム" value={payload.data.currentGame} />
          <DetailRow label="変更後" value={payload.data.newGame} />
          <DetailRow label="変更希望日" value={payload.data.effectiveDate} />
          {payload.data.notes && (
            <div className="p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
              <p className="text-sm text-blue-900">{payload.data.notes}</p>
            </div>
          )}
        </div>
      );

    case "change_pc":
      return (
        <div className="space-y-2">
          <DetailRow label="利用者名" value={payload.data.memberName} />
          {payload.data.currentPc && <DetailRow label="現在のPC" value={payload.data.currentPc} />}
          <DetailRow label="変更後" value={payload.data.newPc} />
          <DetailRow label="変更希望日" value={payload.data.effectiveDate} />
          {payload.data.notes && (
            <div className="p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
              <p className="text-sm text-blue-900">{payload.data.notes}</p>
            </div>
          )}
        </div>
      );

    case "change_payment":
      return (
        <div className="space-y-2">
          <DetailRow label="現在の支払方法" value={payload.data.currentMethod} />
          <DetailRow label="変更後" value={payload.data.newMethod} />
          <DetailRow label="変更希望日" value={payload.data.effectiveDate} />
          {payload.data.bankName && (
            <>
              <DetailRow label="銀行名" value={payload.data.bankName} />
              <DetailRow label="口座名義" value={payload.data.accountHolder || ""} />
            </>
          )}
          {payload.data.notes && (
            <div className="p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
              <p className="text-sm text-blue-900">{payload.data.notes}</p>
            </div>
          )}
        </div>
      );

    case "change_bank":
      return (
        <div className="space-y-2">
          <DetailRow label="銀行名" value={payload.data.bankName} />
          <DetailRow label="支店名" value={payload.data.branchName} />
          <DetailRow label="口座種別" value={payload.data.accountType} />
          <DetailRow label="口座番号" value={payload.data.accountNumber} />
          <DetailRow label="口座名義" value={payload.data.accountHolder} />
          <DetailRow label="反映予定日" value={payload.data.effectiveDate} />
          {payload.data.notes && (
            <div className="p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
              <p className="text-sm text-blue-900">{payload.data.notes}</p>
            </div>
          )}
        </div>
      );

    case "other":
      return (
        <div className="space-y-2">
          <DetailRow label="件名" value={payload.data.subject} />
          {payload.data.category && <DetailRow label="カテゴリ" value={payload.data.category} />}
          {payload.data.urgency && (
            <DetailRow
              label="緊急度"
              value={payload.data.urgency === "high" ? "高" : payload.data.urgency === "medium" ? "中" : "低"}
            />
          )}
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-700 whitespace-pre-wrap">{payload.data.details}</p>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export const RequestHistory = ({ requests }: RequestHistoryProps) => {
  if (requests.length === 0) {
    return (
      <div className="relative bg-white rounded-3xl p-16 shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 opacity-50"></div>
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
            📋
          </div>
          <p className="text-slate-400 text-xl font-semibold">申請履歴はまだありません</p>
          <p className="text-slate-500 mt-2">新しい申請を作成してください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {requests.map((request) => {
        const typeInfo = getRequestTypeInfo(request.requestType);
        const statusInfo = statusConfig[request.status];

        return (
          <article
            key={request.id}
            className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-slate-100 transition-all duration-300 hover:-translate-y-1"
          >
            {/* 背景装飾 */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity -mr-24 -mt-24"></div>

            {/* ヘッダー */}
            <div className="relative z-10 flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  {typeInfo?.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{typeInfo?.label}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${statusInfo.dotColor} animate-pulse`}></div>
                    <p className="text-sm text-slate-500">
                      申請日: {formatDate(request.submittedAt)}
                    </p>
                  </div>
                </div>
              </div>
              <span className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-md ${statusInfo.className}`}>
                {statusInfo.label}
              </span>
            </div>

            {/* コンテンツ */}
            <div className="relative z-10 mb-6">
              <RequestDetailContent request={request} />
            </div>

            {/* フッター */}
            <div className="relative z-10 pt-6 border-t border-slate-100 space-y-3">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                  <span className="text-slate-600">申請者: <strong>{request.submittedBy}</strong></span>
                </div>
                {request.reviewedAt && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-slate-600">
                      確認: {formatDate(request.reviewedAt)} ({request.reviewedBy})
                    </span>
                  </div>
                )}
                {request.completedAt && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    <span className="text-slate-600">完了: {formatDate(request.completedAt)}</span>
                  </div>
                )}
              </div>

              {request.effectiveDate && (
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl">
                  <span className="text-sm font-semibold text-indigo-700">
                    📅 反映予定日: {request.effectiveDate}
                  </span>
                </div>
              )}

              {request.adminNotes && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-xl">
                  <p className="text-sm font-semibold text-blue-900 mb-1">💬 運営メモ</p>
                  <p className="text-sm text-blue-700">{request.adminNotes}</p>
                </div>
              )}

              {request.rejectionReason && (
                <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-xl">
                  <p className="text-sm font-semibold text-red-900 mb-1">⚠️ 却下理由</p>
                  <p className="text-sm text-red-700">{request.rejectionReason}</p>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};
