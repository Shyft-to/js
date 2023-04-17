import 'dotenv/config';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { ShyftSdk } from '@/index';
import { TokenApiResponse, Network, AirdropTokenResponse } from '@/types';

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
      tokenAddress: 'Gzs6vsQrGsH6MwF5vPXV2ghmxKa1Gh5zarR5whboUMFg',
    });
    expect(typeof tokenInfo).toBe('object');
  });

  it('read token owners', async () => {
    try {
      const tokenOwners = await shyft.token.getOwners({
        network: Network.Mainnet,
        tokenAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      });
      expect(typeof tokenOwners).toBe('object');
    } catch (error) {
      expect(error).toBe(
        '[Error: This operation only available on mainnet-beta]'
      );
    }
  });

  it('create token', async () => {
    const result = await shyft.token.create({
      network: Network.Devnet,
      creatorWallet: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      name: 'Fast',
      symbol: 'FAST',
      description: 'Test token',
      decimals: 9,
      image: createReadStream(
        resolve(__dirname, '../assets/shyft_logo.png')
      ) as unknown as File,
    });
    console.log(result);
    expect(result).toMatchObject<TokenApiResponse>({
      encoded_transaction: expect.any(String),
      mint: expect.any(String),
      signers: expect.any(Array),
    });
  }, 20000);

  it('mint token', async () => {
    const result = await shyft.token.mint({
      network: Network.Devnet,
      mintAuthority: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      receiver: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      tokenAddress: '5QdFR7GPRv7v4MvpkskezXywZgYsAYRf7sB6tPtqLzwR',
      amount: 10000,
      feePayer: '3yTKSCKoDcjBFpbgxyJUh4cM1NG77gFXBimkVBx2hKrf',
    });
    console.log(result);
    expect(result).toMatchObject<TokenApiResponse>({
      encoded_transaction: expect.any(String),
      mint: expect.any(String),
      signers: expect.any(Array),
    });
  }, 20000);

  it('burn token', async () => {
    const result = await shyft.token.burn({
      network: Network.Devnet,
      wallet: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      tokenAddress: 'HtXwt7NchBTV7xoqmjhQJqEjSrApq5FNnB8rxYu6eC7k',
      amount: 10,
      feePayer: '3yTKSCKoDcjBFpbgxyJUh4cM1NG77gFXBimkVBx2hKrf',
    });
    console.log(result);
    expect(result).toMatchObject<Omit<TokenApiResponse, 'mint'>>({
      encoded_transaction: expect.any(String),
      signers: expect.any(Array),
    });
  }, 20000);

  it('transfer token', async () => {
    const result = await shyft.token.transfer({
      network: Network.Devnet,
      fromAddress: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      toAddress: '3yTKSCKoDcjBFpbgxyJUh4cM1NG77gFXBimkVBx2hKrf',
      tokenAddress: 'HtXwt7NchBTV7xoqmjhQJqEjSrApq5FNnB8rxYu6eC7k',
      amount: 10,
      feePayer: '3yTKSCKoDcjBFpbgxyJUh4cM1NG77gFXBimkVBx2hKrf',
    });
    console.log(result);
    expect(result).toMatchObject<Omit<TokenApiResponse, 'mint'>>({
      encoded_transaction: expect.any(String),
      signers: expect.any(Array),
    });
  }, 20000);

  it('airdrop token', async () => {
    const result = await shyft.token.airdrop({
      network: Network.Devnet,
      fromAddress: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      tokenAddress: 'HtXwt7NchBTV7xoqmjhQJqEjSrApq5FNnB8rxYu6eC7k',
      transferTo: [
        {
          toAddress: '3yTKSCKoDcjBFpbgxyJUh4cM1NG77gFXBimkVBx2hKrf',
          amount: 5,
        },
        {
          toAddress: 'rexYt592c6v2MZKtLTXmWQt9zdEDdd3pZzbwSatHBrx',
          amount: 10,
        },
      ],
    });
    console.log(result);
    expect(result).toMatchObject<AirdropTokenResponse>({
      encoded_transaction: expect.any(Array),
      signer: expect.any(String),
    });
  }, 20000);
});
