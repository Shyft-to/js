export type CollectionInfo = {
  address?: string;
  verified?: boolean;
  name?: string;
  family?: string;
};

export type Nft = {
  name: string;
  description: string;
  symbol: string;
  image_uri: string;
  royalty: number;
  mint: string;
  attributes: { [k: string]: string | number };
  owner: string;
  update_authority: string;
  cached_image_uri: string;
  animation_url: string;
  cached_animation_url: string;
  metadata_uri: string;
  creators: Creator[];
  collection: CollectionInfo;
  attributes_array: any;
  files: any;
  external_url: string;
  is_loaded_metadata: boolean;
  primary_sale_happened: boolean;
  is_mutable: boolean;
};

type Creator = {
  address: string;
  verified: boolean;
  share: number;
};

type CollectionNft = {
  name: string;
  symbol: string;
  royalty: number;
  mint: string;
  update_authority: string;
  metadata_uri: string;
  creators: Creator[];
};

export type GroupNftsInCollection = {
  address?: string;
  name: string;
  family?: string;
  nft_count: number;
  nfts: CollectionNft[];
};

export type NftMetadata = {
  model: string;
  address: string;
  mintAddress: string;
  updateAuthorityAddress: string;
  json: object | null;
  jsonLoaded: boolean;
  name: string;
  symbol: string;
  uri: string;
  isMutable: boolean;
  primarySaleHappened: boolean;
  sellerFeeBasisPoints: number;
  editionNonce: number;
  creators: Creator[];
  tokenStandard: number;
  collection: Omit<CollectionInfo, 'name' | 'family'>;
  collectionDetails: object | null;
  uses: object | null;
};