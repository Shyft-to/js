import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import {
  Domain,
  GroupNftsInCollection,
  Portfolio,
  TokenBalance,
  ParsedTranaction,
  Network,
} from '@/types';

export class WalletClient {
  constructor(private readonly config: ShyftConfig) {}

  async getBalance(input: {
    network?: Network;
    wallet: string;
  }): Promise<number> {
    try {
      const params = {
        network: input.network ?? this.config.network,
        wallet: input.wallet,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/balance',
        params,
      });
      const balance = data.result.balance as number;
      return balance;
    } catch (error) {
      throw error;
    }
  }

  async getTokenBalance(input: {
    network?: Network;
    wallet: string;
    token: string;
  }): Promise<Omit<TokenBalance, 'associated_token'>> {
    try {
      const params = {
        network: input.network ?? this.config.network,
        wallet: input.wallet,
        token: input.token,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/token_balance',
        params,
      });
      const tokenBalances = data.result as Omit<
        TokenBalance,
        'associated_token'
      >;
      return tokenBalances;
    } catch (error) {
      throw error;
    }
  }

  async getAllTokenBalance(input: {
    network?: Network;
    wallet: string;
  }): Promise<TokenBalance[]> {
    try {
      const params = {
        network: input.network ?? this.config.network,
        wallet: input.wallet,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/all_tokens',
        params,
      });
      const tokenBalances = data.result as TokenBalance[];
      return tokenBalances;
    } catch (error) {
      throw error;
    }
  }

  async getPortfolio(input: {
    network?: Network;
    wallet: string;
  }): Promise<Portfolio> {
    try {
      const params = {
        network: input.network ?? this.config.network,
        wallet: input.wallet,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/get_portfolio',
        params,
      });
      const portfolio = data.result as Portfolio;
      console.log('portfolio', portfolio);

      return portfolio;
    } catch (error) {
      throw error;
    }
  }

  async getDomains(input: {
    network?: Network;
    wallet: string;
  }): Promise<Domain[]> {
    try {
      const params = {
        network: input.network ?? this.config.network,
        wallet: input.wallet,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/get_domains',
        params,
      });
      const domains = data.result as Domain[];
      return domains;
    } catch (error) {
      throw error;
    }
  }

  async resolveDomainByAddress(input: {
    network?: Network;
    address: string;
  }): Promise<string> {
    try {
      const params = {
        network: input.network ?? this.config.network,
        address: input.address,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/resolve_address',
        params,
      });
      const domain = data.result.name as string;
      return domain;
    } catch (error) {
      throw error;
    }
  }

  async collections(input: {
    network?: Network;
    wallet: string;
  }): Promise<GroupNftsInCollection> {
    try {
      const params = {
        network: input.network ?? this.config.network,
        wallet_address: input.wallet,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/collections',
        params,
      });
      const collections = data.result.collections as GroupNftsInCollection;
      return collections;
    } catch (error) {
      throw error;
    }
  }

  async transactionHistory(input: {
    network?: Network;
    wallet: string;
    limit?: number;
    beforeTxSignature?: string;
  }): Promise<ParsedTransactionWithMeta[]> {
    try {
      const params = {
        network: input.network ?? this.config.network,
        wallet: input.wallet,
        tx_num: input.limit ? input.limit : 10,
      };
      if (input?.beforeTxSignature) {
        params['before_tx_signature'] = input.beforeTxSignature;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/transaction_history',
        params,
      });
      const trsnsactions = data.result as ParsedTransactionWithMeta[];
      return trsnsactions;
    } catch (error) {
      throw error;
    }
  }

  async transaction(input: {
    network?: Network;
    txnSignature: string;
  }): Promise<ParsedTransactionWithMeta> {
    try {
      const params = {
        network: input.network ?? this.config.network,
        txn_signature: input.txnSignature,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/transaction',
        params,
      });
      const trsnsaction = data.result as ParsedTransactionWithMeta;
      return trsnsaction;
    } catch (error) {
      throw error;
    }
  }

  async parsedTransactionHistory(input: {
    network?: Network;
    wallet: string;
    limit?: number;
    beforeTxSignature?: string;
  }): Promise<ParsedTranaction[]> {
    try {
      const params = {
        network: input.network ?? this.config.network,
        account: input.wallet,
        tx_num: input.limit ? input.limit : 10,
      };
      if (input?.beforeTxSignature) {
        params['before_tx_signature'] = input.beforeTxSignature;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/parsed_transaction_history',
        params,
      });
      const trsnsactions = data.result as ParsedTranaction[];
      return trsnsactions;
    } catch (error) {
      throw error;
    }
  }
}
