"use client";

import { useState } from "react";
import { RequestHistory } from "@/components/RequestHistory";
import { ChangeRequestForm } from "@/components/ChangeRequestForm";
import { mockChangeRequestPageData } from "@/mocks/changeRequest";

const ChangeRequestPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [pageData, setPageData] = useState(mockChangeRequestPageData);

  const handleSubmit = (submissionData: any) => {
    // 実際のAPIコールはここで実施
    // await submitChangeRequest(submissionData);

    // モックでは新しい申請をリストに追加
    const newRequest = {
      id: `req_${Date.now()}`,
      facilityId: "facility_demo",
      requestType: submissionData.type,
      status: "pending" as const,
      payload: {
        type: submissionData.type,
        data: submissionData.data
      },
      submittedAt: submissionData.submittedAt,
      submittedBy: submissionData.submittedBy
    };

    setPageData(prev => ({
      ...prev,
      requests: [newRequest, ...prev.requests]
    }));

    setShowForm(false);

    // 成功メッセージを表示（実際はトーストなどで実装）
    alert("申請を送信しました。運営チームが確認後、対応いたします。");
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4 justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">変更申請</p>
          <h1 className="text-3xl font-bold mt-1">変更申請・お問い合わせ</h1>
          <p className="text-slate-500 mt-2">
            契約内容の変更やご相談がある場合は、こちらから申請してください
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow-sm"
          >
            + 新規申請
          </button>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100">
        <h2 className="font-semibold text-lg mb-3 text-blue-900">申請について</h2>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>申請内容は運営チームが確認後、対応いたします</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>処理期間は申請内容によって異なります（目安：2〜7営業日）</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>申請のステータスは下記の履歴からご確認いただけます</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>緊急のご連絡は、お電話またはメールでお願いします</span>
          </li>
        </ul>
      </div>

      {showForm ? (
        <ChangeRequestForm
          pageData={pageData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">申請履歴</h2>
            <div className="flex gap-2 text-sm">
              <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200">
                すべて
              </button>
              <button className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">
                申請中
              </button>
              <button className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">
                完了
              </button>
            </div>
          </div>

          <RequestHistory requests={pageData.requests} />
        </>
      )}
    </div>
  );
};

export default ChangeRequestPage;
