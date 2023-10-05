import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import {
  Network,
  ParsedTxnSummary,
  RawTransaction,
  TransactionHistory,
} from '@/types';

export class TransactionClient {
  constructor(private readonly config: ShyftConfig) {}

  async raw(input: {
    network?: Network;
    txnSignature: string;
  }): Promise<RawTransaction> {
    const params = {
      network: input.network ?? this.config.network,
      txn_signature: input.txnSignature,
    };
    const data = await restApiCall(this.config.apiKey, {
      method: 'get',
      url: 'transaction/raw',
      params,
    });
    const transaction = data.result as RawTransaction;
    return transaction;
  }

  async parsed(input: {
    network?: Network;
    txnSignature: string;
  }): Promise<ParsedTxnSummary> {
    const params = {
      network: input.network ?? this.config.network,
      txn_signature: input.txnSignature,
    };
    const data = await restApiCall(this.config.apiKey, {
      method: 'get',
      url: 'transaction/parsed',
      params,
    });
    const transaction = data.result as ParsedTxnSummary;
    return transaction;
  }

  async history(input: {
    network?: Network;
    account: string;
    txNum?: number;
    beforeTxSignature?: string;
    enableRaw?: boolean;
  }): Promise<TransactionHistory> {
    const params = {
      network: input.network ?? this.config.network,
      account: input.account,
    };
    if (input?.txNum) {
      if (input.txNum > 100 || input.txNum < 1)
        throw new Error(
          "'txNum' should not be greater than 100 or less than 1"
        );
      params['tx_num'] = input.txNum;
    }
    if (input?.beforeTxSignature) {
      params['before_tx_signature'] = input.beforeTxSignature;
    }
    if (input?.enableRaw) {
      params['enable_raw'] = input.enableRaw;
    }

    const data = await restApiCall(this.config.apiKey, {
      method: 'get',
      url: 'transaction/history',
      params,
    });
    const transactions = data.result as TransactionHistory;
    return transactions;
  }
}
