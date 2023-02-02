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

type ActionSummary = Omit<Omit<Action, 'indices'>, 'name'>;

type ProtocolDetails = {
  name: string;
};

export type ParsedTranaction = {
  timestamp?: string;
  fee?: number;
  fee_payer: string;
  actions?: ActionSummary[];
  signatures: string[];
  protocols?: Map<string, ProtocolDetails>;
  signers: string[];
};
