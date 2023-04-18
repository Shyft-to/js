import { isNumber } from 'lodash';
import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import { Network, CollectionNfts } from '@/types';

export class CollectionClient {
  constructor(private readonly config: ShyftConfig) {}

  async getNfts(input: {
    network?: Network;
    collectionAddress: string;
    page?: number;
    size?: number;
  }): Promise<CollectionNfts> {
    try {
      const params = {
        network: input?.network ?? this.config.network,
        collection_address: input.collectionAddress,
      };
      if (params.network !== Network.Mainnet) {
        throw new Error('This operation only available on mainnet-beta');
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
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'collections/get_nfts',
        params,
      });
      const collectionNfts = data.result as CollectionNfts;
      return collectionNfts;
    } catch (error) {
      throw error;
    }
  }
}
