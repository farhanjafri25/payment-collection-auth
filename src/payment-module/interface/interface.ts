export interface CreateOrder {
  receiverId: string;
  payerUserId: string;
  orderId: string;
  amount: number;
  orderStatus: string;
  paymentLink: string;
}
