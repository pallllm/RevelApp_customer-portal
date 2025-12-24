/**
 * 変更申請機能の型定義
 * 設計書 5章に基づく
 */

export type ChangeRequestType =
  | "add_member"      // 利用者追加
  | "remove_member"   // 利用者解除
  | "change_game"     // ゲーム変更（フォーカス）
  | "change_pc"       // 利用PC変更
  | "change_payment"  // 支払い方法変更
  | "change_bank"     // 工賃振込口座変更
  | "other";          // その他問い合わせ

export type ChangeRequestStatus =
  | "pending"      // 申請中（未確認）
  | "reviewing"    // 確認中
  | "approved"     // 承認済み（反映待ち）
  | "completed"    // 完了（反映済み）
  | "rejected";    // 却下

/**
 * 利用者追加の申請データ
 */
export interface AddMemberPayload {
  memberName: string;
  memberNameKana: string;
  birthDate: string;
  startDate: string;       // 利用開始希望日
  pcAssignment?: string;   // 割り当てPC番号
  focusGame?: string;      // フォーカスゲーム
  notes?: string;
}

/**
 * 利用者解除の申請データ
 */
export interface RemoveMemberPayload {
  memberId: string;
  memberName: string;
  endDate: string;         // 利用終了日
  reason: string;          // 解除理由
  notes?: string;
}

/**
 * ゲーム変更の申請データ
 */
export interface ChangeGamePayload {
  memberId: string;
  memberName: string;
  currentGame: string;
  newGame: string;
  effectiveDate: string;   // 変更希望日
  notes?: string;
}

/**
 * 利用PC変更の申請データ
 */
export interface ChangePCPayload {
  memberId: string;
  memberName: string;
  currentPc?: string;
  newPc: string;
  effectiveDate: string;
  notes?: string;
}

/**
 * 支払い方法変更の申請データ
 */
export interface ChangePaymentPayload {
  currentMethod: string;   // 現在の支払い方法
  newMethod: string;       // 新しい支払い方法（銀行振込/クレジットカード/口座振替）
  effectiveDate: string;   // 変更希望日（通常は翌月1日）
  bankName?: string;       // 銀行振込の場合
  accountHolder?: string;
  accountNumber?: string;
  notes?: string;
}

/**
 * 工賃振込口座変更の申請データ
 */
export interface ChangeBankPayload {
  bankName: string;
  branchName: string;
  accountType: string;     // 普通/当座
  accountNumber: string;
  accountHolder: string;
  effectiveDate: string;
  notes?: string;
}

/**
 * その他問い合わせの申請データ
 */
export interface OtherInquiryPayload {
  subject: string;
  category?: string;       // カテゴリ（任意）
  details: string;
  urgency?: "low" | "medium" | "high";
}

/**
 * 申請タイプごとのペイロード型
 */
export type ChangeRequestPayload =
  | { type: "add_member"; data: AddMemberPayload }
  | { type: "remove_member"; data: RemoveMemberPayload }
  | { type: "change_game"; data: ChangeGamePayload }
  | { type: "change_pc"; data: ChangePCPayload }
  | { type: "change_payment"; data: ChangePaymentPayload }
  | { type: "change_bank"; data: ChangeBankPayload }
  | { type: "other"; data: OtherInquiryPayload };

/**
 * 変更申請レコード（共通情報 + type別payload）
 */
export interface ChangeRequest {
  id: string;
  facilityId: string;
  requestType: ChangeRequestType;
  status: ChangeRequestStatus;
  payload: ChangeRequestPayload;

  // メタ情報
  submittedAt: string;     // 申請日時
  submittedBy: string;     // 申請者名
  reviewedAt?: string;     // 確認日時
  reviewedBy?: string;     // 確認者名
  completedAt?: string;    // 完了日時
  effectiveDate?: string;  // 反映予定日（自動計算 or ペイロードから取得）

  // 運営側メモ
  adminNotes?: string;
  rejectionReason?: string;
}

/**
 * 変更申請ページのデータ型
 */
export interface ChangeRequestPageData {
  // 申請履歴
  requests: ChangeRequest[];

  // 新規申請に必要なマスタデータ
  availableGames: string[];        // 選択可能なゲーム一覧
  availablePCs: string[];          // 選択可能なPC番号一覧
  currentMembers: {                // 現在の利用者一覧
    id: string;
    name: string;
    currentGame?: string;
    currentPc?: string;
  }[];

  // 契約情報（支払い方法変更に必要）
  currentPaymentMethod?: string;

  // ガイド情報
  guidelines?: {
    type: ChangeRequestType;
    title: string;
    description: string;
    processingTime: string;        // 処理期間の目安
  }[];
}

/**
 * フォームステップの型
 */
export interface FormStep {
  stepNumber: number;
  title: string;
  description?: string;
  isCompleted: boolean;
}

/**
 * 申請タイプのメタ情報
 */
export interface RequestTypeInfo {
  type: ChangeRequestType;
  label: string;
  description: string;
  icon: string;              // アイコンクラス or emoji
  estimatedDays: number;     // 処理日数の目安
  effectiveDateRule: string; // 反映日のルール説明
}
