import type { ChangeRequest, ChangeRequestPageData, RequestTypeInfo } from "@/types/changeRequest";

/**
 * 申請タイプのメタ情報
 */
export const requestTypeInfoList: RequestTypeInfo[] = [
  {
    type: "add_member",
    label: "利用者追加",
    description: "新しい利用者を追加します",
    icon: "👤",
    estimatedDays: 5,
    effectiveDateRule: "申請確認後、最短5営業日で環境構築を実施します"
  },
  {
    type: "remove_member",
    label: "利用者解除",
    description: "利用者の登録を解除します",
    icon: "👋",
    estimatedDays: 3,
    effectiveDateRule: "指定日をもって利用終了となります"
  },
  {
    type: "change_game",
    label: "ゲーム変更",
    description: "フォーカスゲームを変更します",
    icon: "🎮",
    estimatedDays: 3,
    effectiveDateRule: "原則、翌月1日から反映されます"
  },
  {
    type: "change_pc",
    label: "利用PC変更",
    description: "利用者の割り当てPCを変更します",
    icon: "💻",
    estimatedDays: 2,
    effectiveDateRule: "環境構築後、即日反映可能です"
  },
  {
    type: "change_payment",
    label: "支払い方法変更",
    description: "月額料金の支払い方法を変更します",
    icon: "💳",
    estimatedDays: 7,
    effectiveDateRule: "翌月1日から新しい支払い方法が適用されます"
  },
  {
    type: "change_bank",
    label: "工賃振込口座変更",
    description: "工賃の振込先口座を変更します",
    icon: "🏦",
    estimatedDays: 3,
    effectiveDateRule: "翌月の工賃振込から新しい口座へ振込されます"
  },
  {
    type: "other",
    label: "その他お問い合わせ",
    description: "上記以外のご相談・お問い合わせ",
    icon: "💬",
    estimatedDays: 3,
    effectiveDateRule: "内容に応じて対応いたします"
  }
];

/**
 * モック申請履歴データ
 */
export const mockChangeRequests: ChangeRequest[] = [
  {
    id: "req_001",
    facilityId: "facility_demo",
    requestType: "add_member",
    status: "completed",
    payload: {
      type: "add_member",
      data: {
        memberName: "山田太郎",
        memberNameKana: "ヤマダタロウ",
        birthDate: "1995-04-15",
        startDate: "2024-11-01",
        pcAssignment: "PC-03",
        focusGame: "ピラミッドソリティア",
        notes: "初回利用です。よろしくお願いします。"
      }
    },
    submittedAt: "2024-10-20T10:30:00",
    submittedBy: "鈴木花子（施設長）",
    reviewedAt: "2024-10-21T14:00:00",
    reviewedBy: "RevelApp運営",
    completedAt: "2024-10-25T16:00:00",
    effectiveDate: "2024-11-01",
    adminNotes: "環境構築完了。AnyDeskでリモートセットアップ実施済み。"
  },
  {
    id: "req_002",
    facilityId: "facility_demo",
    requestType: "change_game",
    status: "approved",
    payload: {
      type: "change_game",
      data: {
        memberId: "member_001",
        memberName: "佐藤健",
        currentGame: "ハーツ",
        newGame: "ジン・ラミー",
        effectiveDate: "2024-12-01",
        notes: "本人の希望により変更します"
      }
    },
    submittedAt: "2024-11-15T09:15:00",
    submittedBy: "鈴木花子（施設長）",
    reviewedAt: "2024-11-16T11:00:00",
    reviewedBy: "RevelApp運営",
    effectiveDate: "2024-12-01",
    adminNotes: "12/1のメンテナンスで反映予定"
  },
  {
    id: "req_003",
    facilityId: "facility_demo",
    requestType: "change_bank",
    status: "reviewing",
    payload: {
      type: "change_bank",
      data: {
        bankName: "みずほ銀行",
        branchName: "渋谷支店",
        accountType: "普通",
        accountNumber: "1234567",
        accountHolder: "シャカイフクシホウジン サクラカイ",
        effectiveDate: "2024-12-01",
        notes: "法人口座に変更します"
      }
    },
    submittedAt: "2024-11-18T14:20:00",
    submittedBy: "鈴木花子（施設長）",
    reviewedAt: "2024-11-19T10:00:00",
    reviewedBy: "RevelApp運営",
    effectiveDate: "2024-12-01"
  },
  {
    id: "req_004",
    facilityId: "facility_demo",
    requestType: "other",
    status: "pending",
    payload: {
      type: "other",
      data: {
        subject: "PCの動作が遅い件について",
        category: "技術サポート",
        details: "PC-02の動作が最近遅くなっているように感じます。メモリ不足の可能性はありますか？",
        urgency: "medium"
      }
    },
    submittedAt: "2024-11-20T16:45:00",
    submittedBy: "田中一郎（職員）",
    effectiveDate: "2024-11-20"
  },
  {
    id: "req_005",
    facilityId: "facility_demo",
    requestType: "remove_member",
    status: "rejected",
    payload: {
      type: "remove_member",
      data: {
        memberId: "member_003",
        memberName: "高橋美咲",
        endDate: "2024-10-31",
        reason: "転所のため",
        notes: "10月末で転所が決まりました"
      }
    },
    submittedAt: "2024-10-15T11:00:00",
    submittedBy: "鈴木花子（施設長）",
    reviewedAt: "2024-10-16T09:30:00",
    reviewedBy: "RevelApp運営",
    effectiveDate: "2024-10-31",
    rejectionReason: "契約期間中のため、月末解約が適用されます。11/30での解除で再申請をお願いします。"
  }
];

/**
 * モック：変更申請ページデータ
 */
export const mockChangeRequestPageData: ChangeRequestPageData = {
  requests: mockChangeRequests,

  availableGames: [
    "ピラミッドソリティア",
    "フリーセル",
    "スパイダーソリティア",
    "ハーツ",
    "ジン・ラミー",
    "クロンダイク"
  ],

  availablePCs: [
    "PC-01",
    "PC-02",
    "PC-03",
    "PC-04",
    "PC-05"
  ],

  currentMembers: [
    {
      id: "member_001",
      name: "佐藤健",
      currentGame: "ハーツ",
      currentPc: "PC-01"
    },
    {
      id: "member_002",
      name: "伊藤由美",
      currentGame: "ピラミッドソリティア",
      currentPc: "PC-02"
    },
    {
      id: "member_003",
      name: "高橋美咲",
      currentGame: "フリーセル",
      currentPc: "PC-03"
    },
    {
      id: "member_004",
      name: "中村誠",
      currentGame: "スパイダーソリティア",
      currentPc: "PC-04"
    }
  ],

  currentPaymentMethod: "銀行振込",

  guidelines: requestTypeInfoList.map(info => ({
    type: info.type,
    title: info.label,
    description: info.description,
    processingTime: `${info.estimatedDays}営業日`
  }))
};
