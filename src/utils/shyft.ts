import { ShyftSettings } from '@/types';
import { NftClient, TokenClient, WalletClient } from '@/api';
import { ShyftConfig } from '@/utils';

export class ShyftSdk {
  readonly config: ShyftConfig;
  readonly nft: NftClient;
  readonly wallet: WalletClient;
  readonly token: TokenClient;
  constructor(settings: ShyftSettings) {
    this.config = new ShyftConfig(settings);
    this.nft = new NftClient(this.config);
    this.wallet = new WalletClient(this.config);
    this.token = new TokenClient(this.config);
  }
}
