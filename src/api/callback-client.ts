import { ShyftConfig } from '@/utils';
import { restApiCall } from '@/utils';
import {
  Network,
  TxnAction,
  CallBack,
  CallbackType,
  CallbackEncoding,
} from '@/types';

export class CallbackClient {
  constructor(private readonly config: ShyftConfig) {}

  async register(input: {
    network?: Network;
    addresses: string[];
    callbackUrl: string;
    events?: TxnAction[];
    enableRaw?: boolean;
    enableEvents?: boolean;
    type?: CallbackType;
    encoding?: CallbackEncoding;
  }): Promise<Omit<CallBack, 'created_at' | 'updated_at'>> {
    try {
      if (!this.isValidUrl(input.callbackUrl)) {
        throw new Error(`not a valid URL: ${input.callbackUrl}`);
      }
      const reqBody = {
        network: input?.network ?? this.config.network,
        addresses: input.addresses,
        callback_url: input.callbackUrl,
      };
      if (input?.events) {
        reqBody['events'] = input.events;
      }
      if (input?.enableRaw) {
        reqBody['enable_raw'] = input.enableRaw;
      }
      if (input?.enableEvents) {
        reqBody['enable_events'] = input.enableEvents;
      }
      if (input?.type) {
        reqBody['type'] = input.type;
      }
      if (input?.encoding) {
        reqBody['encoding'] = input.encoding;
      }
      const response = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'callback/create',
        data: reqBody,
      });
      const callback = response.result as CallBack;
      return callback;
    } catch (error) {
      throw error;
    }
  }

  async remove(input: { id: string }): Promise<boolean> {
    try {
      const reqBody = {
        id: input.id,
      };
      const response = await restApiCall(this.config.apiKey, {
        method: 'delete',
        url: 'callback/remove',
        data: reqBody,
      });
      const isRemoved = response.success as boolean;
      return isRemoved;
    } catch (error) {
      throw error;
    }
  }

  async update(input: {
    network?: Network;
    id: string;
    addresses: string[];
    callbackUrl: string;
    events?: TxnAction[];
    enableRaw?: boolean;
    enableEvents?: boolean;
    type?: CallbackType;
    encoding?: CallbackEncoding;
  }): Promise<
    Omit<
      CallBack,
      | 'callback_url'
      | 'enable_raw'
      | 'enable_events'
      | 'type'
      | 'encoding'
      | 'created_at'
      | 'updated_at'
    >
  > {
    try {
      if (!this.isValidUrl(input.callbackUrl)) {
        throw new Error(`not a valid URL: ${input.callbackUrl}`);
      }
      const reqBody = {
        network: input?.network ?? this.config.network,
        id: input.id,
        addresses: input.addresses,
        callback_url: input.callbackUrl,
      };
      if (input?.events) {
        reqBody['events'] = input.events;
      }
      if (input?.enableRaw) {
        reqBody['enable_raw'] = input.enableRaw;
      }
      if (input?.enableEvents) {
        reqBody['enable_events'] = input.enableEvents;
      }
      if (input?.type) {
        reqBody['type'] = input.type;
      }
      if (input?.encoding) {
        reqBody['encoding'] = input.encoding;
      }
      const response = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'callback/update',
        data: reqBody,
      });
      const callback = response.result as Omit<CallBack, 'callback_url'>;
      return callback;
    } catch (error) {
      throw error;
    }
  }

  async list(): Promise<CallBack[]> {
    try {
      const response = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'callback/list',
      });
      const callbacks = response.result.map((callback: any) => {
        return {
          id: callback?._id,
          network: callback?.network,
          addresses: callback?.addresses,
          callback_url: callback?.callback_url,
          events: callback?.events,
          enable_raw: callback?.enable_raw,
          enable_events: callback?.enable_events,
          type: callback?.type,
          encoding: callback?.encoding,
          created_at: new Date(callback.created_at),
          updated_at: new Date(callback.updated_at),
        } as CallBack;
      });
      return callbacks;
    } catch (error) {
      throw error;
    }
  }

  async addAddresses(input: {
    id: string;
    addresses: string[];
  }): Promise<Omit<CallBack, 'callback_url' | 'enable_raw'>> {
    try {
      const reqBody = {
        id: input.id,
        addresses: input.addresses,
      };
      const response = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'callback/add-addresses',
        data: reqBody,
      });
      const callback = response.result as Omit<
        CallBack,
        'callback_url' | 'enable_raw'
      >;
      return callback;
    } catch (error) {
      throw error;
    }
  }

  async removeAddresses(input: {
    id: string;
    addresses: string[];
  }): Promise<Omit<CallBack, 'callback_url' | 'enable_raw'>> {
    try {
      const reqBody = {
        id: input.id,
        addresses: input.addresses,
      };
      const response = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'callback/remove-addresses',
        data: reqBody,
      });
      const callback = response.result as Omit<
        CallBack,
        'callback_url' | 'enable_raw'
      >;
      return callback;
    } catch (error) {
      throw error;
    }
  }

  private isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }
}
