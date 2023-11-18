import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { Network } from '@/types';

const shyft = new ShyftSdk({
  apiKey: process.env.API_KEY as string,
  network: Network.Devnet,
});

describe('Transaction Relayer client test', () => {
  it('get or create relay wallet', async () => {
    const wallet = await shyft.txnRelayer.getOrCreate();
    expect(typeof wallet).toBe('string');
  });

  it('sign transaction', async () => {
    const signature = await shyft.txnRelayer.sign({
      network: Network.Devnet,
      encodedTransaction:
        'AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQACBc1gsUE/MCpM0cXSNRdR/uvKkw28CfT/UmFjeQO1P3RTZzmxZaKzGUFs516b0/MuXMRFJmwuLzL221Zha9e6/yURWkj1VBal8ukhGe3QD/WcUgoNM/i/hJJbB20A/LLeuAbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpxkeHlDF/XZwFVODF42SUvNKnI6z+t1y+mcP3Eqbp1vLLapjYzOUB2ZYSvnp0kYl1UD4ZcXxiFaQEf+mE1ygN6wEDBAEEAgAKDEBCDwAAAAAACQA=',
    });
    expect(typeof signature).toBe('string');
  });

  it('sign multiple transactions', async () => {
    const response = await shyft.txnRelayer.signMany({
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
