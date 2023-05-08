import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { Network, Domain, TokenBalance } from '@/types';

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

  it('token balance check', async () => {
    const tokenBalance = await shyft.wallet.getTokenBalance({
      wallet: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      token: '1C3n35poNbm2di6W8YTKjG2BmhaFxmTtbScy1ox2xvY',
    });
    expect(tokenBalance).toMatchObject<
      Omit<TokenBalance, 'associated_account'> & { isFrozen: boolean }
    >({
      address: expect.any(String),
      balance: expect.any(Number),
      info: expect.any(Object),
      isFrozen: expect.any(Boolean),
    });
  });
});
