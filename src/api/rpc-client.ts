import { DAS } from '@/types';
import { rpcCall } from '@/utils/rpc-call';
import {
  BlockhashWithExpiryBlockHeight,
  Commitment,
  Connection,
  GetLatestBlockhashConfig,
} from '@solana/web3.js';

export class RpcClient {
  readonly id: string;
  constructor(private readonly connection: Connection) {
    this.id = 'shyft-sdk';
  }

  async getLatestBlockhash(
    commitmentOrConfig: Commitment | GetLatestBlockhashConfig = 'finalized'
  ): Promise<BlockhashWithExpiryBlockHeight> {
    return this.connection.getLatestBlockhash(commitmentOrConfig);
  }

  async getAsset(params: DAS.GetAssetRequest): Promise<DAS.GetAssetResponse> {
    try {
      const data = await rpcCall(this.connection, {
        data: {
          jsonrpc: '2.0',
          id: this.id,
          method: 'getAsset',
          params,
        },
      });
      if (data['error']) {
        return data['error'];
      }
      const result = data.result;
      return result as DAS.GetAssetResponse;
    } catch (error) {
      throw new Error(`Error in getAsset: ${error}`);
    }
  }

  async getAssetProof(
    params: DAS.GetAssetProofRequest
  ): Promise<DAS.GetAssetProofResponse> {
    try {
      const data = await rpcCall(this.connection, {
        data: {
          jsonrpc: '2.0',
          id: this.id,
          method: 'getAssetProof',
          params: params,
        },
      });
      if (data['error']) {
        return data['error'];
      }
      const result = data.result;
      return result as DAS.GetAssetProofResponse;
    } catch (error) {
      throw new Error(`Error in getAssetProof: ${error}`);
    }
  }

  async getAssetsByGroup(
    params: DAS.AssetsByGroupRequest
  ): Promise<DAS.GetAssetResponseList> {
    try {
      const data = await rpcCall(this.connection, {
        data: {
          jsonrpc: '2.0',
          id: this.id,
          method: 'getAssetsByGroup',
          params: params,
        },
      });
      if (data['error']) {
        return data['error'];
      }
      const result = data.result;
      return result as DAS.GetAssetResponseList;
    } catch (error) {
      throw new Error(`Error in getAssetsByGroup: ${error}`);
    }
  }

  async getAssetsByOwner(
    params: DAS.AssetsByOwnerRequest
  ): Promise<DAS.GetAssetResponseList> {
    try {
      const data = await rpcCall(this.connection, {
        data: {
          jsonrpc: '2.0',
          id: this.id,
          method: 'getAssetsByOwner',
          params: params,
        },
      });
      if (data['error']) {
        return data['error'];
      }
      const result = data.result;
      return result as DAS.GetAssetResponseList;
    } catch (error) {
      throw new Error(`Error in getAssetsByOwner: ${error}`);
    }
  }

  async getAssetsByCreator(
    params: DAS.AssetsByCreatorRequest
  ): Promise<DAS.GetAssetResponseList> {
    try {
      const data = await rpcCall(this.connection, {
        data: {
          jsonrpc: '2.0',
          id: this.id,
          method: 'getAssetsByCreator',
          params: params,
        },
      });
      if (data['error']) {
        return data['error'];
      }
      const result = data.result;
      return result as DAS.GetAssetResponseList;
    } catch (error) {
      throw new Error(`Error in getAssetsByCreator: ${error}`);
    }
  }

  async getAssetsByAuthority(
    params: DAS.AssetsByAuthorityRequest
  ): Promise<DAS.GetAssetResponseList> {
    try {
      const data = await rpcCall(this.connection, {
        data: {
          jsonrpc: '2.0',
          id: this.id,
          method: 'getAssetsByAuthority',
          params: params,
        },
      });
      if (data['error']) {
        return data['error'];
      }
      const result = data.result;
      return result as DAS.GetAssetResponseList;
    } catch (error) {
      throw new Error(`Error in getAssetsByAuthority: ${error}`);
    }
  }

  async searchAssets(
    params: DAS.SearchAssetsRequest
  ): Promise<DAS.GetAssetResponseList> {
    try {
      const data = await rpcCall(this.connection, {
        data: {
          jsonrpc: '2.0',
          id: this.id,
          method: 'searchAssets',
          params: params,
        },
      });
      if (data['error']) {
        return data['error'];
      }
      const result = data.result;
      return result as DAS.GetAssetResponseList;
    } catch (error) {
      throw new Error(`Error in searchAssets: ${error}`);
    }
  }
}
