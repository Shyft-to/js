import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ShyftConfig } from '../utils/shyft-config';
import { restApiCall } from '../utils/rest-api-call';
import { Nft } from '@/types';

export class NftClient {
  constructor(private readonly config: ShyftConfig) {}

  async getNftByMint(
    network: WalletAdapterNetwork,
    mint: string
  ): Promise<Nft> {
    try {
      const params = {
        network,
        token_address: mint,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'nft/read',
        params,
      });
      const nft = data.result as Nft;
      return nft;
    } catch (error) {
      throw error;
    }
  }

  async getNftByOwner(
    network: WalletAdapterNetwork,
    owner: string
  ): Promise<Nft[]> {
    try {
      const params = {
        network,
        address: owner,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'nft/read_all',
        params,
      });
      const nft = data.result as Nft[];
      return nft;
    } catch (error) {
      throw error;
    }
  }
}
