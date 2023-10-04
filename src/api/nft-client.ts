import FormData from 'form-data';
import { ShyftConfig, restApiCall } from '@/utils';
import {
  Attribute,
  Network,
  Nft,
  NftMintAndOwner,
  ServiceCharge,
} from '@/types';
import { CollectionClient } from './collection-client';
import { CompressedNftClient } from './compressed-nft-client';

export class NftClient {
  readonly collection: CollectionClient;
  readonly compressed: CompressedNftClient;
  constructor(private readonly config: ShyftConfig) {
    this.collection = new CollectionClient(this.config);
    this.compressed = new CompressedNftClient(this.config);
  }

  async getNftByMint(input: {
    network?: Network;
    mint: string;
    refresh?: boolean;
    tokenRecord?: boolean;
  }): Promise<Nft> {
    try {
      const params = {
        network: input.network ?? this.config.network,
        token_address: input.mint,
      };
      if (input.refresh) {
        params['refresh'] = input.refresh;
      }
      if (input.tokenRecord) {
        params['token_record'] = input.tokenRecord;
      }
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

  async getNftsByMintAddresses(input: {
    network?: Network;
    mints: string[];
    refresh?: boolean;
    tokenRecord?: boolean;
  }): Promise<Nft[]> {
    try {
      if (input.mints.length === 0) {
        throw new Error('At least one mint address is required');
      }
      if (input.mints.length > 10) {
        throw new Error('Allowed between 1 to 10: mints');
      }
      const reqBody = {
        network: input.network ?? this.config.network,
        token_addresses: input.mints,
      };
      if (input.refresh) {
        reqBody['refresh'] = input.refresh;
      }
      if (input.tokenRecord) {
        reqBody['token_record'] = input.tokenRecord;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'nft/read_selected',
        data: reqBody,
      });
      const nfts = data.result as Nft[];
      return nfts;
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

  async getOwners(input: {
    network?: Network;
    mints: string[];
  }): Promise<NftMintAndOwner[]> {
    try {
      if (input.mints.length < 1 || input.mints.length > 10) {
        throw new Error('allowed between 1 to 10: mints');
      }
      const reqBody = {
        network: input.network ?? this.config.network,
        nft_addresses: input.mints,
      };
      const response = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'nft/get_owners',
        data: reqBody,
      });
      const nftMintsAndOwners = response.result as NftMintAndOwner[];
      return nftMintsAndOwners;
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

  async burnMany(input: {
    network?: Network;
    wallet: string;
    mints: string[];
    close?: boolean;
  }): Promise<string[]> {
    try {
      const reqBody = {
        network: input.network ?? this.config.network,
        wallet: input.wallet,
        nft_addresses: input.mints,
      };
      if (input?.close) {
        reqBody['close_accounts'] = input.close;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'delete',
        url: 'nft/burn_many',
        data: reqBody,
      });
      const encodedTransactions = data.result?.encoded_transactions as string[];
      return encodedTransactions;
    } catch (error) {
      throw error;
    }
  }

  async transfer(input: {
    network?: Network;
    mint: string;
    fromAddress: string;
    toAddress: string;
    transferAuthority?: boolean;
  }): Promise<string> {
    try {
      const reqBody = {
        network: input.network ?? this.config.network,
        token_address: input.mint,
        from_address: input.fromAddress,
        to_address: input.toAddress,
        transfer_authority: input?.transferAuthority ?? false,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'nft/transfer_detach',
        data: reqBody,
      });
      const encodedTransaction = data.result?.encoded_transaction as string;
      return encodedTransaction;
    } catch (error) {
      throw error;
    }
  }

  async transferMultiple(input: {
    network?: Network;
    mints: string[];
    fromAddress: string;
    toAddress: string;
  }): Promise<string[]> {
    try {
      const reqBody = {
        network: input.network ?? this.config.network,
        token_addresses: input.mints,
        from_address: input.fromAddress,
        to_address: input.toAddress,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'nft/transfer_many',
        data: reqBody,
      });
      const encodedTransactions = data.result.encoded_transactions as string[];
      return encodedTransactions;
    } catch (error) {
      throw error;
    }
  }

  async createV2(input: {
    network?: Network;
    creatorWallet: string;
    name: string;
    symbol: string;
    description?: string;
    attributes?: Attribute[];
    externalUrl?: string;
    maxSupply?: number;
    royalty?: number;
    collectionAddress?: string;
    feePayer?: string;
    image: File;
    data?: File;
  }): Promise<{ encoded_transaction: string; mint: string }> {
    try {
      let data = new FormData();
      data.append('network', input.network ?? this.config.network);
      data.append('creator_wallet', input.creatorWallet);
      data.append('name', input.name);
      data.append('symbol', input.symbol);
      if (input?.description) {
        data.append('description', input.description);
      }
      if (input?.attributes) {
        data.append('attributes', JSON.stringify(input.attributes));
      }
      if (input?.externalUrl) {
        data.append('external_url', input.externalUrl);
      }
      if (input?.maxSupply) {
        data.append('max_supply', input.maxSupply.toString());
      }
      if (input?.royalty) {
        data.append('royalty', input.royalty.toString());
      }
      if (input?.collectionAddress) {
        data.append('collection_address', input.collectionAddress);
      }
      if (input?.feePayer) {
        data.append('fee_payer', input.feePayer);
      }
      data.append('image', input.image);
      if (input?.data) {
        data.append('data', input.data);
      }

      const response = await restApiCall(
        this.config.apiKey,
        {
          method: 'post',
          url: 'nft/create',
          maxBodyLength: Infinity,
          data,
        },
        'v2'
      );

      const result = response.result as {
        encoded_transaction: string;
        mint: string;
      };
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateV2(input: {
    network?: Network;
    mint: string;
    updateAuthority: string;
    name?: string;
    symbol?: string;
    description?: string;
    attributes?: Attribute[];
    royalty?: number;
    image?: File;
    data?: File;
    feePayer?: string;
    serviceCharge?: ServiceCharge;
  }): Promise<{ encoded_transaction: string; mint: string }> {
    try {
      let data = new FormData();
      data.append('network', input.network ?? this.config.network);
      data.append('token_address', input.mint);
      data.append('update_authority_address', input.updateAuthority);
      if (input?.name) {
        if (input.name.length > 32) {
          throw new Error('Max length allowed 32: name');
        }
        data.append('name', input.name);
      }
      if (input?.symbol) {
        if (input.symbol.length > 10) {
          throw new Error('Max length allowed 10: symbol');
        }
        data.append('symbol', input.symbol);
      }
      if (input?.description) {
        data.append('description', input.description);
      }
      if (input?.attributes) {
        data.append('attributes', JSON.stringify(input.attributes));
      }
      if (input?.royalty) {
        data.append('royalty', input.royalty.toString());
      }
      if (input?.image) {
        data.append('image', input.image);
      }
      if (input?.data) {
        data.append('data', input.data);
      }
      if (input?.feePayer) {
        data.append('fee_payer', input.feePayer);
      }
      if (input?.serviceCharge) {
        data.append('service_charge', input.serviceCharge);
      }

      const response = await restApiCall(
        this.config.apiKey,
        {
          method: 'post',
          url: 'nft/update',
          maxBodyLength: Infinity,
          data,
        },
        'v2'
      );

      const result = {
        encoded_transaction: response.result as string,
        mint: input.mint,
      };
      return result;
    } catch (error) {
      throw error;
    }
  }
}
