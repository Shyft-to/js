import { StringDate } from ".";

export type Marketplace = {
  network: string;
  address: string;
  fee_account: string;
  treasury_address: string;
  fee_payer: string;
  fee_recipient: string;
  fee_recipient_account: string;
  currency_address: string;
  currency_symbol?: string;
  creator?: string;
  transaction_fee: number;
  authority: string;
};

export type TreasuryBalance = {
  amount: number;
  symbol: string;
};

export type MarketplaceStats = {
  total_sales: number;
  sales_volume: number;
  total_sellers: number;
  total_listings: number;
  listed_volume: number;
  start_date: StringDate;
  end_date: StringDate;
};

export type WithdrawFeeTxn = {
  from: string;
  to: string;
  amount: number;
  encoded_transaction: string;
};
