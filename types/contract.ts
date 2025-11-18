export type ContractEntry = {
  label: string;
  value: string;
};

export type ContractSection = {
  title: string;
  entries: ContractEntry[];
};

export type ContractPageData = {
  basic: ContractSection;
  contacts: ContractSection;
  plan: ContractSection;
  note: string;
};
