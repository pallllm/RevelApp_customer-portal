import { fetchFromWp } from "@/lib/apiClient";
import { mockHomeData, mockSupportData } from "@/lib/mocks";
import { mockChangeRequestPageData } from "@/mocks/changeRequest";
import { HomeData, SupportData } from "@/types/portal";
import type { ChangeRequestPageData } from "@/types/changeRequest";

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

export const getSupportData = async (): Promise<SupportData> => {
  if (useMocks) return mockSupportData;
  return fetchFromWp<SupportData>("/settings/support-links");
};

export const getChangeRequestData = async (): Promise<ChangeRequestPageData> => {
  if (useMocks) return mockChangeRequestPageData;
  return fetchFromWp<ChangeRequestPageData>(`/change-requests${buildQuery()}`);
};
