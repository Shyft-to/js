import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { Network } from '@/types';

const shyft = new ShyftSdk({
  apiKey: process.env.API_KEY as string,
  network: Network.Mainnet,
});

describe('rpc test', () => {
  it('getRecentBlockHash', async () => {
    const response = await shyft.rpc.getLatestBlockhash('finalized');
    expect(typeof response).toBe('object');
  }, 50000);

  it('getAsset', async () => {
    const response = await shyft.rpc.getAsset({
      id: 'DCwtwRu4abRHLeMHNRNudwBrSTbQqcGGUSfBLQzfX7A4',
    });
    expect(response.compression?.leaf_id).toBe(37022);
  }, 50000);

  it('getAssetProof', async () => {
    const response = await shyft.rpc.getAssetProof({
      id: 'DCwtwRu4abRHLeMHNRNudwBrSTbQqcGGUSfBLQzfX7A4',
    });
    expect(Array.isArray(response.proof)).toBe(true);
  }, 50000);

  it('getAssetsByGroup', async () => {
    const response = await shyft.rpc.getAssetsByGroup({
      groupKey: 'collection',
      groupValue: 'BxWpbnau1LfemNAoXuAe9Pbft59yz2egTxaMWtncGRfN',
      sortBy: { sortBy: 'created', sortDirection: 'asc' },
      page: 1,
      limit: 1000,
    });
    expect(Array.isArray(response.items)).toBe(true);
  }, 50000);

  it('getAssetsByOwner', async () => {
    const response = await shyft.rpc.getAssetsByOwner({
      ownerAddress: 'EevH3LPRexR2431NSF6bCpBbPdQ2ViHbM1p84zujiEUs',
      page: 1,
    });
    expect(Array.isArray(response.items)).toBe(true);
  }, 50000);

  it('getAssetsByCreator', async () => {
    const response = await shyft.rpc.getAssetsByCreator({
      creatorAddress: 'EevH3LPRexR2431NSF6bCpBbPdQ2ViHbM1p84zujiEUs',
      page: 1,
    });
    expect(Array.isArray(response.items)).toBe(true);
  }, 50000);

  it('getAssetsByAuthority', async () => {
    const response = await shyft.rpc.getAssetsByAuthority({
      authorityAddress: 'EevH3LPRexR2431NSF6bCpBbPdQ2ViHbM1p84zujiEUs',
      page: 1,
    });
    expect(Array.isArray(response.items)).toBe(true);
  }, 50000);

  it('searchAssets', async () => {
    const response = await shyft.rpc.searchAssets({
      ownerAddress: 'EevH3LPRexR2431NSF6bCpBbPdQ2ViHbM1p84zujiEUs',
      creatorAddress: '2MiXcXedQeRc3bD5gTdvFsvLVi8pTyp298VdYNNghiN8',
      page: 1,
      limit: 10,
    });
    expect(Array.isArray(response.items)).toBe(true);
  }, 50000);
});
