import {
  clusterApiUrl,
  Connection,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
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
 * @param privateKey private key of wallet (string)
 * @returns transaction signature
 */

export async function confirmTxnByPrivateKey(
  network: Network,
  encodedTransaction: string,
  privateKey: string
): Promise<string> {
  const connection = new Connection(clusterApiUrl(network), 'confirmed');
  const feePayer = Keypair.fromSecretKey(decode(privateKey));
  const recoveredTransaction = Transaction.from(
    Buffer.from(encodedTransaction, 'base64')
  );
  const signature = await sendAndConfirmTransaction(
    connection,
    recoveredTransaction,
    [feePayer]
  );
  return signature;
}

/**
 * This function accepts connection, the encoded_transaction from the SHYFT API response and the wallet object.
 * The wallet object and the connection to the user’s wallet can be obtained.
 *
 * @param connection solana rpc connection
 * @param encodedTransaction serialized transaction (base64 string)
 * @param wallet wallet address
 * @returns transaction signature
 */

export async function confirmTxn(
  connection: Connection,
  encodedTransaction: string,
  wallet: ShyftWallet
): Promise<string> {
  const recoveredTransaction = Transaction.from(
    Buffer.from(encodedTransaction, 'base64')
  );
  const signedTx = await wallet.signTransaction(recoveredTransaction);
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
 * @returns signed encoded transaction
 */

export async function signTxnByPrivateKeys(
  encodedTransaction: string,
  privateKeys: string[]
): Promise<string> {
  const recoveredTransaction = Transaction.from(
    Buffer.from(encodedTransaction, 'base64')
  );
  const signers = privateKeys.map((privateKey) => {
    const signer = Keypair.fromSecretKey(decode(privateKey)) as Signer;
    return signer;
  });
  recoveredTransaction.partialSign(...signers);
  const serializedTransaction = recoveredTransaction.serialize({
    requireAllSignatures: false,
  });
  const transactionBase64 = serializedTransaction.toString('base64');
  return transactionBase64;
}
