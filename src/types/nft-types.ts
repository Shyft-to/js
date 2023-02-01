export type CollectionInfo = {
  address?: string;
  verified?: boolean;
  name?: string;
  family?: string;
};

export type CreatorInfo = {
  address: string;
  verified: boolean;
  share: number;
};

export interface Nft {
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
  creators: CreatorInfo[];
  collection: CollectionInfo;
  attributes_array: any;
  files: any;
  external_url: string;
  is_loaded_metadata: boolean;
  primary_sale_happened: boolean;
  is_mutable: boolean;
}
