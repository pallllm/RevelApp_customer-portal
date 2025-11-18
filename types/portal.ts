export type AccentTone = "emerald" | "yellow" | "slate" | "blue" | "orange";

export interface StatCard {
  label: string;
  value: string;
  note: string;
}

export interface CalendarBadge {
  label: string;
  color: Exclude<AccentTone, "yellow">;
}

export interface CalendarCell {
  day: number;
  badges?: CalendarBadge[];
}

export interface TimelineItem {
  dateLabel: string;
  title: string;
  description: string;
}

export interface ManualVideo {
  title: string;
  duration: string;
  url: string;
}

export interface HybridInfo {
  wordpress: string[];
  webapp: string[];
  note: string;
}

export interface HomeData {
  renewalInfo: string;
  statCards: StatCard[];
  calendarCells: CalendarCell[];
  timeline: TimelineItem[];
  manualVideos: ManualVideo[];
  hybridInfo: HybridInfo;
}

export interface MemberRecord {
  name: string;
  nickname?: string;
  sheetLabel: string;
  inputFormat: string;
  durationLabel: string;
  status: {
    label: string;
    tone: AccentTone;
  };
  games: string[];
}

export interface MembersData {
  memberPlanNotes: {
    label: string;
    tone: AccentTone;
  }[];
  records: MemberRecord[];
}

export interface HealthMetric {
  label: string;
  value: string;
  note: string;
}

export interface HealthGraphData {
  metrics: HealthMetric[];
  playedGames: string[];
  calendarCells: CalendarCell[];
  comment: string;
}

export interface RewardKpi {
  label: string;
  value: string;
  note: string;
}

export interface RewardMemberRow {
  name: string;
  points: string;
  unitPrice: string;
  rewardAmount: string;
  status: {
    label: string;
    tone: AccentTone;
  };
}

export interface RewardDocRow {
  period: string;
  detailUrl: string;
  invoiceUrl: string;
  status: {
    label: string;
    tone: AccentTone;
  };
}

export interface RewardData {
  kpis: RewardKpi[];
  memberRows: RewardMemberRow[];
  docRows: RewardDocRow[];
}

export interface ContractCard {
  title: string;
  entries: {
    label: string;
    value: string;
  }[];
}

export interface ContractData {
  contractInfo: ContractCard;
  contacts: ContractCard;
  plan: ContractCard;
  note: string;
}

export interface SupportLink {
  title: string;
  description: string;
  url: string;
}

export interface SupportData {
  links: SupportLink[];
}
