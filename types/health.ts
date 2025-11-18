export type HealthMetric = {
  label: string;
  value: string;
  note: string;
};

export type HealthCalendarState = "none" | "entry" | "strong" | "warning";

export type HealthCalendarCell = {
  day: number;
  state?: HealthCalendarState;
};

export type HealthPageData = {
  metrics: HealthMetric[];
  games: string[];
  calendar: HealthCalendarCell[];
  comment: string;
};
