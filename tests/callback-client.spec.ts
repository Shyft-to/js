import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { Network, CallBack, TxnAction } from '@/types';

const shyft = new ShyftSdk({
  apiKey: process.env.API_KEY as string,
  network: Network.Devnet,
});

describe('callback test', () => {
  it.skip('register callback', async () => {
    const callback = await shyft.callback.register({
      addresses: ['2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc'],
      callbackUrl: 'https://webhook.site/540c3516-b94c-4e64-a271-fa6450858869',
      enableRaw: true,
    });
    console.log(callback);
    expect(callback).toMatchObject<Omit<CallBack, 'enable_raw'>>({
      id: expect.any(String),
      network: expect.any(String),
      addresses: expect.any(Array),
      callback_url: expect.any(String),
      events: expect.any(Array),
    });
  }, 50000);

  it.skip('remove callback', async () => {
    const isRemoved = await shyft.callback.remove({
      id: '643fec93b0b969e4b39b16b3',
    });
    expect(isRemoved).toBe(true);
  }, 50000);

  it('register callback', async () => {
    const callback = await shyft.callback.update({
      id: '643feecdb0b969e4b39b1a58',
      addresses: ['2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc'],
      callbackUrl: 'https://webhook.site/540c3516-b94c-4e64-a271-fa6450858869',
      enableRaw: true,
      events: [TxnAction.SOL_TRANSFER],
    });
    console.log(callback);
    expect(callback).toMatchObject<
      Omit<CallBack, 'callback_url' | 'enable_raw'>
    >({
      id: expect.any(String),
      network: expect.any(String),
      addresses: expect.any(Array),
      events: expect.any(Array),
    });
  }, 50000);

  it('get callbacks', async () => {
    const callbacks = await shyft.callback.list();
    console.log(callbacks);
    expect(callbacks[0]).toMatchObject<CallBack>({
      id: expect.any(String),
      network: expect.any(String),
      addresses: expect.any(Array),
      callback_url: expect.any(String),
      events: expect.any(Array),
      enable_raw: expect.any(Boolean),
    });
  }, 50000);
});
