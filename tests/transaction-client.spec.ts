import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { Network } from '@/types';

const shyft = new ShyftSdk({
  apiKey: process.env.API_KEY as string,
  network: Network.Mainnet,
});

describe('Transaction client test', () => {
  it('fetch parsed txn', async () => {
    const parsedTranaction = await shyft.transaction.parsed({
      txnSignature:
        '3QBDUVjEhxuDbu2LL5FuwkUC1qsAVSayYYeCtBev8oi7XXnabxGirhyvkD7KTVKM3hBqpDnuxUQPo6kgZAXQtFRx',
    });
    console.dir(parsedTranaction.timestamp, { depth: null });
    expect(typeof parsedTranaction).toBe('object');
  });

  it('fetch raw txn', async () => {
    const rawTransaction = await shyft.transaction.raw({
      txnSignature:
        '3QBDUVjEhxuDbu2LL5FuwkUC1qsAVSayYYeCtBev8oi7XXnabxGirhyvkD7KTVKM3hBqpDnuxUQPo6kgZAXQtFRx',
    });
    expect(typeof rawTransaction).toBe('object');
  });

  it('fetch transaction history', async () => {
    const transactions = await shyft.transaction.history({
      network: Network.Mainnet,
      account: 'JCFRaPv7852ESRwJJGRy2mysUMydXZgVVhrMLmExvmVp',
      enableRaw: false,
      enableEvents: true,
    });
    console.dir(transactions[0].events, { depth: null });
    expect(typeof transactions).toBe('object');
  });

  it('selected transactions fetch', async () => {
    const transactions = await shyft.transaction.parseSelected({
      network: Network.Mainnet,
      transactionSignatues: [
        '67BJFsmeLhpPWLonvXyi46dh4UszCHZCWecUznfAdGX2KGEJxxGCoTiKAixMgZsBJBGTUQsDNHf697BQLceRdfd9',
        '4NcmYNHKAdTFnm8y78wQoKMmGCedhTVFrWeHdEGYaThY4AYQ96fbeADY48B7XSgDz6RCZUDqnNPVWay34M18yXmg',
      ],
      enableRaw: false,
      enableEvents: true,
    });
    expect(typeof transactions).toBe('object');
  });
});
