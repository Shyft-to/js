export enum Interface {
  V1NFT = 'V1_NFT',
  CUSTOM = 'Custom',
  V1PRINT = 'V1_PRINT',
  LEGACYNFT = 'Legacy_NFT',
  V2NFT = 'V2_NFT',
  FUNGIBLE_ASSET = 'FungibleAsset',
  IDENTITY = 'Identity',
  EXECUTABLE = 'Executable',
  PROGRAMMABLENFT = 'ProgrammableNFT',
}

export enum Scope {
  FULL = 'full',
  ROYALTY = 'royalty',
  METADATA = 'metadata',
  EXTENSION = 'extension',
}

export enum Context {
  WalletDefault = 'wallet-default',
  WebDesktop = 'web-desktop',
  WebMobile = 'web-mobile',
  AppMobile = 'app-mobile',
  AppDesktop = 'app-desktop',
  App = 'app',
  Vr = 'vr',
}

export enum OwnershipModel {
  SINGLE = 'single',
  TOKEN = 'token',
}

export enum RoyaltyModel {
  CREATORS = 'creators',
  FANOUT = 'fanout',
  SINGLE = 'single',
}

export enum UseMethods {
  BURN = 'Burn',
  SINGLE = 'Single',
  MULTIPLE = 'Multiple',
}

export type AssetSortBy = 'created' | 'updated' | 'recent_action';

export type AssetSortDirection = 'asc' | 'desc';

export namespace DAS {
  export interface AssetsByOwnerRequest {
    ownerAddress: string;
    page: number;
    limit?: number;
    before?: string;
    after?: string;
    displayOptions?: DisplayOptions;
    sortBy?: AssetSortingRequest;
  }

  export type AssetsByCreatorRequest = {
    creatorAddress: string;
    page: number;
    onlyVerified?: boolean;
    limit?: number;
    before?: string;
    after?: string;
    displayOptions?: DisplayOptions;
    sortBy?: AssetSortingRequest;
  };

  export type GetAssetBatchRequest = {
    ids: Array<string>;
    displayOptions?: GetAssetDisplayOptions;
  };

  export type AssetsByGroupRequest = {
    groupValue: string;
    groupKey: string;
    page: number;
    limit?: number;
    before?: string;
    after?: string;
    displayOptions?: DisplayOptions;
    sortBy?: AssetSortingRequest;
  };
  export type GetAssetsBatchRequest = {
    ids: string[];
  };

  export interface SearchAssetsRequest {
    page: number;
    limit?: number;
    before?: string;
    after?: string;
    creatorAddress?: string;
    ownerAddress?: string;
    jsonUri?: string;
    grouping?: string[];
    burnt?: boolean;
    sortBy?: AssetSortingRequest;
    frozen?: boolean;
    supplyMint?: string;
    supply?: number;
    interface?: string;
    delegate?: number;
    ownerType?: OwnershipModel;
    royaltyAmount?: number;
    royaltyTarget?: string;
    royaltyTargetType?: RoyaltyModel;
    compressible?: boolean;
    compressed?: boolean;
  }

  export type AssetsByAuthorityRequest = {
    authorityAddress: string;
    page: number;
    limit?: number;
    before?: string;
    after?: string;
    displayOptions?: DisplayOptions;
    sortBy?: AssetSortingRequest;
  };

  export type GetAssetRequest = {
    id: string;
    displayOptions?: GetAssetDisplayOptions;
  };

  export type GetAssetProofRequest = {
    id: string;
  };

  export type GetSignaturesForAssetRequest = {
    id: string;
    page: number;
    limit?: number;
    before?: string;
    after?: string;
  };

  export interface AssetSorting {
    sort_by: AssetSortBy;
    sort_direction: AssetSortDirection;
  }

  export type AssetSortingRequest = {
    sortBy: AssetSortBy;
    sortDirection: AssetSortDirection;
  };

  export type GetAssetResponse = {
    interface: Interface;
    id: string;
    content?: Content;
    authorities?: Authorities[];
    compression?: Compression;
    grouping?: Grouping[];
    royalty?: Royalty;
    ownership: Ownership;
    creators?: Creators[];
    uses?: Uses;
    supply?: Supply;
    mutable: boolean;
    burnt: boolean;
  };

  export type GetAssetResponseList = {
    grand_total?: boolean;
    total: number;
    limit: number;
    page: number;
    items: GetAssetResponse[];
  };
  export interface GetAssetProofResponse {
    root: string;
    proof: Array<string>;
    node_index: number;
    leaf: string;
    tree_id: string;
  }
  export interface GetSignaturesForAssetResponse {
    total: number;
    limit: number;
    page?: number;
    before?: string;
    after?: string;
    items: Array<Array<string>>;
  }

  export type DisplayOptions = {
    showUnverifiedCollections?: boolean;
    showCollectionMetadata?: boolean;
    showGrandTotal?: boolean;
  };

  export type GetAssetDisplayOptions = {
    showUnverifiedCollections?: boolean;
    showCollectionMetadata?: boolean;
  };

  export interface Ownership {
    frozen: boolean;
    delegated: boolean;
    delegate?: string;
    ownership_model: OwnershipModel;
    owner: string;
  }

  export interface Supply {
    print_max_supply: number;
    print_current_supply: number;
    edition_nonce?: number;
  }

  export interface Uses {
    use_method: UseMethods;
    remaining: number;
    total: number;
  }

  export interface Creators {
    address: string;
    share: number;
    verified: boolean;
  }

  export interface Royalty {
    royalty_model: RoyaltyModel;
    target?: string;
    percent: number;
    basis_points: number;
    primary_sale_happened: boolean;
    locked: boolean;
  }

  export interface Grouping {
    group_key: string;
    group_value: string;
    verified?: boolean;
    collection_metadata?: CollectionMetadata;
  }
  export interface CollectionMetadata {
    name?: string;
    symbol?: string;
    image?: string;
    description?: string;
    external_url?: string;
  }

  export interface Authorities {
    address: string;
    scopes: Array<Scope>;
  }

  export type Links = {
    external_url?: string;
    image?: string;
    animation_url?: string;
    [Symbol.iterator](): Iterator<Links>;
  };

  export interface Content {
    $schema: string;
    json_uri: string;
    files?: Files;
    metadata: Metadata;
    links?: Links;
  }

  export interface File {
    uri?: string;
    mime?: string;
    cdn_uri?: string;
    quality?: FileQuality;
    contexts?: Context[];
    [Symbol.iterator](): Iterator<File>;
  }

  export type Files = File[];
  export interface FileQuality {
    schema: string;
  }

  export interface Metadata {
    attributes?: Attribute[];
    description: string;
    name: string;
    symbol: string;
  }

  export interface Attribute {
    value: string;
    trait_type: string;
  }
  export interface Compression {
    eligible: boolean;
    compressed: boolean;
    data_hash: string;
    creator_hash: string;
    asset_hash: string;
    tree: string;
    seq: number;
    leaf_id: number;
  }
}
