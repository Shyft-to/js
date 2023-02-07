import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { Network, Nft } from '@/types';

const shyft = new ShyftSdk({ apiKey: process.env.API_KEY as string });

describe('read NFT test', () => {
  it('read NFT', async () => {
    const nft = await shyft.nft.getNftByMint({
      network: Network.Devnet,
      mint: '9K31Ti9VHH898VrZGRRXS5j1Zj8aTNAXJBcX8vHxTdDb',
    });
    expect(typeof nft).toBe('object');
  });
});
