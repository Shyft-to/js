# Shyft JS SDK

| [ ![MIT License ](https://img.shields.io/npm/l/@shyft-to/js?registry_uri=https%3A%2F%2Fregistry.npmjs.com&style=plastic) ](https://github.com/Shyft-to/js/blob/main/LICENSE) | [ ![Typescript ](https://img.shields.io/npm/types/@shyft-to/js?style=plastic) ](https://www.npmjs.com/package/@shyft-to/js) | [ ![npm version ](https://img.shields.io/npm/v/@shyft-to/js?style=plastic) ](https://www.npmjs.com/package/@shyft-to/js) | [ ![Weekly Downloads ](https://img.shields.io/npm/dw/@shyft-to/js?style=plastic) ](https://www.npmjs.com/package/@shyft-to/js) | [ ![Typedoc ](https://img.shields.io/static/v1?label=Typedoc&message=0.24&color=blueviolet&style=plastic) ](https://shyft-to.github.io/js) |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |

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
- `marketplace`: Marketplace APIs
- `transaction`: Transation APIs
- `storage`: Storage APIs such as uploading asset or metadata and get IPFS uri.
- `semiCustodialWallet`: A simple in-app crypto wallet to securely and quickly onboard non-native crypto users to web3 dApps.
- `callback`: Get real time updates on addresses for your users.
- `rpc`: [Get access to DAS API (currently only works with `mainnet-beta` cluster) 🆕](#rpc)

### Shyft Wallet APIs

The Wallet API in the SDK standardizes response types to reduce developer friction, but note this results in some differences compared to the Shyft REST endpoints:

- `getBalance()`: Get wallet balance by providing address
- `sendSol()`: Transfer SOL from one wallet to another
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

- `getNftByMint()`: Get NFT on-chain and off-chain data.
- `getNftsByMintAddresses()`: Get multiple NFTs on-chain and off-chain data.
- `getNftByOwner()`: Get All NFTs held by a wallet address.
- `getOwners()`: Returns NFT Owners for the provided NFT mint address list.
- `createFromMetadata()`: Create an NFT from an already uploaded metadata URI. The on-chain metadata of the NFT is fetched from the off-chain metadata present at the given URI.
  > The metadata_uri should open a JSON document complying with Metaplex Non-Fungible Token Standard. If the JSON doesn't follow the Metaplex standard then the API returns an error.
- `burn()`: Burn a particular NFT.
- `burnMany()`: Burn as many NFTs from a wallet as you want. This API endpoint returns one or multiple encoded transaction strings, which have to be signed by the NFT owner's wallet and submitted to the blockchain for successful burns.
- `transfer()`: Transfer an already minted NFT from one wallet to another.
  > Optionally, you can transfer update authority to the new owner as well.
- `transferMultiple()`: Transfer multiple NFTs from one wallet to another. It returns an encoded transaction which you can sign using the [tansaction signer](#how-to-sign-transaction-using-the-sdk).
- `createV2()`: Creating an NFT, and is just 1 simple API call, which internally does all the heavy lifting for you.
- `updateV2()`: This call allows an external wallet to pay the gas fee for updating NFT on behalf of the NFT update authority.

* `collection`: A sub-namespace to get NFTs and other interesting insights over NFT collections.

  - `getNfts()`: Get on-chain metadata for NFTs in a collection. This API supports pagination support, with a default page size of 10 and maximum 50 allowed.
    > This method supports pagination and only works with mainnet-beta network.

* `compressed`: A sub-namespace to create, read, transfer and burn compressed NFTs.
  - `createMerkleTree()`: Creates a merkle tree.
  - `mint()`: Allows you to mint cNFTs.
  - `transfer()`: Transfer an already minted cNFT from one wallet to another.
  - `transferMany()`: Transfer multiple cNFTs from one wallet to another.
  - `burn()`: Burn a particular cNFT.
  - `read()`: Returns on-chain and off-chain cNFT data.
  - `readAll()`: Returns on-chain and off-chain data of all cNFTs in the wallet.

### Fetch an NFT

```typescript
const shyft = new ShyftSdk({ apiKey: 'YOUR_API_KEY', network: Network.Devnet });
(async () => {
  const nft = await shyft.nft.getNftByMint({ mint: 'NFT_MINT' });
  console.log(nft);
})();
```

### Mint a compressed NFT ✨

```typescript
const mintResponse = await shyft.nft.compressed.mint({
  creatorWallet: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
  merkleTree: 'DwoJS9LVDVL55Qa2TwvGG8MqNB5He4JtbnrHQ7JCrkcP',
  metadataUri:
    'https://nftstorage.link/ipfs/bafkreigjxlfjhnpync5qmgv73yi4lqz4e65axwgpgqumvbopgvdrkwjpcm',
  collectionAddress: 'DgXdP7xA31HEviRKw6pk9Xj342dEWy8HFn1yjcsXZ9M9',
  receiver: '5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2',
});
console.log(mintResponse);
```

### Shyft Token APIs

The SDK currently supports the following Token API endpoints under the shyft.token namespace:

- `getInfo()`: This method returns you the information about an already launched Token.
- `getOwners()`: Returns all owners hold the token, sorted by the amount they are holding (high to low).
  > This method supports pagination and only works with mainnet-beta network.
- `create()`: Create your own fungible tokens.
- `mint()`: This API lets you mint and create new units of your Fungible Token. This will increase the total supply of the token. In order to mint a token, you need to create it first.
- `burn()`: This API lets you burn or decrease the supply of your Fungible Tokens.
- `transfer()`: Transfer already minted tokens from one wallet to another wallet address. This does not change the total supply of the token.
- `airdrop()`: Airdrop any SPL-20 token to the accounts of your choice, from 1 source account.

### Fetch info of a Fungible Token

```typescript
const shyft = new ShyftSdk({ apiKey: 'YOUR_API_KEY', network: Network.Devnet });
(async () => {
  const token = await shyft.token.getInfo({
    network: Network.Mainnet,
    tokenAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  });
  console.log(token);
})();
```

### Shyft CandyMachine APIs

The SDK currently supports the following Candy Machine API endpoints under the shyft.candyMachine namespace:

- `readMints()`: Get All NFT addresses minted using a particular candy machine by providing a Candy machine address.
- `readNfts()`: Get All NFTs minted using a particular candy machine by providing a Candy machine address. Returns on-chain and off-chain NFT data. This is a paginated API.
- `create()`: Create Candy Machine.
- `insert()`: Insert Items in Candy Machine.
- `mint()`: Mint NFTs from Candy Machine.
- `monitor()`: All mints from candy machine are watched and updated real time.
- `unmonitor()`: Stop monitoring candy machine.

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

* `bidding`: A sub-namespace to bid, cancel bid, accept bid, check active bids and many more.
  - `active()`: Get details of all the active bids in a marketplace.
  - `bid()`: Bid on an NFT for sale in the marketplace.
  - `cancelBid()`: Cancel the existing bid.
  - `acceptBid()`: NFT owner can accept the bid, the owner gets the bid amount and the bidder receives the NFT.

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

### Storage APIs

Your gateway to decentralized storage

Storage namespace:

- `uploadAsset()`: Upload anything to decentralized storage. Call the API with file: anything as form-data.
  > Note: For IPFS, you will get the same id on uploading same content.
- `createMetadata()`: This lets you create an NFT metadata JSON file on decentralized storage (IPFS).

### Create NFT Metadata

```typescript
const { uri } = await shyft.storage.createMetadata({
  creator: '2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc',
  image:
    'https://nftstorage.link/ipfs/bafkreiajrjd7xozubfr7qk6xdktlo3k66jg6jkeamgjugd2p3w5w2pifve',
  name: 'Nirvana',
  symbol: 'NVN',
  description: 'This is a test NFT',
  attributes: [
    { trait_type: 'anger', value: 0 },
    { trait_type: 'calmness', value: 100 },
  ],
  sellerFeeBasisPoints: 500,
});
console.log(uri);
```

### Semi Custodial Wallet APIs

A type of wallet where Shyft holds half of your private keys while the other half is with the client or the end user.

semicustodial namespace:

- `create()`: We create a standard Solana wallet using keypair.generate(). The private key is then encrypted with the provided password and random encryption parameters. In order to decrypt the key, we need the same password and the same encryption parameters.
  > Shyft never ever stores or logs your password at any time. This can be confirmed with our open source code.
- `getKeypair()`: Get keypair of created semi custodial wallet.
- `changePassword()`: Change password of semi custodial wallet.

### Callbacks

Get real time updates on addresses for your users. Follow [docs](https://docs.shyft.to/start-hacking/callbacks) to know about callbacks.

callback namespace:

- `register()`: Register a callback.
- `update()`: Update a callback.
- `remove()`: Remove a callback.
- `list()`: Returns a list of all the callbacks registered for a user.
- `addAddresses()`: Add Addresses in Callback.
- `removeAddresses()`: Remove Addresses from callback.

### RPC

Access the new Solana DAS (Digital Asset Standard) API.

rpc namespace:

- `getAsset()`: Get an asset by its ID.
- `getAssetProof()`: Get a merkle proof for a compressed asset by its ID.
- `getAssetsByGroup()`: Get a list of assets by a group key and value. An example presented [here](#fetch-assets-of-a-collection).
- `getAssetsByOwner()`: Get a list of assets owned by an address.
- `getAssetsByCreator()`: Get a list of assets created by an address.
- `getAssetsByAuthority()`: Get a list of assets with a specific authority.

#### Fetch assets of a collection

```typescript
import { ShyftSdk, Network } from '@shyft-to/js';

const shyft = new ShyftSdk({
  apiKey: 'YOUR_API_KEY',
  network: Network.Mainnet,
});

(async () => {
  const response = await shyft.rpc.getAssetsByGroup({
    groupKey: 'collection',
    groupValue: 'BxWpbnau1LfemNAoXuAe9Pbft59yz2egTxaMWtncGRfN',
    sortBy: { sortBy: 'created', sortDirection: 'asc' },
    page: 1,
    limit: 1000,
  });
  const assets = response.items;
  console.log(assets);
})();
```

## How to sign transaction using the SDK?

### Transaction signer usage (with private keys)

```typescript
import { signAndSendTransactionWithPrivateKeys, Network } from '@shyft-to/js';

const network = Network.Devnet;
const privateKeys = ['PRIVATE_KEY_ONE', 'PRIVATE_KEY_TWO'];
// Get using Shyft API
const encodedTransaction =
  '5eG1aSjNoPmScw84G1d7f9n2fgmWabtQEgRjTUXvpTrRH1qduEMwUvUFYiS8px22JNedkWFTUWj9PrRyq1MyessunKC8Mjyq3hH5WZkM15D3gsooH8hsFegyYRBmccLBTEnPph6fExEySkJwsfH6oGC62VmDDCpWyPHZLYv52e4qtUb1TBE6SgXE6FX3TFqrX5HApSkb9ZaCSz21FyyEbXtrmMxBQE1CR7BTyadWL1Vy9SLfo9tnsVpHHDHthFRr'(
    (async () => {
      try {
        const txnSignature = await signAndSendTransactionWithPrivateKeys(
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
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { signAndSendTransaction, Network, ShyftWallet } from '@shyft-to/js';

const { connection } = useConnection();
const wallet = useWallet();

// Get using Shyft API
const encodedTransaction =
  '5eG1aSjNoPmScw84G1d7f9n2fgmWabtQEgRjTUXvpTrRH1qduEMwUvUFYiS8px22JNedkWFTUWj9PrRyq1MyessunKC8Mjyq3hH5WZkM15D3gsooH8hsFegyYRBmccLBTEnPph6fExEySkJwsfH6oGC62VmDDCpWyPHZLYv52e4qtUb1TBE6SgXE6FX3TFqrX5HApSkb9ZaCSz21FyyEbXtrmMxBQE1CR7BTyadWL1Vy9SLfo9tnsVpHHDHthFRr';
(async () => {
  try {
    const txnSignature = await signAndSendTransaction(
      connection,
      encodedTransaction,
      wallet
    );
    console.log(txnSignature);
  } catch (error) {
    throw new Error(error);
  }
})();
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
