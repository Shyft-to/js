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
