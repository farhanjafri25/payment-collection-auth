// const RazorPay = require('razorpay');
import * as RazorPay from 'razorpay';
const razorpayService = new RazorPay({
  key_id: 'rzp_test_iuM1SyUE0AurG7',
  key_secret: 'wWyUfXgaCx334E3qnhHDhQy3',
});

export const createRazorpayOrder = async (payload) => {
  try {
    return await razorpayService.orders.create(payload);
  } catch (error) {
    console.log(`---- ~ Order create error ~ ----`, error);
    return null;
  }
};
