import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import {
  Domain,
  GroupNftsInCollection,
  Portfolio,
  TokenBalance,
  ParsedTranaction,
} from '@/types';

export class WalletClient {
  constructor(private readonly config: ShyftConfig) {}

  async getBalance(input: {
    network: WalletAdapterNetwork;
    wallet: string;
  }): Promise<number> {
    try {
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/balance',
        params: input,
      });
      const balance = data.result.balance as number;
      return balance;
    } catch (error) {
      throw error;
    }
  }

  async getTokenBalance(input: {
    network: WalletAdapterNetwork;
    wallet: string;
    token: string;
  }): Promise<Omit<TokenBalance, 'associated_token'>> {
    try {
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/token_balance',
        params: input,
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
    network: WalletAdapterNetwork;
    wallet: string;
  }): Promise<TokenBalance[]> {
    try {
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/all_tokens',
        params: input,
      });
      const tokenBalances = data.result as TokenBalance[];
      return tokenBalances;
    } catch (error) {
      throw error;
    }
  }

  async getPortfolio(input: {
    network: WalletAdapterNetwork;
    wallet: string;
  }): Promise<Portfolio> {
    try {
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/get_portfolio',
        params: input,
      });
      const portfolio = data.result as Portfolio;
      console.log('portfolio', portfolio);

      return portfolio;
    } catch (error) {
      throw error;
    }
  }

  async getDomains(input: {
    network: WalletAdapterNetwork;
    wallet: string;
  }): Promise<Domain[]> {
    try {
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/get_domains',
        params: input,
      });
      const domains = data.result as Domain[];
      if (domains.length > 0) {
        throw new Error('Not found any domain');
      }
      return domains;
    } catch (error) {
      throw error;
    }
  }

  async resolveDomainByAddress(input: {
    network: WalletAdapterNetwork;
    address: string;
  }): Promise<string> {
    try {
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'wallet/resolve_address',
        params: input,
      });
      const domain = data.result.name as string;
      return domain;
    } catch (error) {
      throw error;
    }
  }

  async collections(input: {
    network: WalletAdapterNetwork;
    wallet: string;
  }): Promise<GroupNftsInCollection> {
    try {
      const params = {
        network: input.network,
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
    network: WalletAdapterNetwork;
    wallet: string;
    limit?: number;
  }): Promise<ParsedTransactionWithMeta[]> {
    try {
      const params = {
        network: input.network,
        wallet_address: input.wallet,
        tx_num: input.limit ? input.limit : 10,
      };
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
    network: WalletAdapterNetwork;
    txnSignature: string;
  }): Promise<ParsedTransactionWithMeta> {
    try {
      const params = {
        network: input.network,
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
    network: WalletAdapterNetwork;
    wallet: string;
    limit?: number;
  }): Promise<ParsedTranaction[]> {
    try {
      const params = {
        network: input.network,
        account: input.wallet,
        tx_num: input.limit ? input.limit : 10,
      };
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
