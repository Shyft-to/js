import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import { ActiveListings, Network } from '@/types';

export class MpListingClient {
  constructor(private readonly config: ShyftConfig) {}

  async activeListingV2(input: {
    network?: Network;
    marketplaceAddress: string;
  }): Promise<ActiveListings> {
    try {
      const params = {
        network: input?.network ?? this.config.network,
        marketplace_address: input.marketplaceAddress,
      };

      const data = await restApiCall(
        this.config.apiKey,
        {
          method: 'get',
          url: 'marketplace/active_listings',
          params,
        },
        'v2'
      );
      const listedNfts = data.result as ActiveListings;
      return listedNfts;
    } catch (error) {
      throw error;
    }
  }
}
