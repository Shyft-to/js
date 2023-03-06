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

### Shyft Wallet APIs

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

### Shyft NFT APIs

The SDK currently supports the following NFT API endpoints under the shyft.nft namespace:

- `getNftByMint()`: Get NFT on-chain and off-chain data
- `getNftByOwner()`: Get All NFTs held by a wallet address
- `createFromMetadata()`: Create an NFT from an already uploaded metadata URI. The on-chain metadata of the NFT is fetched from the off-chain metadata present at the given URI.
  > The metadata_uri should open a JSON document complying with Metaplex Non-Fungible Token Standard. If the JSON doesn't follow the Metaplex standard then the API returns an error.
- `burn()`: Burn a particular NFT.
- `transfer()`: Transfer an already minted NFT from one wallet to another.
  > Optionally, you can transfer update authority to the new owner as well.
- `transferMultiple()`: Transfer multiple NFTs from one wallet to another. It returns an encoded transaction which you can sign using the [tansaction signer](#how-to-sign-transaction-using-the-sdk).

### Fetch an NFT

```typescript
const shyft = new ShyftSdk({ apiKey: 'YOUR_API_KEY', network: Network.Devnet });
(async () => {
  const nft = await shyft.nft.getNftByMint({ mint: 'NFT_MINT' });
  console.log(nft);
})();
```

### Shyft Token APIs

The SDK currently supports the following Token API endpoints under the shyft.token namespace:

- `getInfo()`: This method returns you the information about an already launched Token.
- `getOwners()`: Returns all owners hold the token, sorted by the amount they are holding (high to low).
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

### Shyft CandyMachine APIs

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

### Shyft Marketplace APIs

Now SDK supports all marketplace APIs. Possible to perform each operation on marketplace from SDK.

Marketplace namespace:

- `create()`: Create your own on-chain NFT marketplace
- `update()`: Update an already created on-chain marketplace.
- `find()`: Find information about your previous or current Solana marketplaces. This API fetches a marketplace's information from the blockchain.
- `treasuryBalance()`: Check the fund balance in the marketplace treasury account.
- `stats()`: Fetches detailed statistics of a marketplace.
- `withdrawFee()`: Withdraw the transaction fees that got deposited in the marketplace treasury as a result of the sales transactions that happened in your marketplace. The withdrawn amount will go into the marketplace's fee recipient account.

* `listing`: A sub-namespace to list, unlist, buy, check active listings and many more.
  - `active()`: Get details of all the active listings in a marketplace.
  - `detail()`: Get details of a particular listing in a marketplace.
  - `bySeller()`: Get all the listings created by a particular seller (wallet address) in a marketplace.
  - `activeSellers()`: Fetches a list of all the sellers (wallet addresses) who presently have active listings in the marketplace.
  - `list()`: List an NFT for sale in the marketplace.
  - `unlist()`: Unlist an already listed NFT. This operation will make the NFT unavailable for sale, and nobody would be able to buy this NFT until it is listed back again.
  - `buy()`: Buy the listed NFT from the marketplace

### Create a marketplace

```typescript
const { encoded_transaction } = await shyft.marketplace.create({
  creatorWallet: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
});
console.log(encoded_transaction);
```

### List an NFT on a marketplace

```typescript
const { encoded_transaction } = await shyft.marketplace.listing.list({
  marketplaceAddress: 'dKtXyGgDGCyXiWtj9mbXUXk7ww996Uyc46CVt3ukJwV',
  nftAddress: '7Ros6azxoYakj3agxZetDwTWySftQeYXRXAKYWgXTWvw',
  price: 50,
  sellerWallet: '8hDQqsj9o2LwMk2FPBs7Rz5jPuzqKpRvkeeo6hMJm5Cv',
  isGasLess: true,
});
console.log(encoded_transaction);
```

### Fetch active listings on a marketplace

```typescript
const activeListings = await shyft.marketplace.listing.active({
  network: Network.Mainnet,
  marketplaceAddress: 'AxrRwpzk4T6BsWhttPwVCmfeEMbfbasv1QxVc5JhUfvB',
  sortBy: 'price',
  sortOrder: 'desc',
  page: 1,
  size: 2,
});
console.log(activeListings);
```

### Transaction APIs

Get parsed transaction and history easily.

Transaction namespace:

- `raw()`: Get raw transaction for a given txn signature.
- `parsed()`: Get parsed transaction details for a given txn signature. Read more on [parsed transaction structure](https://docs.shyft.to/start-hacking/transactions/parsed-transaction-structure)
- `history()`: Fetches a list of parsed transactions for an on-chain account. The response returns the transactions with the latest transactions first. The response can have results of a maximum of 10 transactions in 1 single call.

### Fetch transaction history

```typescript
const transactions = await shyft.transaction.history({
  network: Network.Devnet,
  account: 'Apeng15Pm8EjpAcaAXpNUxZjS2jMmGqikfs281Fz9hNj',
  enableRaw: true,
});
console.dir(transactions, { depth: null });
```

## How to sign transaction using the SDK?

### Transaction signer usage (with private keys)

```typescript
import { confirmTxnByPrivateKeys, Network } from '@shyft-to/js';

const network = Network.Devnet;
const privateKeys = ['PRIVATE_KEY_ONE', 'PRIVATE_KEY_TWO'];
// Get using Shyft API
const encodedTransaction =
  '5eG1aSjNoPmScw84G1d7f9n2fgmWabtQEgRjTUXvpTrRH1qduEMwUvUFYiS8px22JNedkWFTUWj9PrRyq1MyessunKC8Mjyq3hH5WZkM15D3gsooH8hsFegyYRBmccLBTEnPph6fExEySkJwsfH6oGC62VmDDCpWyPHZLYv52e4qtUb1TBE6SgXE6FX3TFqrX5HApSkb9ZaCSz21FyyEbXtrmMxBQE1CR7BTyadWL1Vy9SLfo9tnsVpHHDHthFRr'(
    async () => {
      try {
        const txnSignature = await confirmTxnByPrivateKeys(
          network,
          encodedTransaction,
          privateKeys
        );
        console.log(txnSignature);
      } catch (error) {
        throw new Error(error);
      }
    }
  )();
```

### Transaction signer usage (without private key)

```tsx
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { confirmTxn, Network, ShyftWallet } from '@shyft-to/js';

const { connection } = useConnection();
const { signTransaction, signAllTransactions } = useWallet();

const wallet: ShyftWallet = {
  signTransaction: signTransaction!,
  signAllTransactions: signAllTransactions!,
};
// Get using Shyft API
const encodedTransaction = '5eG1aSjNoPmScw84G1d7f9n2fgmWabtQEgRjTUXvpTrRH1qduEMwUvUFYiS8px22JNedkWFTUWj9PrRyq1MyessunKC8Mjyq3hH5WZkM15D3gsooH8hsFegyYRBmccLBTEnPph6fExEySkJwsfH6oGC62VmDDCpWyPHZLYv52e4qtUb1TBE6SgXE6FX3TFqrX5HApSkb9ZaCSz21FyyEbXtrmMxBQE1CR7BTyadWL1Vy9SLfo9tnsVpHHDHthFRr';
  async () => {
    try {
      const txnSignature = await confirmTxn(
          connection,
          encodedTransaction,
          wallet
        );
      console.log(txnSignature);
    } catch (error) {
      throw new Error(error);
    }
  }
)();
```

### Frontend usage

Use any starter from [here](https://github.com/solana-labs/wallet-adapter/tree/master/packages/starter) and implement the above code snippet or follow [Shyft sample project](https://github.com/Shyft-to/community-projects/tree/main/shyft-signer-react).

## Roadmap

- Integrate NFT create
- Marketplace client
- More features

## About Us

We're here to provide a bridge between web2 & web3.

## 🚀 Powered By

[Shyft](https://shyft.to)
