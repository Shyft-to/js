# Shyft JS SDK

[Shyft](https://shyft.to) SDK is the mising piece of arsenal we needed in our Web3 development journey. It is the [ultimate Web3 development platform](https://shyft.to) wrapped inside an intuitive SDK to make development 10x easier and more efficient. Explore what super powers Shyft offers you [Docs](https://docs.shyft.to).

## Installation

Install with npm

```bash
  npm install @shyft-to/js
```

## Usage/Examples

### Imports

```typescript
import { ShyftSdk, Network } from '@shyft-to/js';
```

or

```javascript
const { ShyftSdk, Network } = require('@shyft-to/js');
```

The Shyft SDK currently supports the following clients:

- `wallet`: Wallet APIs
- `nft`: Shyft NFT APIs
- `token`: Fungible tokens info
- `candyMachine`: Candy Machine APIs

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

### Shyft Token API

The SDK currently supports the following Token API endpoints under the shyft.token namespace:

- `getInfo()`: This method returns you the information about an already launched Token.
- `getgetOwners()`: Returns all owners hold the token, sorted by the amount they are holding (high to low).
  > This method supports pagination and only works with mainnet-beta network.

### Fetch info of a Fungible Token

```typescript
const shyft = new ShyftSdk({ apiKey: 'YOUR_API_KEY', network: Network.Devnet });
(async () => {
  const token = await shyft.token.getInfo({
    network: Network.Mainnet,
    mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  });
  console.log(token);
})();
```

### Shyft CandyMachine API

The SDK currently supports the following Candy Machine API endpoints under the shyft.candyMachine namespace:

- `readMints()`: Get All NFT addresses minted using a particular candy machine by providing a Candy machine address.
- `readNfts()`: Get All NFTs minted using a particular candy machine by providing a Candy machine address. Returns on-chain and off-chain NFT data. This is a paginated API.

### Get All NFT addresses of a CM

```typescript
const shyft = new ShyftSdk({ apiKey: 'YOUR_API_KEY', network: Network.Devnet });
(async () => {
  const mints = await shyftcandyMachine.readMints({
    address: 'H2oYLkXdkX38eQ6VTqs26KAWAvEpYEiCtLt4knEUJxpu',
    version: CandyMachineProgram.V2,
  });
  console.log(mints);
})();
```

### Transaction signer usage (with private key)

```typescript
import { confirmTransactionFromBackend, Network } from '@shyft-to/js';

const network = Network.Devnet;
const privateKey =
  '5GGZQpoiDPRJLwMonq4ovBBKbxvNq76L3zgMXyiQ5grbPzgF3k35dkHuWwt3GmwVGZBXywXteJcJ53Emsda92D5v';
// Get using Shyft API
const encodedTransaction =
  '5eG1aSjNoPmScw84G1d7f9n2fgmWabtQEgRjTUXvpTrRH1qduEMwUvUFYiS8px22JNedkWFTUWj9PrRyq1MyessunKC8Mjyq3hH5WZkM15D3gsooH8hsFegyYRBmccLBTEnPph6fExEySkJwsfH6oGC62VmDDCpWyPHZLYv52e4qtUb1TBE6SgXE6FX3TFqrX5HApSkb9ZaCSz21FyyEbXtrmMxBQE1CR7BTyadWL1Vy9SLfo9tnsVpHHDHthFRr'(
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
import { confirmTransactionFromFrontend, Network, ShyftWallet } from '@shyft-to/js';

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
