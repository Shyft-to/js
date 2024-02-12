import { ParsedTransactionWithMeta } from '@solana/web3.js';

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
  COMPRESSED_NFT_SALE = 'COMPRESSED_NFT_SALE',
  COMPRESSED_NFT_LIST = 'COMPRESSED_NFT_LIST',
  COMPRESSED_NFT_LIST_CANCEL = 'COMPRESSED_NFT_LIST_CANCEL',
  COMPRESSED_NFT_LIST_UPDATE = 'COMPRESSED_NFT_LIST_UPDATE',
  COMPRESSED_NFT_BID = 'COMPRESSED_NFT_BID',
  COMPRESSED_NFT_BID_CANCEL = 'COMPRESSED_NFT_BID_CANCEL',
  COMPRESSED_NFT_TAKE_BID = 'COMPRESSED_NFT_TAKE_BID',
  OFFER_LOAN = 'OFFER_LOAN',
  CANCEL_LOAN = 'CANCEL_LOAN',
  TAKE_LOAN = 'TAKE_LOAN',
  REPAY_LOAN = 'REPAY_LOAN',
  FORECLOSE_LOAN = 'FORECLOSE_LOAN',
  REPAY_ESCROW_LOAN = 'REPAY_ESCROW_LOAN',
  REQUEST_LOAN = 'REQUEST_LOAN',
  CANCEL_REQUEST_LOAN = 'CANCEL_REQUEST_LOAN',
  EXTEND_LOAN = 'EXTEND_LOAN',
  EXTEND_ESCROW_LOAN = 'EXTEND_ESCROW_LOAN',
  LIQUIDATE_LOAN = 'LIQUIDATE_LOAN',
  BUY_NOW_PAY_LATER = 'BUY_NOW_PAY_LATER',
  MEMO = 'MEMO',
  SWAP = 'SWAP',
  CREATE_POOL = 'CREATE_POOL',
  ADD_LIQUIDITY = 'ADD_LIQUIDITY',
  REMOVE_LIQUIDITY = 'REMOVE_LIQUIDITY',
  COLLECT_FEES = 'COLLECT_FEES',
  COLLECT_REWARD = 'COLLECT_REWARD',
  CREATE_RAFFLE = 'CREATE_RAFFLE',
  UPDATE_RAFFLE = 'UPDATE_RAFFLE',
  BUY_TICKETS = 'BUY_TICKETS',
  REVEAL_WINNERS = 'REVEAL_WINNERS',
  CLAIM_PRIZE = 'CLAIM_PRIZE',
  CLOSE_RAFFLE = 'CLOSE_RAFFLE',
  CANCEL_RAFFLE = 'CANCEL_RAFFLE',
  CREATE_TREE = 'CREATE_TREE',
  COMPRESSED_NFT_MINT = 'COMPRESSED_NFT_MINT',
  COMPRESSED_NFT_TRANSFER = 'COMPRESSED_NFT_TRANSFER',
  COMPRESSED_NFT_BURN = 'COMPRESSED_NFT_BURN',
  CREATE_REALM = 'CREATE_REALM',
  DEPOSIT_GOVERNING_TOKENS = 'DEPOSIT_GOVERNING_TOKENS',
  WITHDRAW_GOVERNING_TOKENS = 'WITHDRAW_GOVERNING_TOKENS',
  SET_GOVERNANCE_DELEGATE = 'SET_GOVERNANCE_DELEGATE',
  CREATE_GOVERNANCE = 'CREATE_GOVERNANCE',
  CREATE_PROGRAM_GOVERNANCE = 'CREATE_PROGRAM_GOVERNANCE',
  CREATE_PROPOSAL = 'CREATE_PROPOSAL',
  ADD_SIGNATORY = 'ADD_SIGNATORY',
  REMOVE_SIGNATORY = 'REMOVE_SIGNATORY',
  INSERT_TRANSACTION = 'INSERT_TRANSACTION',
  REMOVE_TRANSACTION = 'REMOVE_TRANSACTION',
  CANCEL_PROPOSAL = 'CANCEL_PROPOSAL',
  SIGN_OFF_PROPOSAL = 'SIGN_OFF_PROPOSAL',
  CAST_VOTE = 'CAST_VOTE',
  FINALIZE_VOTE = 'FINALIZE_VOTE',
  RELINQUISH_VOTE = 'RELINQUISH_VOTE',
  EXECUTE_TRANSACTION = 'EXECUTE_TRANSACTION',
  CREATE_MINT_GOVERNANCE = 'CREATE_MINT_GOVERNANCE',
  CREATE_TOKEN_GOVERNANCE = 'CREATE_TOKEN_GOVERNANCE',
  SET_GOVERNANCE_CONFIG = 'SET_GOVERNANCE_CONFIG',
  SET_REALM_AUTHORITY = 'SET_REALM_AUTHORITY',
  SET_REALM_CONFIG = 'SET_REALM_CONFIG',
  CREATE_TOKEN_OWNER_RECORD = 'CREATE_TOKEN_OWNER_RECORD',
  POST_MESSAGE = 'POST_MESSAGE',
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

type Event = { name: string; data: any };

export type ParsedTxnSummary = SimplifiedTxnInfo & {
  actions: NeatActionSummary<any>[];
  events?: Array<Event>;
};

export type RawTransaction = ParsedTransactionWithMeta & {
  parsed: ParsedTxnSummary;
};

export type TransactionHistory = (ParsedTxnSummary & {
  raw?: ParsedTransactionWithMeta;
})[];

export type TxnCommitment = 'processed' | 'confirmed' | 'finalized';

type RpcError = {
  code: number;
  message: string;
  data: any;
};

export type SendTransactionResp = {
  id: number | string;
  signature: string;
  error?: RpcError;
  status: TxnCommitment | null;
};
