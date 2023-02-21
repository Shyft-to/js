import { ShyftSettings } from '@/types';
import {
  WalletClient,
  NftClient,
  TokenClient,
  CandyMachineClient,
} from '@/api';
import { ShyftConfig } from '@/utils';

export class ShyftSdk {
  readonly config: ShyftConfig;
  readonly wallet: WalletClient;
  readonly nft: NftClient;
  readonly token: TokenClient;
  readonly candyMachine: CandyMachineClient;
  constructor(settings: ShyftSettings) {
    this.config = new ShyftConfig(settings);
    this.wallet = new WalletClient(this.config);
    this.nft = new NftClient(this.config);
    this.token = new TokenClient(this.config);
    this.candyMachine = new CandyMachineClient(this.config);
  }
}
