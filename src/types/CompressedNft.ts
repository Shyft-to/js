export type ValidDepthSizePair =
  | { maxDepth: 3; maxBufferSize: 8 }
  | { maxDepth: 5; maxBufferSize: 8 }
  | { maxDepth: 14; maxBufferSize: 64 }
  | { maxDepth: 14; maxBufferSize: 256 }
  | { maxDepth: 14; maxBufferSize: 1024 }
  | { maxDepth: 14; maxBufferSize: 2048 }
  | { maxDepth: 15; maxBufferSize: 64 }
  | { maxDepth: 16; maxBufferSize: 64 }
  | { maxDepth: 17; maxBufferSize: 64 }
  | { maxDepth: 18; maxBufferSize: 64 }
  | { maxDepth: 19; maxBufferSize: 64 }
  | { maxDepth: 20; maxBufferSize: 64 }
  | { maxDepth: 20; maxBufferSize: 256 }
  | { maxDepth: 20; maxBufferSize: 1024 }
  | { maxDepth: 20; maxBufferSize: 2048 }
  | { maxDepth: 24; maxBufferSize: 64 }
  | { maxDepth: 24; maxBufferSize: 256 }
  | { maxDepth: 24; maxBufferSize: 512 }
  | { maxDepth: 24; maxBufferSize: 1024 }
  | { maxDepth: 24; maxBufferSize: 2048 }
  | { maxDepth: 26; maxBufferSize: 512 }
  | { maxDepth: 26; maxBufferSize: 1024 }
  | { maxDepth: 26; maxBufferSize: 2048 }
  | { maxDepth: 30; maxBufferSize: 512 }
  | { maxDepth: 30; maxBufferSize: 1024 }
  | { maxDepth: 30; maxBufferSize: 2048 };

type CommonTxnResponse = {
  encoded_transaction: string;
  signers: string[];
};

export type CreateMerkleTreeResponse = CommonTxnResponse & { tree: string };
export type CNftMintResponse = CommonTxnResponse & { mint: string };
export type CNftTransferResponse = CommonTxnResponse;
export type CNftBurnResponse = CommonTxnResponse;
export type CNftTransferManyResp = { encoded_transactions: string[] };
