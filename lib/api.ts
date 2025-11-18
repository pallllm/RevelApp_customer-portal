import { mockRewardsData } from "@/mocks/rewards";
import type { RewardsPageData } from "@/types/rewards";

export async function fetchRewardsData(facilityId: number): Promise<RewardsPageData> {
  void facilityId;
  return mockRewardsData;
}
