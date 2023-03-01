import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import { ActiveListings, ListedNftDetail, Network } from '@/types';

export class MpListingClient {
  constructor(private readonly config: ShyftConfig) {}

  async active(input: {
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

  async detail(input: {
    network?: Network;
    marketplaceAddress: string;
    listState: string;
  }): Promise<Omit<ListedNftDetail, 'status'>> {
    try {
      const params = {
        network: input?.network ?? this.config.network,
        marketplace_address: input.marketplaceAddress,
        list_state: input.listState,
      };

      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'marketplace/list_details',
        params,
      });
      const listedNfts = data.result as Omit<ListedNftDetail, 'status'>;
      return listedNfts;
    } catch (error) {
      throw error;
    }
  }

  async bySeller(input: {
    network?: Network;
    marketplaceAddress: string;
    sellerAddress: string;
  }): Promise<Omit<ListedNftDetail, 'status'>[]> {
    try {
      const params = {
        network: input?.network ?? this.config.network,
        marketplace_address: input.marketplaceAddress,
        seller_address: input.sellerAddress,
      };

      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'marketplace/seller_listings',
        params,
      });
      const listedNfts = data.result as Omit<ListedNftDetail, 'status'>[];
      return listedNfts;
    } catch (error) {
      throw error;
    }
  }

  async sellers(input: {
    network?: Network;
    marketplaceAddress: string;
  }): Promise<string[]> {
    try {
      const params = {
        network: input?.network ?? this.config.network,
        marketplace_address: input.marketplaceAddress,
      };

      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'marketplace/active_sellers',
        params,
      });
      const sellers = data.result as string[];
      return sellers;
    } catch (error) {
      throw error;
    }
  }
}
