import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import {
  Network,
  ParsedTxnSummary,
  RawTransaction,
  SendTransactionResp,
  TransactionHistory,
  TxnCommitment,
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
    enableEvents?: boolean;
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
    if (input?.enableEvents) {
      params['enable_events'] = input.enableEvents;
    }

    const data = await restApiCall(this.config.apiKey, {
      method: 'get',
      url: 'transaction/history',
      params,
    });
    const transactions = data.result as TransactionHistory;
    return transactions;
  }

  async parseSelected(input: {
    network?: Network;
    transactionSignatues: string[];
    enableRaw?: boolean;
    enableEvents?: boolean;
  }): Promise<TransactionHistory> {
    if (
      input.transactionSignatues.length > 50 ||
      input.transactionSignatues.length < 1
    ) {
      throw new Error('allowed between 1 to 50: transactionSignatues');
    }
    const reqBody = {
      network: input.network ?? this.config.network,
      transaction_signatures: input.transactionSignatues,
    };
    if (input?.enableRaw) {
      reqBody['enable_raw'] = input.enableRaw;
    }
    if (input?.enableEvents) {
      reqBody['enable_events'] = input.enableEvents;
    }

    const data = await restApiCall(this.config.apiKey, {
      method: 'post',
      url: 'transaction/parse_selected',
      data: reqBody,
    });
    const transactions = data.result as TransactionHistory;
    return transactions;
  }

  async send(input: {
    network?: Network;
    encodedTransaction: string;
  }): Promise<string> {
    const reqBody = {
      network: input.network ?? this.config.network,
      encoded_transaction: input.encodedTransaction,
    };

    const data = await restApiCall(this.config.apiKey, {
      method: 'post',
      url: 'transaction/send_txn',
      data: reqBody,
    });
    const result = data.result?.signature as string;
    return result;
  }

  async sendMany(input: {
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
      url: 'transaction/send_many_txns',
      data: reqBody,
    });
    const result = data.result as SendTransactionResp[];
    return result;
  }
}
