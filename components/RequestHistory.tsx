import type { ChangeRequest, RequestTypeInfo } from "@/types/changeRequest";
import { requestTypeInfoList } from "@/mocks/changeRequest";

interface RequestHistoryProps {
  requests: ChangeRequest[];
}

const statusConfig = {
  pending: {
    label: "申請中",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200"
  },
  reviewing: {
    label: "確認中",
    className: "bg-blue-50 text-blue-700 border-blue-200"
  },
  approved: {
    label: "承認済み",
    className: "bg-purple-50 text-purple-700 border-purple-200"
  },
  completed: {
    label: "完了",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  rejected: {
    label: "却下",
    className: "bg-red-50 text-red-700 border-red-200"
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

  switch (payload.type) {
    case "add_member":
      return (
        <div className="space-y-2 text-sm">
          <p><span className="text-slate-500">利用者名:</span> {payload.data.memberName} ({payload.data.memberNameKana})</p>
          <p><span className="text-slate-500">生年月日:</span> {payload.data.birthDate}</p>
          <p><span className="text-slate-500">利用開始日:</span> {payload.data.startDate}</p>
          {payload.data.pcAssignment && <p><span className="text-slate-500">割当PC:</span> {payload.data.pcAssignment}</p>}
          {payload.data.focusGame && <p><span className="text-slate-500">フォーカスゲーム:</span> {payload.data.focusGame}</p>}
          {payload.data.notes && <p className="text-slate-600 mt-2">{payload.data.notes}</p>}
        </div>
      );

    case "remove_member":
      return (
        <div className="space-y-2 text-sm">
          <p><span className="text-slate-500">利用者名:</span> {payload.data.memberName}</p>
          <p><span className="text-slate-500">利用終了日:</span> {payload.data.endDate}</p>
          <p><span className="text-slate-500">理由:</span> {payload.data.reason}</p>
          {payload.data.notes && <p className="text-slate-600 mt-2">{payload.data.notes}</p>}
        </div>
      );

    case "change_game":
      return (
        <div className="space-y-2 text-sm">
          <p><span className="text-slate-500">利用者名:</span> {payload.data.memberName}</p>
          <p><span className="text-slate-500">現在のゲーム:</span> {payload.data.currentGame}</p>
          <p><span className="text-slate-500">変更後:</span> {payload.data.newGame}</p>
          <p><span className="text-slate-500">変更希望日:</span> {payload.data.effectiveDate}</p>
          {payload.data.notes && <p className="text-slate-600 mt-2">{payload.data.notes}</p>}
        </div>
      );

    case "change_pc":
      return (
        <div className="space-y-2 text-sm">
          <p><span className="text-slate-500">利用者名:</span> {payload.data.memberName}</p>
          {payload.data.currentPc && <p><span className="text-slate-500">現在のPC:</span> {payload.data.currentPc}</p>}
          <p><span className="text-slate-500">変更後:</span> {payload.data.newPc}</p>
          <p><span className="text-slate-500">変更希望日:</span> {payload.data.effectiveDate}</p>
          {payload.data.notes && <p className="text-slate-600 mt-2">{payload.data.notes}</p>}
        </div>
      );

    case "change_payment":
      return (
        <div className="space-y-2 text-sm">
          <p><span className="text-slate-500">現在の支払方法:</span> {payload.data.currentMethod}</p>
          <p><span className="text-slate-500">変更後:</span> {payload.data.newMethod}</p>
          <p><span className="text-slate-500">変更希望日:</span> {payload.data.effectiveDate}</p>
          {payload.data.bankName && (
            <>
              <p><span className="text-slate-500">銀行名:</span> {payload.data.bankName}</p>
              <p><span className="text-slate-500">口座名義:</span> {payload.data.accountHolder}</p>
            </>
          )}
          {payload.data.notes && <p className="text-slate-600 mt-2">{payload.data.notes}</p>}
        </div>
      );

    case "change_bank":
      return (
        <div className="space-y-2 text-sm">
          <p><span className="text-slate-500">銀行名:</span> {payload.data.bankName}</p>
          <p><span className="text-slate-500">支店名:</span> {payload.data.branchName}</p>
          <p><span className="text-slate-500">口座種別:</span> {payload.data.accountType}</p>
          <p><span className="text-slate-500">口座番号:</span> {payload.data.accountNumber}</p>
          <p><span className="text-slate-500">口座名義:</span> {payload.data.accountHolder}</p>
          <p><span className="text-slate-500">反映予定日:</span> {payload.data.effectiveDate}</p>
          {payload.data.notes && <p className="text-slate-600 mt-2">{payload.data.notes}</p>}
        </div>
      );

    case "other":
      return (
        <div className="space-y-2 text-sm">
          <p><span className="text-slate-500">件名:</span> {payload.data.subject}</p>
          {payload.data.category && <p><span className="text-slate-500">カテゴリ:</span> {payload.data.category}</p>}
          {payload.data.urgency && (
            <p><span className="text-slate-500">緊急度:</span> {
              payload.data.urgency === "high" ? "高" :
              payload.data.urgency === "medium" ? "中" : "低"
            }</p>
          )}
          <p className="text-slate-600 mt-2 whitespace-pre-wrap">{payload.data.details}</p>
        </div>
      );

    default:
      return null;
  }
};

export const RequestHistory = ({ requests }: RequestHistoryProps) => {
  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 shadow-sm text-center">
        <p className="text-slate-400 text-lg">申請履歴はまだありません</p>
        <p className="text-slate-500 text-sm mt-2">新しい申請を作成してください</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => {
        const typeInfo = getRequestTypeInfo(request.requestType);
        const statusInfo = statusConfig[request.status];

        return (
          <article key={request.id} className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{typeInfo?.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold">{typeInfo?.label}</h3>
                  <p className="text-xs text-slate-500">
                    申請日: {formatDate(request.submittedAt)}
                  </p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${statusInfo.className}`}>
                {statusInfo.label}
              </span>
            </div>

            <div className="border-t border-slate-100 pt-4 mb-4">
              <RequestDetailContent request={request} />
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-500">
              <p>申請者: {request.submittedBy}</p>
              {request.reviewedAt && (
                <p>確認日時: {formatDate(request.reviewedAt)} ({request.reviewedBy})</p>
              )}
              {request.completedAt && (
                <p>完了日時: {formatDate(request.completedAt)}</p>
              )}
              {request.effectiveDate && (
                <p className="font-semibold text-slate-700">反映予定日: {request.effectiveDate}</p>
              )}
              {request.adminNotes && (
                <p className="bg-blue-50 text-blue-700 p-3 rounded-lg mt-2">
                  運営メモ: {request.adminNotes}
                </p>
              )}
              {request.rejectionReason && (
                <p className="bg-red-50 text-red-700 p-3 rounded-lg mt-2">
                  却下理由: {request.rejectionReason}
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};
