import { TransactionVersion } from '@solana/web3.js';
import { Nft } from './Nft';

export enum CandyMachineProgram {
  V2 = 'v2',
  V3 = 'v3',
}

export type PaginatedNftResponse = {
  nfts: Nft[];
  page: number;
  size: number;
  total_data: number;
  total_page: number;
};
export type BulkItemSettings = {
  readonly name: string;
  readonly uri: string;
};

export type ItemSettings = {
  readonly prefixName: string;
  readonly nameLength: number;
  readonly prefixUri: string;
  readonly uriLength: number;
  readonly isSequential: boolean;
};

type Option<T> = T | null;

export type CandyMachineGuard = {
  [name: string]: Option<object>;
};

export type CandyMachineGroup = {
  label: string;
  guards: CandyMachineGuard;
};

export type CandyMachineItem = {
  name: string;
  uri: string;
};

export type CreateCandyMachineResp = {
  encoded_transaction: string;
  candy_machine: string;
  signers: string[];
};

export type InsertCandyMachineResp = {
  encoded_transaction: string;
  signers: string[];
};

export type MintCandyMachineResp = {
  encoded_transaction: string;
  transaction_version: TransactionVersion;
  mint: string;
  signers: string[];
};
