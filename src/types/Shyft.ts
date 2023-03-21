import { Transaction, VersionedTransaction } from '@solana/web3.js';
import { Network } from './Network';

export interface SignerWalletAdapterProps {
  signTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T
  ): Promise<T>;
  signAllTransactions<T extends Transaction | VersionedTransaction>(
    transactions: T[] | undefined
  ): Promise<T[]>;
  signMessage(message: Uint8Array): Promise<Uint8Array>;
}

export interface ShyftWallet {
  signTransaction: SignerWalletAdapterProps['signTransaction'] | undefined;
  signAllTransactions:
    | SignerWalletAdapterProps['signAllTransactions']
    | undefined;
  signMessage: SignerWalletAdapterProps['signMessage'] | undefined;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  [key: string]: any;
}

export type ShyftSettings = {
  apiKey: string;
  network: Network;
};
