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
    <div className="space-y-8">
      {/* ヘッダーセクション - グラデーション背景 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-3xl p-8 shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white mb-3">
              📝 変更申請
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              変更申請・お問い合わせ
            </h1>
            <p className="text-blue-100 text-lg">
              契約内容の変更やご相談がある場合は、こちらから申請してください
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="group relative px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <span className="text-2xl">+</span>
                <span>新規申請</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </button>
          )}
        </div>
      </div>

      {/* 情報カード - モダンなデザイン */}
      <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
              ℹ️
            </div>
            <h2 className="text-2xl font-bold text-slate-800">申請について</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">✓</div>
              <span className="text-slate-700">申請内容は運営チームが確認後、対応いたします</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
              <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">⏱</div>
              <span className="text-slate-700">処理期間は申請内容によって異なります（目安：2〜7営業日）</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">📊</div>
              <span className="text-slate-700">申請のステータスは下記の履歴からご確認いただけます</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
              <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🚨</div>
              <span className="text-slate-700">緊急のご連絡は、お電話またはメールでお願いします</span>
            </div>
          </div>
        </div>
      </div>

      {showForm ? (
        <ChangeRequestForm
          pageData={pageData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                申請履歴
              </h2>
              <p className="text-slate-500 mt-1">過去の申請状況を確認できます</p>
            </div>
            <div className="flex gap-2">
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                すべて
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-white border-2 border-slate-200 text-slate-600 font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-200">
                申請中
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-white border-2 border-slate-200 text-slate-600 font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-200">
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
