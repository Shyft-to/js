import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import { WalletKeypair } from '@/types';

export class SemiCustodialWalletClient {
  constructor(private readonly config: ShyftConfig) {}

  async create(input: { password: string }): Promise<string> {
    try {
      const reqBody = {
        password: input.password,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'semi_wallet/create',
        data: reqBody,
      });
      const walletAddress = data.result.wallet_address as string;
      return walletAddress;
    } catch (error) {
      throw error;
    }
  }

  async getKeypair(input: {
    password: string;
    walletAddress: string;
  }): Promise<WalletKeypair> {
    try {
      const params = {
        password: input.password,
        wallet: input.walletAddress,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'semi_wallet/get_keypair',
        params,
      });
      const wallet = data.result as WalletKeypair;
      return wallet;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(input: {
    currentPassword: string;
    newPassword: string;
    walletAddress: string;
  }): Promise<boolean> {
    try {
      const reqBody = {
        current_password: input.currentPassword,
        new_password: input.newPassword,
        wallet: input.walletAddress,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'semi_wallet/change_password',
        data: reqBody,
      });
      const isPasswordChanged = data.success as boolean;
      return isPasswordChanged;
    } catch (error) {
      throw error;
    }
  }
}
