import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { Network } from '@/types';

const shyft = new ShyftSdk({
  apiKey: process.env.API_KEY as string,
  network: Network.Devnet,
});

describe('read NFT test', () => {
  it('read NFT', async () => {
    const nft = await shyft.nft.getNftByMint({
      mint: '9K31Ti9VHH898VrZGRRXS5j1Zj8aTNAXJBcX8vHxTdDb',
    });
    expect(typeof nft).toBe('object');
  });

  it('create NFT', async () => {
    const response = await shyft.nft.createFromMetadata({
      receiver: '5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2',
      metadataUri:
        'https://gateway.pinata.cloud/ipfs/QmdijbYgkRbGoYQozL2GgjpaFfVhGcLePYGqJZLPGUHEYW?_gl=1*wojfp9*_ga*MTg2MjM0MzYwMy4xNjYxNzUzMjU3*_ga_5RMPXG14TE*MTY3NzEzNTEzNi40LjEuMTY3NzEzNTE3Ni4yMC4wLjA.',
      collectionAddress: 'AmeH6zUfie2gkFrT7ZZJcimsCCMhtk8PtTKD3Yxitvs5',
    });
    expect(typeof response).toBe('object');
  });

  it('burn NFT', async () => {
    const encodedTxn = await shyft.nft.burn({
      wallet: '5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2',
      mint: 'AmeH6zUfie2gkFrT7ZZJcimsCCMhtk8PtTKD3Yxitvs5',
    });
    expect(typeof encodedTxn).toBe('string');
  });
});
