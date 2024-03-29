import { from } from 'form-data';

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type ApiVersion = 'v1' | 'v2';

export * from './Shyft';
export * from './Error';
export * from './Network';
export * from './Nft';
export * from './Wallet';
export * from './Transaction';
export * from './Token';
export * from './CandyMachine';
export * from './Marketplace';
export * from './MpListing';
export * from './MpBidding';
export * from './Storage';
export * from './SemiCustodialWallet';
export * from './Callback';
export * from './CompressedNft';
export * from './DAS';
