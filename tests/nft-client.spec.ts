import { createReadStream } from 'fs';
import { resolve } from 'path';
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

  it('transfer multiple NFTs', async () => {
    const encodedTxns = await shyft.nft.transferMultiple({
      fromAddress: 'BFefyp7jNF5Xq2A4JDLLFFGpxLq5oPEFKBAQ46KJHW2R',
      toAddress: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      mints: [
        '8pNjm9UmY6RhGQaLuCdtDt6uXhqXg5rFQX9t2oWq3PL1',
        'CHqQS4sZCqKvkvgsKnar5FB4aQ1Ps6mLxBfdNjRgHYqS',
      ],
    });
    expect(Array.isArray(encodedTxns)).toBe(true);
  });

  it('create NFT', async () => {
    const { mint, encoded_transaction } = await shyft.nft.createV2({
      creatorWallet: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      name: 'JS ME',
      symbol: 'JSME',
      description: 'Test',
      attributes: [
        {
          trait_type: 'sunday',
          value: 2,
        },
      ],
      image: createReadStream(
        resolve(__dirname, '../assets/shyft_logo.png')
      ) as unknown as File,
    });
    console.log(mint);
    console.log(encoded_transaction);
    expect(typeof mint).toBe('string');
  }, 50000);
});
