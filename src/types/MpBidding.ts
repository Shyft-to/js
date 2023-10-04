import { ListedNftDetail, NftListResponse } from './MpListing';

export type BidsSortOrder = 'asc' | 'desc';

export type BidsSortOptions = 'bid_date' | 'price';

export type Bid = Omit<ListedNftDetail, 'seller_address' | 'list_state'> & {
  buyer_address: string;
  bid_state: string;
};

export type ActiveBids = {
  data: Omit<Bid, 'cancelled_at' | 'purchased_at' | 'purchase_receipt'>[];
  page: number;
  size: number;
  total_data: number;
  total_page: number;
};

export type NftBidResponse = Omit<
  NftListResponse,
  'seller_address' | 'list_state'
> & { buyer_address: string; bid_state: string };
