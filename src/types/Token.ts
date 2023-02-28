export type TokenInfo = {
  name: string;
  symbol: string;
  image: string;
  address: string;
  mint_authority: string;
  freeze_authority: string;
  current_supply: number;
  decimals: number;
};

type TokenOwner = {
  ata: string;
  amount: number;
  owner: string;
  rank: number;
};

export type TokenOwners = {
  owners: TokenOwner[];
  total: number;
  limit: number;
  offset: number;
};

export type ServiceCharge = {
  receiver: string;
  token?: string;
  amount: number;
};