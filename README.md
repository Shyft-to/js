# Shyft JS SDK [transaction-signer]

This package is built on top of [@solana/web3.js](https://solana-labs.github.io/solana-web3.js) and [solana-wallet-adapter](https://github.com/solana-labs/wallet-adapter).
You can sign & send transaction using this package.

## Installation

Install with npm & yarn

```bash
  Coming soon...
```
Install from GitHub

```bash
  npm i https://github.com/Shyft-to/js
```

## Usage/Examples

### Backend usage

```javascript
import { confirmTransactionFromBackend } from 'shyft-js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

const network = WalletAdapterNetwork.Devnet;
const privateKey =
  '5GGZQpoiDPRJLwMonq4ovBBKbxvNq76L3zgMXyiQ5grbPzgF3k35dkHuWwt3GmwVGZBXywXteJcJ53Emsda92D5v';
// Get using Shyft API
const encodedTransaction = '5eG1aSjNoPmScw84G1d7f9n2fgmWabtQEgRjTUXvpTrRH1qduEMwUvUFYiS8px22JNedkWFTUWj9PrRyq1MyessunKC8Mjyq3hH5WZkM15D3gsooH8hsFegyYRBmccLBTEnPph6fExEySkJwsfH6oGC62VmDDCpWyPHZLYv52e4qtUb1TBE6SgXE6FX3TFqrX5HApSkb9ZaCSz21FyyEbXtrmMxBQE1CR7BTyadWL1Vy9SLfo9tnsVpHHDHthFRr'(
  async () => {
    try {
      const tx = confirmTransactionFromBackend(
        WalletAdapterNetwork.Devnet,
        privateKey,
        encodedTransaction
      );
      console.log(tx);
    } catch (error) {
      throw new Error(error);
    }
  }
)();
```

### Frontend usage

Follow [sample project](https://github.com/rex-god/shyft_signer_frontend).

## Roadmap

- Integrate sync APIs

- More features

## About Us

We're here to provide a bridge between web2 & web3.

## 🚀 Powered By

[Shyft](https://shyft.to)
