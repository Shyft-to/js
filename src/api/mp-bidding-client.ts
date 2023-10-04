import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import {
  BidsSortOptions,
  BidsSortOrder,
  Network,
  NftBuyResponse,
  ServiceCharge,
  ActiveBids,
  NftBidResponse,
} from '@/types';

export class MpBiddingClient {
  constructor(private readonly config: ShyftConfig) {}

  async active(input: {
    network?: Network;
    marketplaceAddress: string;
    buyerAddress?: string;
    collectionAddress?: string;
    nftAddress?: string;
    sortBy?: BidsSortOptions;
    sortOrder?: BidsSortOrder;
    page?: number;
    size?: number;
  }): Promise<ActiveBids> {
    try {
      const params = {
        network: input?.network ?? this.config.network,
        marketplace_address: input.marketplaceAddress,
      };
      if (input?.buyerAddress) {
        params['buyer_address'] = input.buyerAddress;
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

      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'marketplace/active_bids',
        params,
      });
      const bids = data.result as ActiveBids;
      bids.data.forEach((x) => {
        x.created_at = new Date(x.created_at);
      });
      return bids;
    } catch (error) {
      throw error;
    }
  }

  async bid(input: {
    network?: Network;
    marketplaceAddress: string;
    nftAddress: string;
    price: number;
    buyerWallet: string;
    isGasLess?: boolean;
    serviceCharge?: ServiceCharge;
  }): Promise<NftBidResponse> {
    try {
      const reqBody = {
        network: input?.network ?? this.config.network,
        marketplace_address: input.marketplaceAddress,
        nft_address: input.nftAddress,
        price: input.price,
        buyer_wallet: input.buyerWallet,
      };

      if (input?.isGasLess) {
        reqBody['on_the_house'] = input.isGasLess;
      }

      if (input?.serviceCharge) {
        reqBody['service_charge'] = input.serviceCharge;
      }

      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'marketplace/bid',
        data: reqBody,
      });
      const response = data.result as NftBidResponse;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async cancelBid(input: {
    network?: Network;
    marketplaceAddress: string;
    bidState: string;
    buyerWallet: string;
    isGasLess?: boolean;
  }): Promise<string> {
    try {
      const reqBody = {
        network: input?.network ?? this.config.network,
        marketplace_address: input.marketplaceAddress,
        bid_state: input.bidState,
        buyer_wallet: input.buyerWallet,
      };

      if (input?.isGasLess) {
        reqBody['on_the_house'] = input.isGasLess;
      }

      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'marketplace/cancel_bid',
        data: reqBody,
      });
      const encodedTransaction = data.result.encoded_transaction as string;
      return encodedTransaction;
    } catch (error) {
      throw error;
    }
  }

  async acceptBid(input: {
    network?: Network;
    marketplaceAddress: string;
    bidState: string;
    sellerWallet: string;
  }): Promise<NftBuyResponse> {
    try {
      const reqBody = {
        network: input?.network ?? this.config.network,
        marketplace_address: input.marketplaceAddress,
        bid_state: input.bidState,
        seller_wallet: input.sellerWallet,
      };

      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'marketplace/accept_bid',
        data: reqBody,
      });
      const response = data.result as NftBuyResponse;
      return response;
    } catch (error) {
      throw error;
    }
  }
}
