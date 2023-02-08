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

### Imports
```typescript
import { ShyftSdk, Network } from 'shyft-js';
```
or
```javascript
const { ShyftSdk, Network } = require('shyft-js');
```

The Shyft SDK currently supports the following clients:

- `wallet`: All Shyft Wallet API methods
- `nft`: All Shyft NFT API methods

### Shyft NFT API
The SDK currently supports the following NFT API endpoints under the shyft.nft namespace:
- `getNftByMint()`: Get NFT on-chain and off-chain data
- `getNftByOwner()`: Get All NFTs held by a wallet address

### Fetch an NFT

```typescript
const shyft = new ShyftSdk({ apiKey: 'YOUR_API_KEY', network: Network.Devnet });
(async () => {
  const nft = await shyft.nft.getNftByMint({ mint: 'NFT_MINT' });
  console.log(nft);
})();
```

### Shyft Wallet API
The Wallet API in the SDK standardizes response types to reduce developer friction, but note this results in some differences compared to the Shyft REST endpoints:
- `getBalance()`: Get wallet balance by providing address
- `getTokenBalance()`: Get the balance of a particular token in a wallet 
- `getAllTokenBalance()`: Gets the balance of all the tokens in your wallet
- `getPortfolio()`: Gets all the token deatils (fungible and non-fungible) from a wallet
- `getDomains()`: Gets all the .sol domain addresses associated with a wallet
- `resolveDomainByAddress()`: Resolves the given name account to the associated .sol domain address
- `collections()`: For all the NFTs in a wallet, this method returns a list of collections and NFTs under those collections
- `transactionHistory()`: Get the transaction history of your wallet
- `transaction()`: Get particular transaction details from the transaction signature
- `parsedTransactionHistory()`: Get the transaction history of your wallet in a nutshell


### Fetch Wallet Balance

```typescript
const shyft = new ShyftSdk({ apiKey: 'YOUR_API_KEY', network: Network.Devnet });
(async () => {
  const balance = await shyft.wallet.getBalance({ wallet: 'WALLET_ADDRESS' });
  console.log(balance);
})();
```


### Transaction signer usage (with private key)

```typescript
import { confirmTransactionFromBackend, Network } from 'shyft-js';

const network = Network.Devnet;
const privateKey =
  '5GGZQpoiDPRJLwMonq4ovBBKbxvNq76L3zgMXyiQ5grbPzgF3k35dkHuWwt3GmwVGZBXywXteJcJ53Emsda92D5v';
// Get using Shyft API
const encodedTransaction = '5eG1aSjNoPmScw84G1d7f9n2fgmWabtQEgRjTUXvpTrRH1qduEMwUvUFYiS8px22JNedkWFTUWj9PrRyq1MyessunKC8Mjyq3hH5WZkM15D3gsooH8hsFegyYRBmccLBTEnPph6fExEySkJwsfH6oGC62VmDDCpWyPHZLYv52e4qtUb1TBE6SgXE6FX3TFqrX5HApSkb9ZaCSz21FyyEbXtrmMxBQE1CR7BTyadWL1Vy9SLfo9tnsVpHHDHthFRr'(
  async () => {
    try {
      const tx = confirmTransactionFromBackend(
        network,
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

### Transaction signer usage (without private key)

```typescript
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { confirmTransactionFromFrontend, Network, ShyftWallet } from 'shyft-js';

const { connection } = useConnection();
const { signTransaction, signAllTransactions } = useWallet();

const wallet: ShyftWallet = {
  signTransaction,
  signAllTransactions,
}
// Get using Shyft API
const encodedTransaction = '5eG1aSjNoPmScw84G1d7f9n2fgmWabtQEgRjTUXvpTrRH1qduEMwUvUFYiS8px22JNedkWFTUWj9PrRyq1MyessunKC8Mjyq3hH5WZkM15D3gsooH8hsFegyYRBmccLBTEnPph6fExEySkJwsfH6oGC62VmDDCpWyPHZLYv52e4qtUb1TBE6SgXE6FX3TFqrX5HApSkb9ZaCSz21FyyEbXtrmMxBQE1CR7BTyadWL1Vy9SLfo9tnsVpHHDHthFRr';
  async () => {
    try {
      const txnSignature = await confirmTransactionFromFrontend(
          connection,
          encodedTransaction,
          shyftWallet
        );
      console.log(txnSignature);
    } catch (error) {
      throw new Error(error);
    }
  }
)();
```

### Frontend usage

Follow [sample project](https://github.com/Shyft-to/community-projects/tree/main/shyft-signer-frontend).

## Roadmap

- Integrate sync APIs

- More features

## About Us

We're here to provide a bridge between web2 & web3.

## 🚀 Powered By

[Shyft](https://shyft.to)
