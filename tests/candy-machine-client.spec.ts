import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { CandyMachineProgram, Network } from '@/types';

const shyft = new ShyftSdk({
  apiKey: process.env.API_KEY as string,
  network: Network.Devnet,
});

describe('candy machine test', () => {
  it.skip('candy machine mints', async () => {
    const mints = await shyft.candyMachine.readMints({
      address: 'H2oYLkXdkX38eQ6VTqs26KAWAvEpYEiCtLt4knEUJxpu',
      version: CandyMachineProgram.V2,
    });
    expect(typeof mints).toBe('object');
  }, 50000);

  it('candy machine nft read', async () => {
    const mints = await shyft.candyMachine.readNfts({
      address: 'H2oYLkXdkX38eQ6VTqs26KAWAvEpYEiCtLt4knEUJxpu',
      version: CandyMachineProgram.V2,
    });
    expect(typeof mints).toBe('object');
  }, 50000);
});
