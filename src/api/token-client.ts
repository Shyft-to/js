import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import { Network, TokenInfo, TokenOwners } from '@/types';
import { Formatter } from '@/utils/formatter';

export class TokenClient {
  constructor(private readonly config: ShyftConfig) {}

  async getInfo(input: { network?: Network; mint: string }) {
    try {
      const params = {
        network: input.network ?? this.config.network,
        token_address: input.mint,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'token/get_info',
        params,
      });
      const tokenInfo = Formatter.camelCase(data.result) as TokenInfo;
      return tokenInfo;
    } catch (error) {
      throw error;
    }
  }

  async getOwners(input: {
    network?: Network;
    mint: string;
    limit?: number;
    offset?: number;
  }) {
    try {
      const params = {
        network: input.network ?? this.config.network,
        token_address: input.mint,
        limit: input?.limit ?? 10,
        offset: input?.offset ?? 0,
      };
      if (params.network !== Network.Mainnet) {
        throw new Error('This operation only available on mainnet-beta');
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'token/get_owners',
        params,
      });
      const tokenOwners = data.result as TokenOwners;
      return tokenOwners;
    } catch (error) {
      throw error;
    }
  }
}
