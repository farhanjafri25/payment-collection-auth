export interface CreateOrder {
  receiverId: string;
  payerId: string;
  orderId: string;
  amount: number;
  orderStatus: string;
}
