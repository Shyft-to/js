import { Network } from '..';

export function shyftClusterApiUrl(apiKey: string, cluster: Network): string {
  switch (cluster) {
    case 'devnet':
      return `https://devnet-rpc.shyft.to/${apiKey}`;
    case 'mainnet-beta':
      return `https://rpc.shyft.to/${apiKey}`;
    default:
      return '';
  }
}
