import { ShyftConfig, restApiCall, CaseConverter } from '@/utils';
import {
  CNftMintResponse,
  CreateMerkleTreeResponse,
  Network,
  ValidDepthSizePair,
} from '@/types';

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
  }) {
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
