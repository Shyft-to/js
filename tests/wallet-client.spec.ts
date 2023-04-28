import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { Network, Domain } from '@/types';

const shyft = new ShyftSdk({
  apiKey: process.env.API_KEY as string,
  network: Network.Devnet,
});

describe('wallet client tests', () => {
  it('wallet balance check', async () => {
    const balance = await shyft.wallet.getBalance({
      wallet: '5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2',
    });
    expect(typeof balance).toBe('number');
  });

  it('get domains test', async () => {
    const domains = await shyft.wallet.getDomains({
      network: Network.Mainnet,
      wallet: '9hqqMGMfG44L2R1a1osDgQRWKYt4YuegfUB6rUSaXrv8',
    });
    domains.map((domain) => {
      expect(domain).toMatchObject(<Domain>{
        address: expect.any(String),
        name: expect.any(String),
      });
    });
  });
});
