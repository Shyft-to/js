import { ParsedTransactionWithMeta } from '@solana/web3.js';

enum TxnAction {
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
  EXTEND_LOAN = 'EXTEND_LOAN',
  EXTEND_ESCROW_LOAN = 'EXTEND_ESCROW_LOAN',
  MEMO = 'MEMO',
  SWAP = 'SWAP',
  CREATE_POOL = 'CREATE_POOL',
  ADD_LIQUIDITY = 'ADD_LIQUIDITY',
  REMOVE_LIQUIDITY = 'REMOVE_LIQUIDITY',
  CREATE_RAFFLE = 'CREATE_RAFFLE',
  BUY_TICKETS = 'BUY_TICKETS',
  REVEAL_WINNERS = 'REVEAL_WINNERS',
  CLAIM_PRIZE = 'CLAIM_PRIZE',
  CLOSE_RAFFLE = 'CLOSE_RAFFLE',
  CANCEL_RAFFLE = 'CANCEL_RAFFLE',
  CREATE_TREE = 'CREATE_TREE',
  COMPRESSED_NFT_MINT = 'COMPRESSED_NFT_MINT',
  COMPRESSED_NFT_TRANSFER = 'COMPRESSED_NFT_TRANSFER',
  COMPRESSED_NFT_BURN = 'COMPRESSED_NFT_BURN',
  UNKNOWN = 'UNKNOWN',
}

type Condition = {
  actionName: string;
  fieldUpdates: {
    original: string;
    new: string;
  };
};

type Action = {
  name: string[];
  type?: TxnAction;
  info: any;
  indices: string[];
  conditions?: Condition[];
};

type ActionBrief = Omit<Omit<Action, 'indices'>, 'name'>;

type ProtocolDetails = {
  name: string;
};

export type ParsedTranaction = {
  timestamp?: string;
  fee?: number;
  fee_payer: string;
  actions?: ActionBrief[];
  signatures: string[];
  protocols?: Map<string, ProtocolDetails>;
  signers: string[];
};

type EasyProtocol = {
  address: string;
  name: string;
};

type SimplifiedTxnInfo = {
  timestamp: string;
  fee: number;
  fee_payer: string;
  signatures: string[];
  signers: string[];
  type: string;
  protocol: EasyProtocol;
};

type ActionSummary<T> = {
  info: T;
  source_protocol: string;
  parent_protocol?: string;
  type: string;
  tags?: string[];
};

type NeatActionSummary<T> = Omit<ActionSummary<T>, 'tags'>;

export type ParsedTxnSummary = SimplifiedTxnInfo & {
  actions: NeatActionSummary<any>[];
};

export type RawTransaction = ParsedTransactionWithMeta & {
  parsed: ParsedTxnSummary;
};

export type TransactionHistory = (ParsedTxnSummary & {
  raw?: ParsedTransactionWithMeta;
})[];
