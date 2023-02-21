import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import { CandyMachineProgram, Network, PaginatedNftResponse } from '@/types';

export class CandyMachineClient {
  constructor(private readonly config: ShyftConfig) {}

  async readMints(input: {
    network?: Network;
    address: string;
    version: CandyMachineProgram;
  }): Promise<string[]> {
    try {
      const params = {
        network: input?.network ?? this.config.network,
        address: input.address,
        version: input.version,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'candy_machine/nft_addresses',
        params,
      });
      const mints = data.result as string[];
      return mints;
    } catch (error) {
      throw error;
    }
  }

  async readNfts(input: {
    network?: Network;
    address: string;
    version: CandyMachineProgram;
    page?: number;
    size?: number;
  }): Promise<PaginatedNftResponse> {
    try {
      const params = {
        network: input?.network ?? this.config.network,
        address: input.address,
        version: input.version,
      };
      if (input?.page) {
        params['page'] = input.page;
      }
      if (input?.size) {
        params['size'] = input.size;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'candy_machine/nft_addresses',
        params,
      });
      const response = data.result as PaginatedNftResponse;
      return response;
    } catch (error) {
      throw error;
    }
  }
}
