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

  it('send transaction', async () => {
    const signature = await shyft.transaction.send({
      network: Network.Devnet,
      encodedTransaction:
        'ASCtcU9uCq3n1RanzUG0kn4tBX0jMBYJks1yruGSEpFR1zMKrTb6q4qttUGrx3Uq2/lCAbKCG6vZEvkwN9Q3xgkBAAEDGMqfUcVHHu2+lyU5gx9wU2rGxk2NoSXtodMSdev+DxVALAeVfwkorAqlrAeN8dOn8Jeu6H4u3ofHzGz4FntQPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWbWegET0pqstGQTS3s/zFAzsKX+EefI3qVuRYc29tMYBAgIAAQwCAAAAQEIPAAAAAAA=',
    });
    expect(typeof signature).toBe('string');
  });

  it('send multiple transactions', async () => {
    const response = await shyft.transaction.sendMany({
      network: Network.Devnet,
      encodedTransactions: [
        'AflRiSHDT+mkiqNqJ6MsY5cqITOcZ37+txZQqqYzazphSa/VBhFcFibFzi2rQ8IsaQkgBDHznqabolOzA/mNlAUBAAEDGMqfUcVHHu2+lyU5gx9wU2rGxk2NoSXtodMSdev+DxVALAeVfwkorAqlrAeN8dOn8Jeu6H4u3ofHzGz4FntQPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR9uaAIxMGKAuXPKB9d9mAA3oMZ/GRc3kbW+YxugY/jcBAgIAAQwCAAAAMBsPAAAAAAA=',
        'AW+cdqIs1kmQzpWS9YjXdx8eHqqv8IQsurH88P54ZUvbdysyCnsEpxEt2Y2xZ8+yCP/jj8hFyih8NZiWUqnb3QUBAAEDGMqfUcVHHu2+lyU5gx9wU2rGxk2NoSXtodMSdev+DxVALAeVfwkorAqlrAeN8dOn8Jeu6H4u3ofHzGz4FntQPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR9uaAIxMGKAuXPKB9d9mAA3oMZ/GRc3kbW+YxugY/jcBAgIAAQwCAAAAQEIPAAAAAAA=',
      ],
      commitment: 'confirmed',
    });
    expect(typeof response).toBe('object');
  });
});
