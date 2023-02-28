import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { Network } from '@/types';

const shyft = new ShyftSdk({
  apiKey: process.env.API_KEY as string,
  network: Network.Devnet,
});

describe('Marketplace test', () => {
  it('create mp', async () => {
    const { encoded_transaction } = await shyft.marketplace.create({
      creatorWallet: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
    });
    expect(typeof encoded_transaction).toBe('string');
  });

  it('update mp', async () => {
    const { encoded_transaction } = await shyft.marketplace.update({
      network: Network.Devnet,
      authorityWallet: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      marketplaceAddress: '6FWpMCyaNV979duL5vUkhgAo87Gozcb6aHK2BsbynPrL',
      newAuthorityAddress: '5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2',
    });
    expect(typeof encoded_transaction).toBe('string');
  });

  it('find mp', async () => {
    const { address } = await shyft.marketplace.find({
      network: Network.Devnet,
      authorityAddress: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
    });
    expect(typeof address).toBe('string');
  });
});
