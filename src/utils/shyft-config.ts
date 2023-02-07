import { Network, ShyftSettings } from '@/types';

export class ShyftConfig {
  readonly apiKey: string;
  readonly network: Network;
  constructor(config: ShyftSettings) {
    this.apiKey = config.apiKey;
    this.network = config.network;
  }
}
