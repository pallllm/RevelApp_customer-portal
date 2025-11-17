import home from "@/mocks/home.json";
import members from "@/mocks/members.json";
import health from "@/mocks/health.json";
import rewards from "@/mocks/rewards.json";
import contract from "@/mocks/contract.json";
import support from "@/mocks/support.json";
import {
  ContractData,
  HealthGraphData,
  HomeData,
  MembersData,
  RewardData,
  SupportData
} from "@/types/portal";

export const mockHomeData = home as HomeData;
export const mockMembersData = members as MembersData;
export const mockHealthData = health as HealthGraphData;
export const mockRewardData = rewards as RewardData;
export const mockContractData = contract as ContractData;
export const mockSupportData = support as SupportData;
