import { Network } from './Network';
import { TxnAction } from './Transaction';

export type CallBack = {
  id: string;
  network: Network;
  addresses: string[];
  callback_url: string;
  events: TxnAction & 'ANY'[];
  enable_raw?: boolean;
  enable_events?: boolean;
  type?: CallbackType;
  encoding?: CallbackEncoding;
  created_at: Date;
  updated_at: Date;
};

export type CallbackType = 'DISCORD' | 'CALLBACK' | 'ACCOUNT';
export type CallbackEncoding = 'RAW' | 'PARSED';
