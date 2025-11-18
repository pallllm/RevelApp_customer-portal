export type BadgeTone = "emerald" | "yellow" | "slate" | "blue";

export type MemberPlanNote = {
  label: string;
  tone: BadgeTone;
};

export type MemberRecord = {
  name: string;
  nickname?: string;
  sheetLabel: string;
  inputFormat: string;
  durationLabel: string;
  status: {
    label: string;
    tone: "emerald" | "yellow" | "slate";
  };
  games: string[];
};

export type MembersPageData = {
  planNotes: MemberPlanNote[];
  records: MemberRecord[];
};
