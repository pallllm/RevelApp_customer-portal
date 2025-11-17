import { fetchFromWp } from "@/lib/apiClient";
import {
  mockContractData,
  mockHealthData,
  mockHomeData,
  mockMembersData,
  mockRewardData,
  mockSupportData
} from "@/lib/mocks";
import {
  ContractData,
  HealthGraphData,
  HomeData,
  MembersData,
  RewardData,
  SupportData
} from "@/types/portal";

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";

const ensureFacilityId = () => {
  const facilityId = process.env.NEXT_PUBLIC_FACILITY_ID ?? process.env.FACILITY_ID;
  if (!facilityId) {
    throw new Error("Facility ID が設定されていません。NEXT_PUBLIC_FACILITY_ID もしくは FACILITY_ID を設定してください。");
  }
  return facilityId;
};

const buildQuery = (params?: Record<string, string | undefined>) => {
  const search = new URLSearchParams({ facility_id: ensureFacilityId() });
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });
  return `?${search.toString()}`;
};

export const getHomeData = async (): Promise<HomeData> => {
  if (useMocks) return mockHomeData;
  return fetchFromWp<HomeData>(`/home-summary${buildQuery()}`);
};

export const getMembersData = async (): Promise<MembersData> => {
  if (useMocks) return mockMembersData;
  return fetchFromWp<MembersData>(`/members${buildQuery()}`);
};

export const getHealthGraphData = async (): Promise<HealthGraphData> => {
  if (useMocks) return mockHealthData;
  const defaultYear = process.env.NEXT_PUBLIC_DEFAULT_YEAR ?? "2024";
  const defaultMonth = process.env.NEXT_PUBLIC_DEFAULT_MONTH ?? "11";
  const defaultMemberId = process.env.NEXT_PUBLIC_DEFAULT_MEMBER_ID;
  return fetchFromWp<HealthGraphData>(
    `/health-stats${buildQuery({
      year: defaultYear,
      month: defaultMonth,
      member_id: defaultMemberId
    })}`
  );
};

export const getRewardData = async (): Promise<RewardData> => {
  if (useMocks) return mockRewardData;
  const defaultPeriod = process.env.NEXT_PUBLIC_DEFAULT_PERIOD ?? "2024-Q3";
  return fetchFromWp<RewardData>(`/rewards${buildQuery({ period: defaultPeriod })}`);
};

export const getContractData = async (): Promise<ContractData> => {
  if (useMocks) return mockContractData;
  return fetchFromWp<ContractData>(`/contract${buildQuery()}`);
};

export const getSupportData = async (): Promise<SupportData> => {
  if (useMocks) return mockSupportData;
  return fetchFromWp<SupportData>("/settings/support-links");
};
