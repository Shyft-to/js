import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
export const Network = { ...WalletAdapterNetwork };
type ValueOf<T> = T[keyof T];
export type Network = ValueOf<typeof Network>;
