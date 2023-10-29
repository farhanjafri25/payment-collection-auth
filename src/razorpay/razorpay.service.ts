// const RazorPay = require('razorpay');
import RazorPay from 'razorpay';
const razorpayService = new RazorPay({
  key_id: 'rzp_test_iuM1SyUE0AurG7',
  key_secret: 'wWyUfXgaCx334E3qnhHDhQy3',
});

//Create reazorpay-link
export const createRazorpayLink = async (payload) => {
  try {
    console.log(`createRazorpayLink Payload`, payload);
    return await razorpayService.paymentLink.create(payload);
  } catch (error) {
    console.log(`---- ~ Order create error ~ ----`, error);
    return null;
  }
};
