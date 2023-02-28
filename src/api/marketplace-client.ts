import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import { Marketplace, Network } from '@/types';

const WRAPPED_SOL_ADDRESS = 'So11111111111111111111111111111111111111112';

export class MarketplaceClient {
  constructor(private readonly config: ShyftConfig) {}

  async create(input: {
    network?: Network;
    creatorWallet: string;
    authorityAddress?: string;
    currencyAddress?: string;
    feePayer?: string;
    feeRecipient?: string;
    transactionFee?: number;
  }): Promise<
    Marketplace & {
      encoded_transaction: string;
    }
  > {
    try {
      if (
        typeof input?.transactionFee === 'number' &&
        (input.transactionFee > 100 || input.transactionFee < 0)
      ) {
        throw new Error(
          'transactionFee should not be greater than 100 or lower than 0'
        );
      }
      const reqBody = {
        network: input?.network ?? this.config.network,
        creator_wallet: input.creatorWallet,
        transaction_fee: input?.transactionFee ?? 0,
      };
      if (input?.authorityAddress) {
        reqBody['authority_address'] = input.authorityAddress;
      }
      if (input?.currencyAddress) {
        reqBody['currency_address'] = input.currencyAddress;
      }
      if (input?.feePayer) {
        reqBody['fee_payer'] = input.feePayer;
      }
      if (input?.feeRecipient) {
        reqBody['fee_recipient'] = input.feeRecipient;
      }

      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'marketplace/create',
        data: reqBody,
      });
      const response = data.result as Marketplace & {
        encoded_transaction: string;
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(input: {
    network?: Network;
    authorityWallet: string;
    marketplaceAddress: string;
    newAuthorityAddress?: string;
    feePayer?: string;
    feeRecipient?: string;
    transactionFee?: number;
  }): Promise<
    Marketplace & {
      encoded_transaction: string;
    }
  > {
    try {
      const reqBody = {
        network: input?.network ?? this.config.network,
        authority_wallet: input.authorityWallet,
        marketplace_address: input.marketplaceAddress,
      };
      if (input?.newAuthorityAddress) {
        reqBody['new_authority_address'] = input.newAuthorityAddress;
      }
      if (input?.transactionFee) {
        reqBody['transaction_fee'] = input.transactionFee;
      }
      if (input?.feePayer) {
        reqBody['fee_payer'] = input.feePayer;
      }
      if (input?.feeRecipient) {
        reqBody['fee_recipient'] = input.feeRecipient;
      }

      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'marketplace/update',
        data: reqBody,
      });
      const response = data.result as Marketplace & {
        encoded_transaction: string;
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  async find(input: {
    network?: Network;
    authorityAddress: string;
    currencyAddress?: string;
  }): Promise<Marketplace> {
    try {
      const params = {
        network: input?.network ?? this.config.network,
        authority_address: input.authorityAddress,
        currency_address: input?.currencyAddress ?? WRAPPED_SOL_ADDRESS,
      };

      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'marketplace/find',
        params,
      });
      const response = data.result as Marketplace;
      return response;
    } catch (error) {
      throw error;
    }
  }
}
