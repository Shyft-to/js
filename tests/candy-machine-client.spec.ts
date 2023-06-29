import 'dotenv/config';
import { ShyftSdk } from '@/index';
import {
  Network,
  CandyMachineProgram,
  CreateCandyMachineResp,
  InsertCandyMachineResp,
  MintCandyMachineResp,
} from '@/types';

const shyft = new ShyftSdk({
  apiKey: process.env.API_KEY as string,
  network: Network.Devnet,
});

describe('candy machine test', () => {
  it('candy machine mints', async () => {
    const mints = await shyft.candyMachine.readMints({
      address: 'H2oYLkXdkX38eQ6VTqs26KAWAvEpYEiCtLt4knEUJxpu',
      version: CandyMachineProgram.V2,
    });
    expect(typeof mints).toBe('object');
  }, 50000);

  it('candy machine nft read', async () => {
    const mints = await shyft.candyMachine.readNfts({
      address: 'CZ7zmhqpUSFAtaW7BsyXmgsRaLjKBb6gWHiEnNFE9DNj',
    });
    expect(typeof mints).toBe('object');
  }, 50000);

  it('create candy machine', async () => {
    const response = await shyft.candyMachine.create({
      wallet: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      symbol: 'GB',
      maxSupply: 0,
      royalty: 333,
      collection: 'CxKYibvYT9H8qBw827LvGuz6BWvXSsSJSeCsbm5t27hN',
      itemsAvailable: 10,
      creators: [
        { address: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc', share: 100 },
      ],
      itemSettings: {
        prefixName: 'GetBoxie',
        nameLength: 10,
        prefixUri: 'https://nftstorage.link/ipfs/',
        uriLength: 100,
        isSequential: false,
      },
      groups: [
        {
          label: 'early',
          guards: {
            solPayment: {
              amount: 0.1,
              destination: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
            },
          },
        },
      ],
    });
    console.dir(response, { depth: null });
    expect(response.signers.length).toBe(1);
    expect(response).toMatchObject<CreateCandyMachineResp>({
      encoded_transaction: expect.any(String),
      candy_machine: expect.any(String),
      signers: expect.any(Array),
    });
  }, 50000);

  it('insert items to the candy machine', async () => {
    const response = await shyft.candyMachine.insert({
      wallet: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      candyMachine: '4tqTNb1uzRS3TakYpmnwbJzikyJ1iNB8BJ13v5ekdX56',
      items: [
        {
          name: '-duckk',
          uri: 'bafkreihpo7yhx6nxvgu2qbabdp6zsiy5v6g62mnjwqp5ye7ejb5b2ubb64',
        },
      ],
    });
    console.dir(response, { depth: null });
    expect(response.signers.length).toBe(1);
    expect(response).toMatchObject<InsertCandyMachineResp>({
      encoded_transaction: expect.any(String),
      signers: expect.any(Array),
    });
  }, 50000);

  it('mint items from the candy machine', async () => {
    const response = await shyft.candyMachine.mint({
      wallet: '3yTKSCKoDcjBFpbgxyJUh4cM1NG77gFXBimkVBx2hKrf',
      candyMachine: '4tqTNb1uzRS3TakYpmnwbJzikyJ1iNB8BJ13v5ekdX56',
      authority: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
      mintGroup: 'early',
    });
    console.dir(response, { depth: null });
    expect(response.signers.length).toBe(1);
    expect(response).toMatchObject<MintCandyMachineResp>({
      encoded_transaction: expect.any(String),
      mint: expect.any(String),
      signers: expect.any(Array),
    });
  }, 50000);

  it('monitor a candy machine', async () => {
    const response = await shyft.candyMachine.monitor({
      candyMachine: '4tqTNb1uzRS3TakYpmnwbJzikyJ1iNB8BJ13v5ekdX56',
    });
    expect(response).toBe(true);
  }, 50000);

  it('unmonitor a candy machine', async () => {
    const response = await shyft.candyMachine.unmonitor({
      candyMachine: '4tqTNb1uzRS3TakYpmnwbJzikyJ1iNB8BJ13v5ekdX56',
    });
    expect(response).toBe(true);
  }, 50000);
});
