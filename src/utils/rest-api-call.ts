import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiError } from '../types/error-types';

export async function restApiCall(
  apiKey: string,
  config: AxiosRequestConfig
): Promise<any> {
  try {
    const baseURL = 'https://api.shyft.to/sol/v1/';
    const headers = { 'x-api-key': apiKey };
    const { data } = await axios.request({ ...config, baseURL, headers });
    return data;
  } catch (error) {
    const err = error as AxiosError;
    const apiError = err.response?.data as ApiError;
    if (typeof apiError.error === 'object') {
      throw new Error(JSON.stringify(apiError.error));
    }
    throw apiError.error;
  }
}
