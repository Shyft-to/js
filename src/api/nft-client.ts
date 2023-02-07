import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import { Network, Nft } from '@/types';

export class NftClient {
  constructor(private readonly config: ShyftConfig) {}

  async getNftByMint(input: { network: Network; mint: string }): Promise<Nft> {
    try {
      const params = {
        network: input.network,
        token_address: input.mint,
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

  async getNftByOwner(input: {
    network: Network;
    owner: string;
  }): Promise<Nft[]> {
    try {
      const params = {
        network: input.network,
        address: input.owner,
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
