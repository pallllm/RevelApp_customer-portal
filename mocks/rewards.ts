import type { RewardsPageData } from "@/types/rewards";

export const mockRewardsData: RewardsPageData = {
  facilityId: 1,
  period: { year: 2024, quarter: "Q3" },
  summary: {
    year: 2024,
    quarter: "Q3",
    surveyRate: 999,
    averagePerformance: 4.3,
    topPerformers: 43,
    improvementRate: 78
  },
  members: [
    {
      name: "佐藤 ",
      points: 12420,
      unit: 1.5,
      amount: 18630,
      status: "paid"
    },
    {
      name: "村上 花",
      points: 8200,
      unit: 1.2,
      amount: 9840,
      status: "fixed"
    },
    {
      name: "木村 大",
      points: 3000,
      unit: 1.0,
      amount: 3000,
      status: "temp"
    }
  ],
  invoices: [
    {
      yearMonth: "2024-11",
      rewardTotal: 18630 + 9840 + 3000,
      detailUrl: "#",
      invoiceUrl: "#",
      status: "issued"
    },
    {
      yearMonth: "2024-10",
      rewardTotal: 15000,
      detailUrl: "#",
      invoiceUrl: "#",
      status: "confirmed"
    },
    {
      yearMonth: "2024-09",
      rewardTotal: 12000,
      detailUrl: "#",
      invoiceUrl: "#",
      status: "pending"
    }
  ]
};
