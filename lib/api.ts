import { mockContractData } from "@/mocks/contract";
import { mockHealthData } from "@/mocks/health";
import { mockMembersData } from "@/mocks/members";
import { mockRewardsData } from "@/mocks/rewards";
import type { ContractPageData } from "@/types/contract";
import type { HealthPageData } from "@/types/health";
import type { MembersPageData } from "@/types/members";
import type { RewardsPageData } from "@/types/rewards";

export async function fetchRewardsData(facilityId: number): Promise<RewardsPageData> {
  void facilityId;
  return mockRewardsData;
}

export async function fetchMembersData(facilityId: number): Promise<MembersPageData> {
  void facilityId;
  return mockMembersData;
}

export async function fetchHealthGraphData(facilityId: number): Promise<HealthPageData> {
  void facilityId;
  return mockHealthData;
}

export async function fetchContractData(facilityId: number): Promise<ContractPageData> {
  void facilityId;
  return mockContractData;
}
