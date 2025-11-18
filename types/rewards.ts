export type RewardSummary = {
  year: number;
  quarter: string;
  surveyRate: number;
  averagePerformance: number;
  topPerformers: number;
  improvementRate: number;
};

export type RewardMemberRow = {
  name: string;
  points: number;
  unit: number;
  amount: number;
  status: "paid" | "fixed" | "temp";
};

export type RewardInvoiceRow = {
  yearMonth: string;
  rewardTotal: number;
  detailUrl: string;
  invoiceUrl: string;
  status: "issued" | "confirmed" | "pending";
};

export type RewardsPageData = {
  facilityId: number;
  period: {
    year: number;
    quarter: string;
  };
  summary: RewardSummary;
  members: RewardMemberRow[];
  invoices: RewardInvoiceRow[];
};
