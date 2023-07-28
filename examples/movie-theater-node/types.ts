export interface LineItem {
  name: string;
  quantity: number;
  price: number;
}

export interface TransactionInfo {
  trxId: number;
  cashier: string;
  register: string;
  date: Date;
}

export interface RewardCreditInfo {
  cardNumberLast4: string;
  creditsEarned: number;
  creditsUsed: number;
  creditBalance: number;
}
