import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import {
  ActiveListings,
  ActiveListingSortBy,
  ActiveListingSortOrder,
  ListedNftDetail,
  Network,
  NftBuyResponse,
  NftListResponse,
  ServiceCharge,
} from '@/types';

export class MpListingClient {
  constructor(private readonly config: ShyftConfig) {}

  async active(input: {
    network?: Network;
    marketplaceAddress: string;
    sellerAddress?: string;
    collectionAddress?: string;
    nftAddress?: string;
    sortBy?: ActiveListingSortBy;
    sortOrder?: ActiveListingSortOrder;
    page?: number;
    size?: number;
  }): Promise<ActiveListings> {
    try {
      const params = {
        network: input?.network ?? this.config.network,
        marketplace_address: input.marketplaceAddress,
      };
      if (input?.sellerAddress) {
        params['seller_address'] = input.sellerAddress;
      }
      if (input?.collectionAddress) {
        params['collection_address'] = input.collectionAddress;
      }
      if (input?.nftAddress) {
        params['nft_address'] = input.nftAddress;
      }
      if (input?.sortBy) {
        params['sort_by'] = input.sortBy;
      }
      if (input?.sortOrder) {
        params['sort_order'] = input.sortOrder;
      }
      if (input?.page) {
        params['page'] = input.page;
      }
      if (input?.size) {
        params['size'] = input.size;
      }

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

  async activeSellers(input: {
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

  async list(input: {
    network?: Network;
    marketplaceAddress: string;
    nftAddress: string;
    price: number;
    sellerWallet: string;
    isGasLess?: boolean;
    serviceCharge?: ServiceCharge;
  }): Promise<NftListResponse> {
    try {
      const reqBody = {
        network: input?.network ?? this.config.network,
        marketplace_address: input.marketplaceAddress,
        nft_address: input.nftAddress,
        price: input.price,
        seller_wallet: input.sellerWallet,
      };

      if (input?.isGasLess) {
        reqBody['on_the_house'] = input.isGasLess;
      }

      if (input?.serviceCharge) {
        reqBody['service_charge'] = input.serviceCharge;
      }

      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'marketplace/list',
        data: reqBody,
      });
      const response = data.result as NftListResponse;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async unlist(input: {
    network?: Network;
    marketplaceAddress: string;
    listState: string;
    sellerWallet: string;
  }): Promise<string> {
    try {
      const reqBody = {
        network: input?.network ?? this.config.network,
        marketplace_address: input.marketplaceAddress,
        list_state: input.listState,
        seller_wallet: input.sellerWallet,
      };

      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'marketplace/unlist',
        data: reqBody,
      });
      const encodedTransaction = data.result.encoded_transaction as string;
      return encodedTransaction;
    } catch (error) {
      throw error;
    }
  }

  async buy(input: {
    network?: Network;
    marketplaceAddress: string;
    nftAddress: string;
    price: number;
    sellerWallet: string;
    buyerWallet: string;
    serviceCharge?: ServiceCharge;
  }): Promise<NftBuyResponse> {
    try {
      const reqBody = {
        network: input?.network ?? this.config.network,
        marketplace_address: input.marketplaceAddress,
        nft_address: input.nftAddress,
        price: input.price,
        seller_address: input.sellerWallet,
        buyer_wallet: input.buyerWallet,
      };

      if (input?.serviceCharge) {
        reqBody['service_charge'] = input.serviceCharge;
      }

      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'marketplace/buy',
        data: reqBody,
      });
      const response = data.result as NftBuyResponse;
      return response;
    } catch (error) {
      throw error;
    }
  }
}
