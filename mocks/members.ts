import type { MembersPageData } from "@/types/members";

export const mockMembersData: MembersPageData = {
  planNotes: [
    { label: "エントリー：非表示", tone: "slate" },
    { label: "フレキシブル：一覧のみ", tone: "blue" },
    { label: "フォーカス：ゲーム情報付き", tone: "emerald" }
  ],
  records: [
    {
      name: "佐藤 光",
      nickname: "みっちー",
      sheetLabel: "セルフモニタリング #23",
      inputFormat: "スマホ入力",
      durationLabel: "2022/08〜（24ヶ月）",
      status: { label: "利用中", tone: "emerald" },
      games: ["Axie", "ElfForest"]
    },
    {
      name: "村上 花",
      nickname: "ハナ",
      sheetLabel: "セルフモニタリング #31",
      inputFormat: "代理入力（スタッフ）",
      durationLabel: "2024/04〜（6ヶ月）",
      status: { label: "12月で登録解除", tone: "yellow" },
      games: ["Puzzle Quest"]
    },
    {
      name: "木村 大",
      nickname: "だいちゃん",
      sheetLabel: "セルフモニタリング #12",
      inputFormat: "紙入力",
      durationLabel: "2024/12開始予定",
      status: { label: "1月から開始", tone: "slate" },
      games: []
    }
  ]
};
