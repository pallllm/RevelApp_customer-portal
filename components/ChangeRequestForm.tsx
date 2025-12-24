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
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-2">変更申請の種類を選択</h2>
        <p className="text-slate-500 mb-8">申請内容に応じて適切な種類を選択してください</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {requestTypeInfoList.map((info) => (
            <button
              key={info.type}
              onClick={() => handleTypeSelect(info.type)}
              className="text-left p-6 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <div className="text-4xl mb-3">{info.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{info.label}</h3>
              <p className="text-sm text-slate-600 mb-3">{info.description}</p>
              <p className="text-xs text-slate-500">
                処理期間: 約{info.estimatedDays}営業日
              </p>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            キャンセル
          </button>
        </div>
      </div>
    );
  }

  // Step 2: 詳細入力フォーム
  if (step === 2 && selectedType) {
    const typeInfo = requestTypeInfoList.find(info => info.type === selectedType);

    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{typeInfo?.icon}</span>
          <div>
            <h2 className="text-2xl font-bold">{typeInfo?.label}</h2>
            <p className="text-sm text-slate-500">{typeInfo?.effectiveDateRule}</p>
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

        <div className="mt-8 flex gap-4 justify-end">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            戻る
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            確認画面へ
          </button>
        </div>
      </div>
    );
  }

  // Step 3: 確認画面
  if (step === 3 && selectedType) {
    const typeInfo = requestTypeInfoList.find(info => info.type === selectedType);

    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">申請内容の確認</h2>

        <div className="bg-slate-50 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{typeInfo?.icon}</span>
            <h3 className="text-xl font-semibold">{typeInfo?.label}</h3>
          </div>

          <div className="space-y-3 text-sm">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <span className="text-slate-500 min-w-[120px]">{key}:</span>
                <span className="text-slate-800 font-medium">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>ご注意:</strong> 申請内容は運営チームが確認後、反映されます。
            処理期間は約{typeInfo?.estimatedDays}営業日です。
          </p>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            戻る
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-semibold"
          >
            申請を送信
          </button>
        </div>
      </div>
    );
  }

  return null;
};
