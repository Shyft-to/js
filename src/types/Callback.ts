import { Network } from './Network';

export enum TxnAction {
  NFT_MINT = 'NFT_MINT',
  TOKEN_MINT = 'TOKEN_MINT',
  TOKEN_CREATE = 'TOKEN_CREATE',
  SOL_TRANSFER = 'SOL_TRANSFER',
  TOKEN_TRANSFER = 'TOKEN_TRANSFER',
  NFT_TRANSFER = 'NFT_TRANSFER',
  NFT_BURN = 'NFT_BURN',
  TOKEN_BURN = 'TOKEN_BURN',
  NFT_SALE = 'NFT_SALE',
  NFT_BID = 'NFT_BID',
  NFT_BID_CANCEL = 'NFT_BID_CANCEL',
  NFT_LIST = 'NFT_LIST',
  NFT_LIST_UPDATE = 'NFT_LIST_UPDATE',
  NFT_LIST_CANCEL = 'NFT_LIST_CANCEL',
  MARKETPLACE_WITHDRAW = 'MARKETPLACE_WITHDRAW',
  OFFER_LOAN = 'OFFER_LOAN',
  CANCEL_LOAN = 'CANCEL_LOAN',
  TAKE_LOAN = 'TAKE_LOAN',
  REPAY_LOAN = 'REPAY_LOAN',
  FORECLOSE_LOAN = 'FORECLOSE_LOAN',
  REPAY_ESCROW_LOAN = 'REPAY_ESCROW_LOAN',
  MEMO = 'MEMO',
  SWAP = 'SWAP',
  UNKNOWN = 'UNKNOWN',
}

export type CallBack = {
  id: string;
  network: Network;
  addresses: string[];
  callback_url: string;
  events: TxnAction & 'ANY'[];
  enable_raw: boolean;
};
