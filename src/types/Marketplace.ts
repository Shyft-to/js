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
