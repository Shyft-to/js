import { Transaction } from '@solana/web3.js';
import { Wallet } from '@solana/wallet-adapter-react';

export interface ShyftWallet {
  wallet: Wallet;
  signTransaction(tx: Transaction): Promise<Transaction>;
  signAllTransactions?(txs: Transaction[]): Promise<Transaction[]>;
}