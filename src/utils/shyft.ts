import { ShyftSettings } from '@/types';
import {
  WalletClient,
  NftClient,
  TokenClient,
  CandyMachineClient,
  MarketplaceClient,
  TransactionClient,
  StorageClient,
  CallbackClient,
} from '@/api';
import { ShyftConfig } from '@/utils';
import { SemiCustodialWalletClient } from '@/api/semi-custodial-wallet-client';

export class ShyftSdk {
  readonly config: ShyftConfig;
  readonly wallet: WalletClient;
  readonly nft: NftClient;
  readonly token: TokenClient;
  readonly candyMachine: CandyMachineClient;
  readonly marketplace: MarketplaceClient;
  readonly transaction: TransactionClient;
  readonly storage: StorageClient;
  readonly semiCustodialWallet: SemiCustodialWalletClient;
  readonly callback: CallbackClient;
  constructor(settings: ShyftSettings) {
    this.config = new ShyftConfig(settings);
    this.wallet = new WalletClient(this.config);
    this.nft = new NftClient(this.config);
    this.token = new TokenClient(this.config);
    this.candyMachine = new CandyMachineClient(this.config);
    this.marketplace = new MarketplaceClient(this.config);
    this.transaction = new TransactionClient(this.config);
    this.storage = new StorageClient(this.config);
    this.semiCustodialWallet = new SemiCustodialWalletClient(this.config);
    this.callback = new CallbackClient(this.config);
  }
}
