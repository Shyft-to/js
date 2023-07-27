import { createReadStream } from 'fs';
import { resolve } from 'path';
import 'dotenv/config';
import { ShyftSdk } from '@/index';
import {
  CNftBurnResponse,
  CNftMintResponse,
  CNftTransferManyResp,
  CNftTransferResponse,
  CreateMerkleTreeResponse,
  Network,
  NftMintAndOwner,
} from '@/types';

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

  it('create NFT', async () => {
    const response = await shyft.nft.createFromMetadata({
      receiver: '5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2',
      metadataUri:
        'https://gateway.pinata.cloud/ipfs/QmdijbYgkRbGoYQozL2GgjpaFfVhGcLePYGqJZLPGUHEYW?_gl=1*wojfp9*_ga*MTg2MjM0MzYwMy4xNjYxNzUzMjU3*_ga_5RMPXG14TE*MTY3NzEzNTEzNi40LjEuMTY3NzEzNTE3Ni4yMC4wLjA.',
      collectionAddress: 'AmeH6zUfie2gkFrT7ZZJcimsCCMhtk8PtTKD3Yxitvs5',
    });
    expect(typeof response).toBe('object');
  });

  it('burn NFT', async () => {
    const encodedTxn = await shyft.nft.burn({
      wallet: '5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2',
      mint: 'AmeH6zUfie2gkFrT7ZZJcimsCCMhtk8PtTKD3Yxitvs5',
    });
    expect(typeof encodedTxn).toBe('string');
  });

  it('transfer multiple NFTs', async () => {
    const encodedTxns = await shyft.nft.transferMultiple({
      fromAddress: 'BFefyp7jNF5Xq2A4JDLLFFGpxLq5oPEFKBAQ46KJHW2R',
      toAddress: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      mints: [
        '8pNjm9UmY6RhGQaLuCdtDt6uXhqXg5rFQX9t2oWq3PL1',
        'CHqQS4sZCqKvkvgsKnar5FB4aQ1Ps6mLxBfdNjRgHYqS',
      ],
    });
    expect(Array.isArray(encodedTxns)).toBe(true);
  });

  it('create NFT', async () => {
    const { mint, encoded_transaction } = await shyft.nft.createV2({
      creatorWallet: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      name: 'JS ME',
      symbol: 'JSME',
      description: 'Test',
      attributes: [
        {
          trait_type: 'sunday',
          value: 2,
        },
      ],
      image: createReadStream(
        resolve(__dirname, '../assets/shyft_logo.png')
      ) as unknown as File,
    });
    console.log(mint);
    console.log(encoded_transaction);
    expect(typeof mint).toBe('string');
  }, 50000);

  it('update NFT', async () => {
    const { mint, encoded_transaction } = await shyft.nft.updateV2({
      mint: 'FJwWVYH1UyL8PGwwnVcABviGJ8pfwwxSAbLNGkkWxjKP',
      updateAuthority: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      name: 'JS ME',
      symbol: 'JSME',
      description: 'Test',
      attributes: [
        {
          trait_type: 'sunday',
          value: 2,
        },
      ],
      image: createReadStream(
        resolve(__dirname, '../assets/shyft_logo.png')
      ) as unknown as File,
    });
    console.log(mint);
    console.log(encoded_transaction);
    expect(typeof mint).toBe('string');
  }, 50000);

  it('burn many NFT', async () => {
    const encodedTransactions = await shyft.nft.burnMany({
      wallet: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      mints: [
        'CafGfg1bk66dMEy8FUmRNnQokJ6Be2uGXH75JpDesVcS',
        'BouqF1CYN7L2GFrXTZ4LC3AKe4VhWi7JDy7G2fjTr79d',
        'GpLzvmQYcQM3USH7RGehoriEzmJLJ8AfKVdLFZRoVBsz',
        '53pjayfUf7NjEFXRKuLTij3r6ujm7yPinGdTYm3chojA',
        'FJwWVYH1UyL8PGwwnVcABviGJ8pfwwxSAbLNGkkWxjKP',
        '85q1xdTVMAF8S1MEF6yuJaSnyFhDjzVg8rgyppdt6bLn',
        '12BiLHRfcwRMYUwH6PAmRgPtSKkmBD8igytGqkKaBeha',
        'GFxYSwRPWxDBdGex4DhrY2dStHPMn4UoocJyBAdfypsa',
        'CHqQS4sZCqKvkvgsKnar5FB4aQ1Ps6mLxBfdNjRgHYqS',
        '3KhG4w7jmh8UaW7w9uQ9x6d4RbcVTJ1ZEgugDu22BJor',
        '6RXZGEmQmUJUXR4jKqb9xJ4dPGbviiHfXgpYHWs81fM8',
        '8pNjm9UmY6RhGQaLuCdtDt6uXhqXg5rFQX9t2oWq3PL1',
        '4CGQTpmh5QNbykCYZ8huq78RmVGqYF4bqs7T4qELVyS8',
        '9eEJEUwsuHDDXPv6LZf84xAYJM8wRkQt56zDB1oig5za',
        'CHkwPfE51kSnx6wznJb27deW8Jb4AKGyfpLTQFvJUQLy',
      ],
      close: true,
    });
    console.log(encodedTransactions);
    expect(encodedTransactions.length).toBe(2);
  }, 50000);

  it('fetch collection nfts', async () => {
    const collectionNfts = await shyft.nft.collection.getNfts({
      network: Network.Mainnet,
      collectionAddress: '86vgk5fUs47pXrvh6iGdud2kg5XyBHV2XiZ16JPwCLKi',
      page: 1,
      size: 5,
    });
    expect(collectionNfts.nfts.length).toBe(5);
  }, 50000);

  it('fetch nfts owners', async () => {
    const mintsAndOwners = await shyft.nft.getOwners({
      network: Network.Devnet,
      mints: [
        'B9YonmJk175GfFCDMMKWDc18YpFgmHCmj2HQNkvvjeVw',
        'BxMqbSQaccjZn2bVD13PzyP8DJ3BW3u1dEiD9WQmysGW',
        '85q1xdTVMAF8S1MEF6yuJaSnyFhDjzVg8rgyppdt6bLn',
      ],
    });
    expect(mintsAndOwners.length).toBe(3);
    expect(mintsAndOwners[0]).toMatchObject<NftMintAndOwner>({
      nft_address: expect.any(String),
      owner: expect.any(String),
    });
  }, 50000);

  it('create merkle tree', async () => {
    const merkleTreeResponse = await shyft.nft.compressed.createMerkleTree({
      walletAddress: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      maxDepthSizePair: { maxDepth: 14, maxBufferSize: 64 },
      canopyDepth: 10,
      feePayer: '5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2',
    });

    expect(merkleTreeResponse).toMatchObject<CreateMerkleTreeResponse>({
      encoded_transaction: expect.any(String),
      tree: expect.any(String),
      signers: expect.any(Array),
    });
  });

  it('compressed NFT mint', async () => {
    const mintResponse = await shyft.nft.compressed.mint({
      creatorWallet: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      merkleTree: 'DwoJS9LVDVL55Qa2TwvGG8MqNB5He4JtbnrHQ7JCrkcP',
      metadataUri:
        'https://nftstorage.link/ipfs/bafkreigjxlfjhnpync5qmgv73yi4lqz4e65axwgpgqumvbopgvdrkwjpcm',
      collectionAddress: 'DgXdP7xA31HEviRKw6pk9Xj342dEWy8HFn1yjcsXZ9M9',
      receiver: '5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2',
    });

    expect(mintResponse).toMatchObject<CNftMintResponse>({
      encoded_transaction: expect.any(String),
      mint: expect.any(String),
      signers: expect.any(Array),
    });
  });

  it('compressed NFT transfer', async () => {
    const transferResponse = await shyft.nft.compressed.transfer({
      mint: 'FvYX8Lho2GEUNppXD8mrwYdXoNHPuqU54kYSTFXLnHwa',
      fromAddress: '5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2',
      toAddress: '3yTKSCKoDcjBFpbgxyJUh4cM1NG77gFXBimkVBx2hKrf',
    });

    expect(transferResponse).toMatchObject<CNftTransferResponse>({
      encoded_transaction: expect.any(String),
      signers: expect.any(Array),
    });
  });

  it('multiple compressed NFTs transfer', async () => {
    const transferResponse = await shyft.nft.compressed.transferMany({
      network: Network.Mainnet,
      mints: [
        'B1KpC7P66MUitUBjSEDtV1CM1rbYaEnRfpDjh7cB8QNf',
        '2ZBoTyJhmdWg8eNmxzcoRBopUyFAoV7XCnWW5WFMaTzv',
        '85hcC9Ga4r3cffpSWmSN81Lf6knyejeNmfd2Kj3UbTn7',
      ],
      fromAddress: '4u5iyKLBpHDMeyzjgLVQjEo2KLjiaGe7zRMib8J8Se4a',
      toAddress: 'BFefyp7jNF5Xq2A4JDLLFFGpxLq5oPEFKBAQ46KJHW2R',
    });

    expect(transferResponse).toMatchObject<CNftTransferManyResp>({
      encoded_transactions: expect.any(Array),
    });
  });

  it('burn compressed NFT', async () => {
    const burnResponse = await shyft.nft.compressed.burn({
      network: Network.Mainnet,
      mint: 'B1KpC7P66MUitUBjSEDtV1CM1rbYaEnRfpDjh7cB8QNf',
      walletAddress: '4u5iyKLBpHDMeyzjgLVQjEo2KLjiaGe7zRMib8J8Se4a',
    });

    expect(burnResponse).toMatchObject<CNftBurnResponse>({
      encoded_transaction: expect.any(String),
      signers: expect.any(Array),
    });
  });

  it('read cNFT', async () => {
    const cNFT = await shyft.nft.compressed.read({
      network: Network.Mainnet,
      mint: 'B1KpC7P66MUitUBjSEDtV1CM1rbYaEnRfpDjh7cB8QNf',
    });

    expect(typeof cNFT).toBe('object');
  });

  it('fetch all cNFTs by a owner address', async () => {
    const cNFTs = await shyft.nft.compressed.readAll({
      network: Network.Mainnet,
      walletAddress: '4u5iyKLBpHDMeyzjgLVQjEo2KLjiaGe7zRMib8J8Se4a',
    });

    expect(typeof cNFTs).toBe('object');
  }, 50000);
});
