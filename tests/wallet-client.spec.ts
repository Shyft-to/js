import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { Network } from '@/types';

const shyft = new ShyftSdk({
  apiKey: process.env.API_KEY as string,
  network: Network.Devnet,
});

describe('check balance test', () => {
  it('wallet balance check', async () => {
    const balance = await shyft.wallet.getBalance({
      wallet: '5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2',
    });
    expect(typeof balance).toBe('number');
  });
});
