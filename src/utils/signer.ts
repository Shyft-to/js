import {
  clusterApiUrl,
  Connection,
  Keypair,
  Transaction,
  Signer,
} from '@solana/web3.js';
import { decode } from 'bs58';

import { Network, ShyftWallet } from '@/types';

/**
 * This function accepts the connection to the user’s wallet,
 * the encodedTransaction received in the response of the API call and the wallet object.
 * The only difference is, along with these parameters,
 * this function also takes in an array of private keys,
 * which can contain all the private keys required to partially sign the transaction.
 *
 * @param network solana rpc network (mainnet-beta/devnet/testnet)
 * @param encodedTransaction serialized transaction (base64 string)
 * @param privateKeys private key of wallets (Array of strings)
 * @returns transaction signature
 */

export async function signAndSendTransactionWithPrivateKeys(
  network: Network,
  encodedTransaction: string,
  privateKeys: string[]
): Promise<string> {
  const connection = new Connection(clusterApiUrl(network), 'confirmed');
  const signedTxn = await partialSignTransactionWithPrivateKeys(
    encodedTransaction,
    privateKeys
  );

  const signature = await connection.sendRawTransaction(
    signedTxn.serialize({ requireAllSignatures: false })
  );
  return signature;
}

/**
 * This function accepts connection, the encoded_transaction from the SHYFT API response and the wallet object.
 * The wallet object and the connection to the user’s wallet can be obtained.
 *
 * @param connection solana rpc connection
 * @param encodedTransaction serialized transaction (base64 string)
 * @param wallet wallet
 * @returns transaction signature
 */

export async function signAndSendTransaction(
  connection: Connection,
  encodedTransaction: string,
  wallet: ShyftWallet
): Promise<string> {
  const recoveredTransaction = getRawTransaction(encodedTransaction);
  const signedTx = await wallet.signTransaction!(recoveredTransaction);
  const confirmTransaction = await connection.sendRawTransaction(
    signedTx.serialize()
  );
  return confirmTransaction;
}

/**
 * This function accepts the encodedTransaction received
 * in the response of the API call and takes an array of private keys,
 * which can contain all the private keys required to partially sign the transaction.
 * Could be useful when a transaction has required multiple signature to further proceed.
 *
 * @param encodedTransaction serialized transaction (base64 string)
 * @param privateKeys private keys of wallet (array of string)
 * @returns Raw transaction
 */

export async function partialSignTransactionWithPrivateKeys(
  encodedTransaction: string,
  privateKeys: string[]
): Promise<Transaction> {
  const recoveredTransaction = getRawTransaction(encodedTransaction);
  const signers = getSignersFromPrivateKeys(privateKeys);
  recoveredTransaction.partialSign(...signers);
  return recoveredTransaction;
}

function getSignersFromPrivateKeys(privateKeys: string[]): Signer[] {
  return privateKeys.map((privateKey) => {
    const signer = Keypair.fromSecretKey(decode(privateKey)) as Signer;
    return signer;
  });
}

function getRawTransaction(encodedTransaction: string): Transaction {
  const recoveredTransaction = Transaction.from(
    Buffer.from(encodedTransaction, 'base64')
  );
  return recoveredTransaction;
}
