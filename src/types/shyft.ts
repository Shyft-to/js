import { Transaction } from '@solana/web3.js';
import { Wallet } from '@solana/wallet-adapter-react';
import { Network } from './Network';

export interface ShyftWallet {
  wallet: Wallet;
  signTransaction(tx: Transaction): Promise<Transaction>;
  signAllTransactions?(txs: Transaction[]): Promise<Transaction[]>;
}

export type ShyftSettings = {
  apiKey: string;
  network: Network;
};
