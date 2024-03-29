import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { Network } from '@/types';

const shyft = new ShyftSdk({
  apiKey: process.env.API_KEY as string,
  network: Network.Devnet,
});

describe('Marketplace test', () => {
  beforeEach((): void => {
    jest.setTimeout(20000);
  });

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
    const { encoded_transaction, transaction_version, signers } =
      await shyft.marketplace.listing.buy({
        network: Network.Devnet,
        marketplaceAddress: '5LSMwR5GLr4WjDHS5FoUXQCN5osZYHRoDGjmcEsS843B',
        nftAddress: '6PStcTWbV546dQCHbjVj4SP6Ht8e2eE4D8Mc951mH1yq',
        sellerWallet: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
        buyerWallet: '5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2',
        price: 0.3,
        serviceCharge: {
          receiver: '5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2',
          token: 'HtXwt7NchBTV7xoqmjhQJqEjSrApq5FNnB8rxYu6eC7k',
          amount: 0.01,
        },
      });

    expect(transaction_version).toBe(0);
    expect(signers.length).toBe(2);
  });

  it('bid', async () => {
    const { encoded_transaction } = await shyft.marketplace.bidding.bid({
      marketplaceAddress: '5LSMwR5GLr4WjDHS5FoUXQCN5osZYHRoDGjmcEsS843B',
      nftAddress: 'FSwx4c1qhuwr3YpBHHCneWkvo2R9uPuHoqjfr6qgixTh',
      price: 0.2,
      buyerWallet: '5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2',
    });
    expect(typeof encoded_transaction).toBe('string');
  });

  it('cancel bid', async () => {
    const encodedTransaction = await shyft.marketplace.bidding.cancelBid({
      marketplaceAddress: '5LSMwR5GLr4WjDHS5FoUXQCN5osZYHRoDGjmcEsS843B',
      bidState: 'Eqqwo4QTACNbvHMEHLyiTEdsc4qhNXts5effHCoqpg4e',
      buyerWallet: '3yTKSCKoDcjBFpbgxyJUh4cM1NG77gFXBimkVBx2hKrf',
    });
    expect(typeof encodedTransaction).toBe('string');
  });

  it('fetch active bids', async () => {
    const activeBidsResponse = await shyft.marketplace.bidding.active({
      network: Network.Devnet,
      marketplaceAddress: '5LSMwR5GLr4WjDHS5FoUXQCN5osZYHRoDGjmcEsS843B',
      sortBy: 'bid_date',
      sortOrder: 'desc',
      page: 1,
      size: 2,
    });
    expect(typeof activeBidsResponse).toBe('object');
  });

  it('accept bid', async () => {
    const response = await shyft.marketplace.bidding.acceptBid({
      network: Network.Devnet,
      marketplaceAddress: '5LSMwR5GLr4WjDHS5FoUXQCN5osZYHRoDGjmcEsS843B',
      bidState: '3NNNdECW5qskMUev1bkcDeXAhbQ4Aeb2tj578KWbu7BJ',
      sellerWallet: '3yTKSCKoDcjBFpbgxyJUh4cM1NG77gFXBimkVBx2hKrf',
    });
    expect(typeof response.encoded_transaction).toBe('string');
  });
});
