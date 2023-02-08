import {
  clusterApiUrl,
  Connection,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
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

export async function confirmTransactionFromBackend(
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
 * This function accepts connection, the encoded_transactions (an array of encoded_transaction) from the SHYFT API response and the wallet object.
 * Then all the transactions in the encoded_transactions array will be signed from the wallet in one go using the signAllTransactions() method.
 * The wallet object and the connection to the user’s wallet can be obtained in the same manner as shown in the previous step.
 *
 * @param connection solana rpc connection
 * @param encodedTransaction serialized transaction (base64 string)
 * @param wallet wallet address
 * @returns transaction signature
 */

export async function confirmTransactionFromFrontend(
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
