import { ShyftSettings } from '@/types';

export class ShyftConfig {
  readonly apiKey: string;
  constructor(config: ShyftSettings) {
    this.apiKey = config.apiKey;
  }
}
