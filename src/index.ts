import {clusterApiUrl, Connection, Keypair, Transaction } from '@solana/web3.js';
import { NodeWallet } from '@metaplex/js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { decode } from 'bs58';

import { ShyftWallet } from '../types';

export async function confirmTransactionFromBackend(network: WalletAdapterNetwork, encodedTransaction: string, privateKey: string): Promise<string> {
  const connection = new Connection(clusterApiUrl(network), 'confirmed');
  const feePayer = Keypair.fromSecretKey(decode(privateKey));
  const wallet = new NodeWallet(feePayer);
  const recoveredTransaction = Transaction.from(
    Buffer.from(encodedTransaction, 'base64')
  );
  const signedTx = await wallet.signTransaction(recoveredTransaction);
  const confirmTransaction = await connection.sendRawTransaction(
    signedTx.serialize()
  );
  return confirmTransaction;
}

export async function confirmTransactionFromFrontend(connection: Connection, encodedTransaction: string, wallet: ShyftWallet): Promise<string> {
  const recoveredTransaction = Transaction.from(
    Buffer.from(encodedTransaction, 'base64')
  );
  const signedTx = await wallet.signTransaction(recoveredTransaction);
  const confirmTransaction = await connection.sendRawTransaction(
    signedTx.serialize()
  );
  return confirmTransaction;
}
