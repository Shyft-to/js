import { Transaction } from '@solana/web3.js';
import { Network } from './Network';

export interface ShyftWallet {
  signTransaction(tx: Transaction): Promise<Transaction>;
  signAllTransactions(transaction: Transaction[]): Promise<Transaction[]>;
}

export type ShyftSettings = {
  apiKey: string;
  network: Network;
};
