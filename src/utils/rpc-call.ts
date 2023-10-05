import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiError } from '@/types';
import { Connection } from '@solana/web3.js';

export async function rpcCall(
  connection: Connection,
  config?: AxiosRequestConfig
): Promise<any> {
  try {
    const rpcUrl = connection.rpcEndpoint;
    if (new URL(rpcUrl).hostname !== 'rpc.shyft.to') {
      throw new Error(
        "Currently DAS API support available only for the 'mainnet-beta' cluster"
      );
    }
    const headers = {
      'Content-Type': 'application/json',
    };
    const { data } = await axios.request({
      ...config,
      method: 'post',
      baseURL: rpcUrl,
      headers,
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const err = error as AxiosError;
      const apiError = err.response?.data as ApiError;
      if (typeof apiError.error === 'object') {
        if ('message' in apiError.error) {
          throw new Error(apiError.error['message'] as string);
        }
        throw new Error(JSON.stringify(apiError.error));
      }
      if (typeof apiError.error === 'string') {
        throw new Error(apiError.error);
      }
      if (typeof apiError['message'] === 'string') {
        throw new Error(apiError['message']);
      }
      throw apiError.error;
    } else {
      throw error;
    }
  }
}
