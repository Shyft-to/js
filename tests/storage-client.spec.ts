import { createReadStream } from 'fs';
import { resolve } from 'path';
import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { IpfsUploadResponse, Network } from '@/types';

const shyft = new ShyftSdk({
  apiKey: process.env.API_KEY as string,
  network: Network.Devnet,
});

describe('Storage client test', () => {
  it.skip('upload asset', async () => {
    const response = await shyft.storage.uploadAsset({
      file: createReadStream(
        resolve(__dirname, '../assets/shyft_logo.png')
      ) as unknown as File,
    });
    console.log(response.uri);
    expect(response).toMatchObject<IpfsUploadResponse>({
      uri: expect.any(String),
      cid: expect.any(String),
    });
  }, 50000);

  it('craete metadata uri', async () => {
    const response = await shyft.storage.createMetadata({
      creator: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      image:
        'https://nftstorage.link/ipfs/bafkreiajrjd7xozubfr7qk6xdktlo3k66jg6jkeamgjugd2p3w5w2pifve',
      name: 'Nirvana',
      symbol: 'NVN',
      description: 'This is a test NFT',
      attributes: [
        { trait_type: 'anger', value: 0 },
        { trait_type: 'calmness', value: 100 },
      ],
      sellerFeeBasisPoints: 500,
    });
    console.log(response.uri);
    expect(response).toMatchObject<IpfsUploadResponse>({
      uri: expect.any(String),
      cid: expect.any(String),
    });
  }, 50000);
});
