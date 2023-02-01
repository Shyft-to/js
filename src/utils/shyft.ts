import { ShyftSettings } from '@/types';
import { NftClient } from '../api/nft-client';
import { WalletClient } from '../api/wallet-client';
import { ShyftConfig } from './shyft-config';

export class ShyftSdk {
  readonly config: ShyftConfig;
  readonly nft: NftClient;
  readonly wallet: WalletClient;
  constructor(settings: ShyftSettings) {
    this.config = new ShyftConfig(settings);
    this.nft = new NftClient(this.config);
    this.wallet = new WalletClient(this.config);
  }
}
