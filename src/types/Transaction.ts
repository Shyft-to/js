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
