import { NftMetadata } from '.';

type TokenMetadata = {
  name: string;
  symbol: string;
  image: string;
};

export type TokenBalance = {
  address: string;
  balance: number;
  associated_account: string;
  info: TokenMetadata;
};

export type Portfolio = {
  sol_balance: number;
  num_tokens: number;
  tokens: Omit<TokenBalance, 'info'>[];
  num_nfts: number;
  nfts: NftMetadata[];
};

export type Domain = {
  address: string;
  name: string;
};
