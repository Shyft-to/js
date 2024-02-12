import { ShyftConfig, restApiCall, CaseConverter } from '@/utils';
import {
  CNftBurnManyResp,
  CNftBurnResponse,
  CNftMintResponse,
  CNftTransferManyResp,
  CNftTransferResponse,
  CNftUpdateResponse,
  CreateMerkleTreeResponse,
  Network,
  Nft,
  PaginatedNfts,
  ValidDepthSizePair,
} from '@/types';
import { isNumber } from 'lodash';

export class CompressedNftClient {
  private caseConverter: CaseConverter;
  constructor(private readonly config: ShyftConfig) {
    this.caseConverter = new CaseConverter();
  }

  async createMerkleTree(input: {
    network?: Network;
    walletAddress: string;
    maxDepthSizePair: ValidDepthSizePair;
    canopyDepth: number;
    feePayer?: string;
  }): Promise<CreateMerkleTreeResponse> {
    try {
      if (!CompressedNftClient.isValidDepthSizePair(input.maxDepthSizePair)) {
        throw new Error('Invalid depth size pair');
      }
      const reqBody = {
        network: input.network ?? this.config.network,
        wallet_address: input.walletAddress,
        max_depth_size_pair: this.caseConverter.convertToSnakeCaseObject(
          input.maxDepthSizePair
        ),
        canopy_depth: input.canopyDepth,
      };
      if (input?.feePayer) {
        reqBody['fee_payer'] = input.feePayer;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'nft/compressed/create_tree',
        data: reqBody,
      });
      const response = data.result as CreateMerkleTreeResponse;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async mint(input: {
    network?: Network;
    creatorWallet: string;
    merkleTree: string;
    metadataUri: string;
    isDelegateAuthority?: boolean;
    collectionAddress?: string;
    maxSupply?: number;
    primarySaleHappend?: boolean;
    isMutable?: boolean;
    receiver?: string;
    feePayer?: string;
    priorityFee?: number;
  }): Promise<CNftMintResponse> {
    try {
      const reqBody = {
        network: input.network ?? this.config.network,
        creator_wallet: input.creatorWallet,
        merkle_tree: input.merkleTree,
        metadata_uri: input.metadataUri,
      };
      if (input?.isDelegateAuthority) {
        reqBody['is_delegate_authority'] = input.isDelegateAuthority;
      }
      if (input?.collectionAddress) {
        reqBody['collection_address'] = input.collectionAddress;
      }
      if (input?.maxSupply) {
        reqBody['max_supply'] = input.maxSupply;
      }
      if (input?.primarySaleHappend) {
        reqBody['primary_sale_happend'] = input.primarySaleHappend;
      }
      if (input?.isMutable) {
        reqBody['is_mutable'] = input.isMutable;
      }
      if (input?.receiver) {
        reqBody['receiver'] = input.receiver;
      }
      if (input?.feePayer) {
        reqBody['fee_payer'] = input.feePayer;
      }
      if (input?.priorityFee) {
        reqBody['priority_fee'] = input.priorityFee;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'nft/compressed/mint',
        data: reqBody,
      });
      const response = data.result as CNftMintResponse;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async transfer(input: {
    network?: Network;
    mint: string;
    fromAddress: string;
    toAddress: string;
    feePayer?: string;
    priorityFee?: number;
  }): Promise<CNftTransferResponse> {
    try {
      const reqBody = {
        network: input.network ?? this.config.network,
        nft_address: input.mint,
        sender: input.fromAddress,
        receiver: input.toAddress,
      };
      if (input.feePayer) {
        reqBody['fee_payer'] = input.feePayer;
      }
      if (input.priorityFee) {
        reqBody['priority_fee'] = input.priorityFee;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'nft/compressed/transfer',
        data: reqBody,
      });
      const response = data.result as CNftTransferResponse;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async transferMany(input: {
    network?: Network;
    mints: string[];
    fromAddress: string;
    toAddress: string;
    feePayer?: string;
    priorityFee?: number;
  }): Promise<CNftTransferManyResp> {
    try {
      const reqBody = {
        network: input.network ?? this.config.network,
        nft_addresses: input.mints,
        from_address: input.fromAddress,
        to_address: input.toAddress,
      };
      if (input.feePayer) {
        reqBody['fee_payer'] = input.feePayer;
      }
      if (input.priorityFee) {
        reqBody['priority_fee'] = input.priorityFee;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'nft/compressed/transfer_many',
        data: reqBody,
      });
      const response = data.result as CNftTransferManyResp;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async burn(input: {
    network?: Network;
    walletAddress: string;
    mint: string;
    priorityFee?: number;
  }): Promise<CNftBurnResponse> {
    try {
      const reqBody = {
        network: input.network ?? this.config.network,
        wallet_address: input.walletAddress,
        nft_address: input.mint,
      };
      if (input.priorityFee) {
        reqBody['priority_fee'] = input.priorityFee;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'delete',
        url: 'nft/compressed/burn',
        data: reqBody,
      });
      const response = data.result as CNftBurnResponse;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async burnMany(input: {
    network?: Network;
    mints: string[];
    walletAddress: string;
    priorityFee?: number;
  }): Promise<CNftBurnManyResp> {
    try {
      const reqBody = {
        network: input.network ?? this.config.network,
        nft_addresses: input.mints,
        wallet_address: input.walletAddress,
      };
      if (input.priorityFee) {
        reqBody['priority_fee'] = input.priorityFee;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'delete',
        url: 'nft/compressed/burn_many',
        data: reqBody,
      });
      const response = data.result as CNftBurnManyResp;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(input: {
    network?: Network;
    authority: string;
    mint: string;
    name?: string;
    symbol?: string;
    metadataUri?: string;
    royalty?: number;
    primarySaleHappend?: boolean;
    isMutable?: boolean;
    feePayer?: string;
    priorityFee?: number;
  }): Promise<CNftUpdateResponse> {
    try {
      const reqBody = {
        network: input.network ?? this.config.network,
        authority: input.authority,
        nft_address: input.mint,
      };
      if (input.name) {
        reqBody['name'] = input.name;
      }
      if (input.symbol) {
        reqBody['symbol'] = input.symbol;
      }
      if (input.metadataUri) {
        reqBody['metadata_uri'] = input.metadataUri;
      }
      if (input.royalty) {
        if (input.royalty > 100 || input.royalty < 0) {
          throw new Error('"royalty" must be between 0 and 100');
        }
        reqBody['royalty'] = input.royalty;
      }
      if (input.primarySaleHappend !== undefined) {
        reqBody['primary_sale_happened'] = input.primarySaleHappend;
      }
      if (input.isMutable !== undefined) {
        reqBody['is_mutable'] = input.isMutable;
      }
      if (input.feePayer) {
        reqBody['fee_payer'] = input.feePayer;
      }
      if (input.priorityFee) {
        reqBody['priority_fee'] = input.priorityFee;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'nft/compressed/update',
        data: reqBody,
      });
      const response = data.result as CNftUpdateResponse;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async read(input: { network?: Network; mint: string }): Promise<Nft> {
    try {
      const params = {
        network: input.network ?? this.config.network,
        nft_address: input.mint,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'nft/compressed/read',
        params,
      });
      const response = data.result as Nft;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async readAll(input: {
    network?: Network;
    walletAddress: string;
    collection?: string;
    refresh?: boolean;
  }): Promise<Nft[]> {
    try {
      const params = {
        network: input.network ?? this.config.network,
        wallet_address: input.walletAddress,
      };
      if (input.collection) {
        params['collection'] = input.collection;
      }
      if (input.refresh) {
        params['refresh'] = input.refresh;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'nft/compressed/read_all',
        params,
      });
      const response = data.result.nfts as Nft[];
      return response;
    } catch (error) {
      throw error;
    }
  }

  async readAllV2(input: {
    network?: Network;
    walletAddress: string;
    collection?: string;
    refresh?: boolean;
    page?: number;
    size?: number;
  }): Promise<PaginatedNfts> {
    try {
      const params = {
        network: input.network ?? this.config.network,
        wallet_address: input.walletAddress,
      };
      if (input.collection) {
        params['collection'] = input.collection;
      }
      if (input.refresh) {
        params['refresh'] = input.refresh;
      }
      if (isNumber(input?.page)) {
        if (input.page < 1) {
          throw new Error('should not be less than 1: size');
        }
        params['page'] = input.page;
      }
      if (isNumber(input?.size)) {
        if (input.size > 50 || input.size < 1) {
          throw new Error('allowed between 1 to 50: size');
        }
        params['size'] = input.size;
      }
      const data = await restApiCall(
        this.config.apiKey,
        {
          method: 'get',
          url: 'nft/compressed/read_all',
          params,
        },
        'v2'
      );
      const response = data.result as PaginatedNfts;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async readSelected(input: {
    network?: Network;
    mints: string[];
    refresh?: boolean;
  }): Promise<Nft[]> {
    try {
      if (input.mints.length > 10 || input.mints.length < 1) {
        throw new Error('allowed between 1 to 10: mints');
      }
      const reqBody = {
        network: input.network ?? this.config.network,
        nft_addresses: input.mints,
      };
      if (input.refresh) {
        reqBody['refresh'] = input.refresh;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'nft/compressed/read_selected',
        data: reqBody,
      });
      const response = data.result as Nft[];
      return response;
    } catch (error) {
      throw error;
    }
  }

  static isValidDepthSizePair(obj: any): obj is ValidDepthSizePair {
    if (!obj || typeof obj !== 'object') {
      return false;
    }
    const validPairs = [
      { maxDepth: 3, maxBufferSize: 8 },
      { maxDepth: 5, maxBufferSize: 8 },
      { maxDepth: 14, maxBufferSize: 64 },
      { maxDepth: 14, maxBufferSize: 256 },
      { maxDepth: 14, maxBufferSize: 1024 },
      { maxDepth: 14, maxBufferSize: 2048 },
      { maxDepth: 15, maxBufferSize: 64 },
      { maxDepth: 16, maxBufferSize: 64 },
      { maxDepth: 17, maxBufferSize: 64 },
      { maxDepth: 18, maxBufferSize: 64 },
      { maxDepth: 19, maxBufferSize: 64 },
      { maxDepth: 20, maxBufferSize: 64 },
      { maxDepth: 20, maxBufferSize: 256 },
      { maxDepth: 20, maxBufferSize: 1024 },
      { maxDepth: 20, maxBufferSize: 2048 },
      { maxDepth: 24, maxBufferSize: 64 },
      { maxDepth: 24, maxBufferSize: 256 },
      { maxDepth: 24, maxBufferSize: 512 },
      { maxDepth: 24, maxBufferSize: 1024 },
      { maxDepth: 24, maxBufferSize: 2048 },
      { maxDepth: 26, maxBufferSize: 512 },
      { maxDepth: 26, maxBufferSize: 1024 },
      { maxDepth: 26, maxBufferSize: 2048 },
      { maxDepth: 30, maxBufferSize: 512 },
      { maxDepth: 30, maxBufferSize: 1024 },
      { maxDepth: 30, maxBufferSize: 2048 },
    ];
    return validPairs.some((pair) => {
      return (
        pair.maxDepth === obj.maxDepth &&
        pair.maxBufferSize === obj.maxBufferSize
      );
    });
  }
}
