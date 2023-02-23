import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import { Network, Nft, ServiceCharge } from '@/types';

export class NftClient {
  constructor(private readonly config: ShyftConfig) {}

  async getNftByMint(input: { network?: Network; mint: string }): Promise<Nft> {
    try {
      const params = {
        network: input.network ?? this.config.network,
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
    network?: Network;
    owner: string;
  }): Promise<Nft[]> {
    try {
      const params = {
        network: input.network ?? this.config.network,
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

  async createFromMetadata(input: {
    network?: Network;
    metadataUri: string;
    maxSupply?: number;
    collectionAddress?: string;
    receiver: string;
    feePayer?: string;
    serviceCharge?: ServiceCharge;
  }): Promise<{ encoded_transaction: string; mint: string }> {
    try {
      const reqBody = {
        network: input.network ?? this.config.network,
        metadata_uri: input.metadataUri,
        receiver: input.receiver,
      };
      if (input?.maxSupply) {
        reqBody['max_supply'] = input.maxSupply;
      }
      if (input?.collectionAddress) {
        reqBody['collection_address'] = input.collectionAddress;
      }
      if (input?.feePayer) {
        reqBody['fee_payer'] = input.feePayer;
      }
      if (input?.serviceCharge) {
        reqBody['service_charge'] = input.serviceCharge;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'nft/create_from_metadata',
        data: reqBody,
      });
      const result = data.result as {
        encoded_transaction: string;
        mint: string;
      };
      return result;
    } catch (error) {
      throw error;
    }
  }

  async burn(input: {
    network?: Network;
    wallet: string;
    mint: string;
    close?: boolean;
  }): Promise<string> {
    try {
      const reqBody = {
        network: input.network ?? this.config.network,
        wallet: input.wallet,
        token_address: input.mint,
      };
      if (input?.close) {
        reqBody['close'] = input.close;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'delete',
        url: 'nft/burn_detach',
        data: reqBody,
      });
      const encodedTransaction = data.result?.encoded_transaction as string;
      return encodedTransaction;
    } catch (error) {
      throw error;
    }
  }
}
