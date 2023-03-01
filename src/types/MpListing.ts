import { Network } from './Network';
import { Nft } from './Nft';

export enum NftStatus {
  Stale = 'stale',
  Active = 'active',
}

export type ListedNftDetail = {
  network: Network;
  marketplace_address: string;
  seller_address: string;
  price: number;
  currency_symbol: string;
  nft_address: string;
  nft: Nft;
  list_state: string;
  status: NftStatus;
  created_at: Date;
  receipt: string;
};

export type ActiveListings = {
  data: ListedNftDetail[];
  page: number;
  size: number;
  total_data: number;
  total_page: number;
};
