import type { HealthPageData } from "@/types/health";

export const mockHealthData: HealthPageData = {
  metrics: [
    { label: "累計プレイ / 入力回数", value: "128回", note: "前月比 +6%" },
    { label: "平均睡眠時間", value: "6.8 h", note: "前月比 +0.4h" },
    { label: "前月比（気分スコア）", value: "72", note: "+5 / 0〜100 指標" }
  ],
  games: ["Axie Infinity", "ElfForest", "Puzzle Quest", "新規ゲーム"],
  calendar: [
    { day: 1 },
    { day: 2 },
    { day: 3, state: "entry" },
    { day: 4, state: "strong" },
    { day: 5, state: "warning" },
    { day: 6, state: "entry" },
    { day: 7 }
  ],
  comment: "先月に比べて疲労度が安定してきましたね。睡眠時間も改善傾向にあります。"
};
