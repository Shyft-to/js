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

  it('fetch treasury balance of mp', async () => {
    const treasuryBalance = await shyft.marketplace.treasuryBalance({
      network: Network.Devnet,
      marketplaceAddress: '6FWpMCyaNV979duL5vUkhgAo87Gozcb6aHK2BsbynPrL',
    });
    expect(typeof treasuryBalance).toBe('object');
  });

  it('fetch stats of mp', async () => {
    const stats = await shyft.marketplace.stats({
      network: Network.Devnet,
      marketplaceAddress: '6FWpMCyaNV979duL5vUkhgAo87Gozcb6aHK2BsbynPrL',
      startDate: new Date('2023-01-01T16:50:53.000Z'),
    });
    expect(typeof stats.start_date).toBe('object');
  });

  it('fetch active listing', async () => {
    const activeListings = await shyft.marketplace.listing.active({
      network: Network.Mainnet,
      marketplaceAddress: 'AxrRwpzk4T6BsWhttPwVCmfeEMbfbasv1QxVc5JhUfvB',
      sortBy: 'price',
      sortOrder: 'desc',
      page: 1,
      size: 2,
    });
    expect(typeof activeListings).toBe('object');
  });

  it('fetch seller listings of mp', async () => {
    const listings = await shyft.marketplace.listing.bySeller({
      network: Network.Mainnet,
      marketplaceAddress: 'AxrRwpzk4T6BsWhttPwVCmfeEMbfbasv1QxVc5JhUfvB',
      sellerAddress: '2ds8Azc8EC1MNyUWKBQrTsTKutyxg1wSvVFB9tthmd1J',
    });
    expect(typeof listings[0].created_at).toBe('object');
  });

  it('list', async () => {
    const { encoded_transaction } = await shyft.marketplace.listing.list({
      marketplaceAddress: 'dKtXyGgDGCyXiWtj9mbXUXk7ww996Uyc46CVt3ukJwV',
      nftAddress: '7Ros6azxoYakj3agxZetDwTWySftQeYXRXAKYWgXTWvw',
      price: 1,
      sellerWallet: '8hDQqsj9o2LwMk2FPBs7Rz5jPuzqKpRvkeeo6hMJm5Cv',
    });
    expect(typeof encoded_transaction).toBe('string');
  });

  it('unlist', async () => {
    const encodedTransaction = await shyft.marketplace.listing.unlist({
      marketplaceAddress: '5p4Bua5tSsSo1RJ94H1w5DiMSPfWcvMvnMVjPpZ6sJUb',
      listState: '9hXPhRfAYsR9fYcuPcDS36wimTRthVVjmX9NKgxub65G',
      sellerWallet: 'AaYFExyZuMHbJHzjimKyQBAH1yfA9sKTxSzBc6Nr5X4s',
    });
    expect(typeof encodedTransaction).toBe('string');
  });

  it('buy', async () => {
    const { encoded_transaction } = await shyft.marketplace.listing.buy({
      network: Network.Mainnet,
      marketplaceAddress: 'AxrRwpzk4T6BsWhttPwVCmfeEMbfbasv1QxVc5JhUfvB',
      nftAddress: 'A6v4ucyJ2sYnn4HiSnw4Z8mYhzQosRhE5tsH4NXM5v2N',
      sellerWallet: '4AQHWYvT647XtdoW7KcVzjEwG3ZqmMDhBpZ316yJWrTp',
      buyerWallet: 'Bme4LRYLq199vosFJcP2YrHSduMj27tmqdTNadYDma9A',
      price: 250,
    });
    expect(typeof encoded_transaction).toBe('string');
  });
});
