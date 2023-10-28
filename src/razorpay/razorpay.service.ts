// const RazorPay = require('razorpay');
import * as RazorPay from 'razorpay';
const razorpayService = new RazorPay({
  key_id: 'rzp_test_iuM1SyUE0AurG7',
  key_secret: 'wWyUfXgaCx334E3qnhHDhQy3',
});

export const createRazorpayLink = async (payload) => {
  try {
    return await razorpayService.paymentLink.create(payload);
  } catch (error) {
    console.log(`---- ~ Order create error ~ ----`, error);
    return null;
  }
};

export const verifySignature = async (body: any, signature: string) => {
  try {
    return await razorpayService.webhooks.verifyWebhookSignature(
      body,
      signature,
      `${process.env.RAZORPAY_SECRETKEY}`,
    );
  } catch (error) {
      log
  }
};
