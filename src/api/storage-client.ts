import FormData from 'form-data';
import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import { Attribute, IpfsUploadResponse, NftFile } from '@/types';

export class StorageClient {
  constructor(private readonly config: ShyftConfig) {}

  async uploadAsset(input: { file: File }): Promise<IpfsUploadResponse> {
    try {
      let data = new FormData();
      data.append('file', input.file);
      const response = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'storage/upload',
        maxBodyLength: Infinity,
        data,
      });
      const uploadedAsset = response.result as IpfsUploadResponse;
      return uploadedAsset;
    } catch (error) {
      throw error;
    }
  }

  async createMetadata(input: {
    creator: string;
    image: string;
    name: string;
    symbol: string;
    description: string;
    attributes: Attribute[];
    external_url?: string;
    sellerFeeBasisPoints?: number;
    files?: NftFile[];
  }): Promise<IpfsUploadResponse> {
    try {
      const reqBody = {
        creator: input.creator,
        image: input.image,
        name: input.name,
        symbol: input.symbol,
        description: input.description,
        attributes: input.attributes,
        share: 100,
      };
      if (input?.external_url) {
        reqBody['external_url'] = input.external_url;
      }
      if (input?.sellerFeeBasisPoints) {
        reqBody['royalty'] = input.sellerFeeBasisPoints;
      }
      if (input?.files) {
        reqBody['files'] = input.files;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'metadata/create',
        data: reqBody,
      });

      const uploadedMetadata = data.result as IpfsUploadResponse;
      return uploadedMetadata;
    } catch (error) {
      throw error;
    }
  }
}
