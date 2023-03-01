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
      listedNfts.data.forEach((x) => {
        x.created_at = new Date(x.created_at);
      });
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
      const listedNft = data.result as Omit<ListedNftDetail, 'status'>;
      listedNft.created_at = new Date(listedNft.created_at);
      if (listedNft?.cancelled_at) {
        listedNft.cancelled_at = new Date(listedNft.cancelled_at);
      }
      return listedNft;
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
      listedNfts.forEach((x) => {
        x.created_at = new Date(x.created_at);
        if (x?.cancelled_at) {
          x.cancelled_at = new Date(x.cancelled_at);
        }
      });
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
