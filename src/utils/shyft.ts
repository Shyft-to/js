import { ShyftSettings } from '@/types';
import { CandyMachineClient, NftClient, WalletClient } from '@/api';
import { ShyftConfig } from '@/utils';

export class ShyftSdk {
  readonly config: ShyftConfig;
  readonly nft: NftClient;
  readonly wallet: WalletClient;
  readonly candyMachine: CandyMachineClient;
  constructor(settings: ShyftSettings) {
    this.config = new ShyftConfig(settings);
    this.nft = new NftClient(this.config);
    this.wallet = new WalletClient(this.config);
    this.candyMachine = new CandyMachineClient(this.config);
  }
}
