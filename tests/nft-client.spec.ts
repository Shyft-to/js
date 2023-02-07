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
});
