export type TokenInfo = {
  name: string;
  symbol: string;
  image: string;
  address: string;
  mintAuthority: string;
  freezeAuthority: string;
  currentSupply: number;
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
