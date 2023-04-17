import FormData from 'form-data';
import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import {
  TokenApiResponse,
  Network,
  TokenInfo,
  TokenOwners,
  TokenTransferTo,
  AirdropTokenResponse,
} from '@/types';

export class TokenClient {
  constructor(private readonly config: ShyftConfig) {}

  async getInfo(input: { network?: Network; tokenAddress: string }) {
    try {
      const params = {
        network: input.network ?? this.config.network,
        token_address: input.tokenAddress,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'token/get_info',
        params,
      });
      const tokenInfo = data.result as TokenInfo;
      return tokenInfo;
    } catch (error) {
      throw error;
    }
  }

  async getOwners(input: {
    network?: Network;
    tokenAddress: string;
    limit?: number;
    offset?: number;
  }) {
    try {
      const params = {
        network: input.network ?? this.config.network,
        token_address: input.tokenAddress,
        limit: input?.limit ?? 10,
        offset: input?.offset ?? 0,
      };
      if (params.network !== Network.Mainnet) {
        throw new Error('This operation only available on mainnet-beta');
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'token/get_owners',
        params,
      });
      const tokenOwners = data.result as TokenOwners;
      return tokenOwners;
    } catch (error) {
      throw error;
    }
  }

  async create(input: {
    network?: Network;
    creatorWallet: string;
    name: string;
    symbol: string;
    description?: string;
    decimals: number;
    image: File;
    feePayer?: string;
  }): Promise<TokenApiResponse> {
    try {
      let data = new FormData();
      data.append('network', input.network ?? this.config.network);
      data.append('wallet', input.creatorWallet);
      if (input.name.length > 32) {
        throw new Error('Max length allowed 32: name');
      }
      data.append('name', input.name);
      if (input.symbol.length > 10) {
        throw new Error('Max length allowed 10: name');
      }
      data.append('symbol', input.symbol);
      data.append('file', input.image);
      if (input.decimals < 0 || input.decimals > 9) {
        throw new Error('0 to 9 allowed: decimals');
      }
      if (input?.description) {
        data.append('description', input.description);
      }
      if (input?.feePayer) {
        data.append('fee_payer', input.feePayer);
      }

      const response = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'token/create_detach',
        maxBodyLength: Infinity,
        data,
      });
      return response.result as TokenApiResponse;
    } catch (error) {
      throw error;
    }
  }

  async mint(input: {
    network?: Network;
    mintAuthority: string;
    receiver: string;
    tokenAddress: string;
    amount: number;
    message?: string;
    feePayer?: string;
  }): Promise<TokenApiResponse> {
    try {
      const reqBody = {
        network: input.network ?? this.config.network,
        mint_authority: input.mintAuthority,
        receiver: input.receiver,
        token_address: input.tokenAddress,
        amount: input.amount,
      };
      if (input?.message) {
        reqBody['message'] = input.message;
      }
      if (input?.feePayer) {
        reqBody['fee_payer'] = input.feePayer;
      }

      const response = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'token/mint_detach',
        data: reqBody,
      });
      return response.result as TokenApiResponse;
    } catch (error) {
      throw error;
    }
  }

  async burn(input: {
    network?: Network;
    wallet: string;
    tokenAddress: string;
    amount: number;
    feePayer?: string;
  }): Promise<Omit<TokenApiResponse, 'mint'>> {
    try {
      const reqBody = {
        network: input.network ?? this.config.network,
        wallet: input.wallet,
        token_address: input.tokenAddress,
        amount: input.amount,
      };
      if (input?.feePayer) {
        reqBody['fee_payer'] = input.feePayer;
      }

      const response = await restApiCall(this.config.apiKey, {
        method: 'delete',
        url: 'token/burn_detach',
        data: reqBody,
      });
      return response.result as Omit<TokenApiResponse, 'mint'>;
    } catch (error) {
      throw error;
    }
  }

  async transfer(input: {
    network?: Network;
    fromAddress: string;
    toAddress: string;
    tokenAddress: string;
    amount: number;
    feePayer?: string;
  }): Promise<Omit<TokenApiResponse, 'mint'>> {
    try {
      if (input.fromAddress === input.toAddress) {
        throw new Error('fromAddress and toAddress must not be the same');
      }
      const reqBody = {
        network: input.network ?? this.config.network,
        from_address: input.fromAddress,
        to_address: input.toAddress,
        token_address: input.tokenAddress,
        amount: input.amount,
      };
      if (input?.feePayer) {
        reqBody['fee_payer'] = input.feePayer;
      }

      const response = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'token/transfer_detach',
        data: reqBody,
      });
      return response.result as Omit<TokenApiResponse, 'mint'>;
    } catch (error) {
      throw error;
    }
  }

  async airdrop(input: {
    network?: Network;
    fromAddress: string;
    tokenAddress: string;
    transferTo: TokenTransferTo[];
  }): Promise<AirdropTokenResponse> {
    try {
      const transferTo = input.transferTo.map((x) => {
        if (x.toAddress === input.fromAddress) {
          throw new Error('fromAddress and toAddress must not be the same');
        }
        return { to_address: x.toAddress, amount: x.amount };
      });
      const reqBody = {
        network: input.network ?? this.config.network,
        from_address: input.fromAddress,
        transfer_info: transferTo,
        token_address: input.tokenAddress,
      };

      const response = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'token/airdrop',
        data: reqBody,
      });
      return response.result as AirdropTokenResponse;
    } catch (error) {
      throw error;
    }
  }
}
