import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import { Network, SendTransactionResp, TxnCommitment } from '@/types';

export class TxnRelayerClient {
  constructor(private readonly config: ShyftConfig) {}

  async getOrCreate(): Promise<string> {
    const data = await restApiCall(this.config.apiKey, {
      method: 'post',
      url: 'txn_relayer/create',
    });
    const wallet = data.result.wallet as string;
    return wallet;
  }

  async sign(input: {
    network?: Network;
    encodedTransaction: string;
  }): Promise<string> {
    const reqBody = {
      network: input.network ?? this.config.network,
      encoded_transaction: input.encodedTransaction,
    };

    const data = await restApiCall(this.config.apiKey, {
      method: 'post',
      url: 'txn_relayer/sign',
      data: reqBody,
    });
    const result = data.result?.tx as string;
    return result;
  }

  async signMany(input: {
    network?: Network;
    encodedTransactions: string[];
    commitment?: TxnCommitment;
  }): Promise<SendTransactionResp[]> {
    if (
      input.encodedTransactions.length > 50 ||
      input.encodedTransactions.length < 1
    ) {
      throw new Error('allowed between 1 to 50: encodedTransactions');
    }
    const reqBody = {
      network: input.network ?? this.config.network,
      encoded_transactions: input.encodedTransactions,
    };
    if (input?.commitment) {
      reqBody['commitment'] = input.commitment;
    }

    const data = await restApiCall(this.config.apiKey, {
      method: 'post',
      url: 'txn_relayer/sign_many',
      data: reqBody,
    });
    const result = data.result as SendTransactionResp[];
    return result;
  }
}
