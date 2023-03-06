import { ShyftSettings } from '@/types';
import {
  WalletClient,
  NftClient,
  TokenClient,
  CandyMachineClient,
  MarketplaceClient,
  TransactionClient,
} from '@/api';
import { ShyftConfig } from '@/utils';

export class ShyftSdk {
  readonly config: ShyftConfig;
  readonly wallet: WalletClient;
  readonly nft: NftClient;
  readonly token: TokenClient;
  readonly candyMachine: CandyMachineClient;
  readonly marketplace: MarketplaceClient;
  readonly transaction: TransactionClient;
  constructor(settings: ShyftSettings) {
    this.config = new ShyftConfig(settings);
    this.wallet = new WalletClient(this.config);
    this.nft = new NftClient(this.config);
    this.token = new TokenClient(this.config);
    this.candyMachine = new CandyMachineClient(this.config);
    this.marketplace = new MarketplaceClient(this.config);
    this.transaction = new TransactionClient(this.config);
  }
}
