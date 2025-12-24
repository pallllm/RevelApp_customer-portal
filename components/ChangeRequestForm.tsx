"use client";

import { useState } from "react";
import type { ChangeRequestType, ChangeRequestPageData } from "@/types/changeRequest";
import { requestTypeInfoList } from "@/mocks/changeRequest";

interface ChangeRequestFormProps {
  pageData: ChangeRequestPageData;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const ChangeRequestForm = ({ pageData, onSubmit, onCancel }: ChangeRequestFormProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<ChangeRequestType | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleTypeSelect = (type: ChangeRequestType) => {
    setSelectedType(type);
    setFormData({});
    setStep(2);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setStep(3);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedType(null);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    const submissionData = {
      type: selectedType,
      data: formData,
      submittedAt: new Date().toISOString(),
      submittedBy: "施設ユーザー" // 実際はログインユーザー情報から取得
    };
    onSubmit(submissionData);
  };

  // Step 1: 申請タイプ選択
  if (step === 1) {
    return (
      <div className="relative bg-white rounded-3xl p-10 shadow-xl border border-slate-100 overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-50 -ml-48 -mt-48"></div>

        <div className="relative z-10">
          <div className="mb-10">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-semibold mb-4">
              ステップ 1 / 3
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
              変更申請の種類を選択
            </h2>
            <p className="text-slate-600 text-lg">申請内容に応じて適切な種類を選択してください</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {requestTypeInfoList.map((info) => (
              <button
                key={info.type}
                onClick={() => handleTypeSelect(info.type)}
                className="group relative text-left p-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                {/* カードホバー時の背景 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                    {info.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">
                    {info.label}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{info.description}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>処理期間: 約{info.estimatedDays}営業日</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <button
              onClick={onCancel}
              className="px-8 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: 詳細入力フォーム
  if (step === 2 && selectedType) {
    const typeInfo = requestTypeInfoList.find(info => info.type === selectedType);

    return (
      <div className="relative bg-white rounded-3xl p-10 shadow-xl border border-slate-100 overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-50 -mr-48 -mt-48"></div>

        <div className="relative z-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-semibold mb-4">
              ステップ 2 / 3
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                {typeInfo?.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {typeInfo?.label}
                </h2>
                <p className="text-slate-600 mt-1">{typeInfo?.effectiveDateRule}</p>
              </div>
            </div>
          </div>

        <div className="space-y-6">
          {selectedType === "add_member" && (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">利用者名（漢字）*</label>
                  <input
                    type="text"
                    value={formData.memberName || ""}
                    onChange={(e) => handleInputChange("memberName", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    placeholder="山田太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">利用者名（カナ）*</label>
                  <input
                    type="text"
                    value={formData.memberNameKana || ""}
                    onChange={(e) => handleInputChange("memberNameKana", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    placeholder="ヤマダタロウ"
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">生年月日*</label>
                  <input
                    type="date"
                    value={formData.birthDate || ""}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">利用開始希望日*</label>
                  <input
                    type="date"
                    value={formData.startDate || ""}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">割り当てPC</label>
                  <select
                    value={formData.pcAssignment || ""}
                    onChange={(e) => handleInputChange("pcAssignment", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">選択してください</option>
                    {pageData.availablePCs.map(pc => (
                      <option key={pc} value={pc}>{pc}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">フォーカスゲーム</label>
                  <select
                    value={formData.focusGame || ""}
                    onChange={(e) => handleInputChange("focusGame", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">選択してください</option>
                    {pageData.availableGames.map(game => (
                      <option key={game} value={game}>{game}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">備考</label>
                <textarea
                  value={formData.notes || ""}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  rows={3}
                  placeholder="特記事項があれば記入してください"
                />
              </div>
            </>
          )}

          {selectedType === "remove_member" && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-2">利用者選択*</label>
                <select
                  value={formData.memberId || ""}
                  onChange={(e) => {
                    const member = pageData.currentMembers.find(m => m.id === e.target.value);
                    handleInputChange("memberId", e.target.value);
                    handleInputChange("memberName", member?.name || "");
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">選択してください</option>
                  {pageData.currentMembers.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">利用終了日*</label>
                <input
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">解除理由*</label>
                <select
                  value={formData.reason || ""}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">選択してください</option>
                  <option value="転所">転所</option>
                  <option value="退所">退所</option>
                  <option value="体調不良">体調不良</option>
                  <option value="その他">その他</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">備考</label>
                <textarea
                  value={formData.notes || ""}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  rows={3}
                />
              </div>
            </>
          )}

          {selectedType === "change_game" && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-2">利用者選択*</label>
                <select
                  value={formData.memberId || ""}
                  onChange={(e) => {
                    const member = pageData.currentMembers.find(m => m.id === e.target.value);
                    handleInputChange("memberId", e.target.value);
                    handleInputChange("memberName", member?.name || "");
                    handleInputChange("currentGame", member?.currentGame || "");
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">選択してください</option>
                  {pageData.currentMembers.map(member => (
                    <option key={member.id} value={member.id}>{member.name} (現在: {member.currentGame})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">新しいゲーム*</label>
                <select
                  value={formData.newGame || ""}
                  onChange={(e) => handleInputChange("newGame", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">選択してください</option>
                  {pageData.availableGames.map(game => (
                    <option key={game} value={game}>{game}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">変更希望日*</label>
                <input
                  type="date"
                  value={formData.effectiveDate || ""}
                  onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
                <p className="text-xs text-slate-500 mt-1">※原則、翌月1日から反映されます</p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">備考</label>
                <textarea
                  value={formData.notes || ""}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  rows={3}
                />
              </div>
            </>
          )}

          {selectedType === "change_pc" && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-2">利用者選択*</label>
                <select
                  value={formData.memberId || ""}
                  onChange={(e) => {
                    const member = pageData.currentMembers.find(m => m.id === e.target.value);
                    handleInputChange("memberId", e.target.value);
                    handleInputChange("memberName", member?.name || "");
                    handleInputChange("currentPc", member?.currentPc || "");
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">選択してください</option>
                  {pageData.currentMembers.map(member => (
                    <option key={member.id} value={member.id}>{member.name} (現在: {member.currentPc || "未割当"})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">新しいPC*</label>
                <select
                  value={formData.newPc || ""}
                  onChange={(e) => handleInputChange("newPc", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">選択してください</option>
                  {pageData.availablePCs.map(pc => (
                    <option key={pc} value={pc}>{pc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">変更希望日*</label>
                <input
                  type="date"
                  value={formData.effectiveDate || ""}
                  onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">備考</label>
                <textarea
                  value={formData.notes || ""}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  rows={3}
                />
              </div>
            </>
          )}

          {selectedType === "change_payment" && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-2">現在の支払方法</label>
                <input
                  type="text"
                  value={pageData.currentPaymentMethod || ""}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">新しい支払方法*</label>
                <select
                  value={formData.newMethod || ""}
                  onChange={(e) => handleInputChange("newMethod", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">選択してください</option>
                  <option value="銀行振込">銀行振込</option>
                  <option value="クレジットカード">クレジットカード</option>
                  <option value="口座振替">口座振替</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">変更希望日*</label>
                <input
                  type="date"
                  value={formData.effectiveDate || ""}
                  onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
                <p className="text-xs text-slate-500 mt-1">※翌月1日から新しい支払方法が適用されます</p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">備考</label>
                <textarea
                  value={formData.notes || ""}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  rows={3}
                />
              </div>
            </>
          )}

          {selectedType === "change_bank" && (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">銀行名*</label>
                  <input
                    type="text"
                    value={formData.bankName || ""}
                    onChange={(e) => handleInputChange("bankName", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    placeholder="みずほ銀行"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">支店名*</label>
                  <input
                    type="text"
                    value={formData.branchName || ""}
                    onChange={(e) => handleInputChange("branchName", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    placeholder="渋谷支店"
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">口座種別*</label>
                  <select
                    value={formData.accountType || ""}
                    onChange={(e) => handleInputChange("accountType", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">選択してください</option>
                    <option value="普通">普通</option>
                    <option value="当座">当座</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">口座番号*</label>
                  <input
                    type="text"
                    value={formData.accountNumber || ""}
                    onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    placeholder="1234567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">口座名義（カナ）*</label>
                <input
                  type="text"
                  value={formData.accountHolder || ""}
                  onChange={(e) => handleInputChange("accountHolder", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  placeholder="シャカイフクシホウジン サクラカイ"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">反映希望日*</label>
                <input
                  type="date"
                  value={formData.effectiveDate || ""}
                  onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
                <p className="text-xs text-slate-500 mt-1">※翌月の工賃振込から新しい口座へ振込されます</p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">備考</label>
                <textarea
                  value={formData.notes || ""}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  rows={3}
                />
              </div>
            </>
          )}

          {selectedType === "other" && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-2">件名*</label>
                <input
                  type="text"
                  value={formData.subject || ""}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  placeholder="お問い合わせの件名を入力"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">カテゴリ</label>
                <select
                  value={formData.category || ""}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">選択してください</option>
                  <option value="技術サポート">技術サポート</option>
                  <option value="契約内容">契約内容</option>
                  <option value="請求・支払い">請求・支払い</option>
                  <option value="その他">その他</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">緊急度</label>
                <select
                  value={formData.urgency || ""}
                  onChange={(e) => handleInputChange("urgency", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="low">低</option>
                  <option value="medium">中</option>
                  <option value="high">高</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">詳細*</label>
                <textarea
                  value={formData.details || ""}
                  onChange={(e) => handleInputChange("details", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  rows={6}
                  placeholder="お問い合わせ内容を詳しく記入してください"
                />
              </div>
            </>
          )}
        </div>

          <div className="mt-10 flex gap-4 justify-end">
            <button
              onClick={handleBack}
              className="px-8 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              ← 戻る
            </button>
            <button
              onClick={handleNext}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              確認画面へ →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: 確認画面
  if (step === 3 && selectedType) {
    const typeInfo = requestTypeInfoList.find(info => info.type === selectedType);

    return (
      <div className="relative bg-white rounded-3xl p-10 shadow-xl border border-slate-100 overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full blur-3xl opacity-50 -ml-48 -mt-48"></div>

        <div className="relative z-10">
          {/* ヘッダー */}
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full text-sm font-semibold mb-4">
              ステップ 3 / 3 - 最終確認
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              申請内容の確認
            </h2>
            <p className="text-slate-600">以下の内容で申請します。内容をご確認ください。</p>
          </div>

          {/* 申請内容カード */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 mb-6 border border-slate-200">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                {typeInfo?.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{typeInfo?.label}</h3>
                <p className="text-slate-600 text-sm mt-1">{typeInfo?.description}</p>
              </div>
            </div>

            <div className="grid gap-3">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <span className="text-sm font-semibold text-slate-500 min-w-[140px]">{key}</span>
                  <span className="text-sm font-medium text-slate-800 flex-1">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 注意事項 */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-semibold text-amber-900 mb-2">ご注意</p>
                <p className="text-sm text-amber-800 leading-relaxed">
                  申請内容は運営チームが確認後、反映されます。<br />
                  処理期間は約<strong>{typeInfo?.estimatedDays}営業日</strong>です。<br />
                  申請後、ステータスは申請履歴からご確認いただけます。
                </p>
              </div>
            </div>
          </div>

          {/* ボタン */}
          <div className="flex gap-4 justify-end">
            <button
              onClick={handleBack}
              className="px-8 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              ← 戻る
            </button>
            <button
              onClick={handleSubmit}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              🚀 申請を送信
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
