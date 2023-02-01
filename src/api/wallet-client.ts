import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ShyftConfig } from '../utils/shyft-config';
import { restApiCall } from '../utils/rest-api-call';

export class WalletClient {
  constructor(private readonly config: ShyftConfig) {}

  async getBalance(
    network: WalletAdapterNetwork,
    wallet: string
  ): Promise<number> {
    try {
      const params = {
        network,
        wallet,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/balance',
        params,
      });
      const balance = data.result.balance as number;
      return balance;
    } catch (error) {
      throw error;
    }
  }
}
