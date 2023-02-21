import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { Network } from '@/types';

const shyft = new ShyftSdk({
  apiKey: process.env.API_KEY as string,
  network: Network.Devnet,
});

beforeEach((): void => {
  jest.setTimeout(20000);
});

describe('token client test', () => {
  it('read token info', async () => {
    const tokenInfo = await shyft.token.getInfo({
      network: Network.Devnet,
      mint: 'Gzs6vsQrGsH6MwF5vPXV2ghmxKa1Gh5zarR5whboUMFg',
    });
    expect(typeof tokenInfo).toBe('object');
  });

  it('read token owners', async () => {
    try {
      const tokenOwners = await shyft.token.getOwners({
        network: Network.Mainnet,
        mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      });
      expect(typeof tokenOwners).toBe('object');
    } catch (error) {
      expect(error).toBe(
        '[Error: This operation only available on mainnet-beta]'
      );
    }
  });
});
