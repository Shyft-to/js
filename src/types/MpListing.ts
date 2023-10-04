import { TransactionVersion } from '@solana/web3.js';
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
  purchase_receipt?: string;
  cancelled_at?: Date;
  purchased_at?: Date;
};

export type ActiveListings = {
  data: Omit<
    ListedNftDetail,
    'cancelled_at' | 'purchased_at' | 'purchase_receipt'
  >[];
  page: number;
  size: number;
  total_data: number;
  total_page: number;
};

export type NftListResponse = {
  network: Network;
  marketplace_address: string;
  seller_address: string;
  price: number;
  nft_address: string;
  list_state: string;
  currency_symbol: string;
  encoded_transaction: string;
};

export type NftBuyResponse = {
  network: Network;
  marketplace_address: string;
  seller_address: string;
  price: number;
  nft_address: string;
  purchase_receipt?: string;
  currency_symbol: string;
  buyer_address: string;
  encoded_transaction: string;
  transaction_version: TransactionVersion;
};

export type ActiveListingSortBy = 'list_date' | 'price';
export type ActiveListingSortOrder = 'asc' | 'desc';
