const asyncHandler = require('express-async-handler');
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = asyncHandler(async (req, res) => {
  const { amount, appointmentId } = req.body;

  if (!amount || amount < 100) {
    res.status(400);
    throw new Error('Please provide a valid amount (minimum ₹100)');
  }

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    res.status(503);
    throw new Error('Payment service is not configured');
  }

  try {
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `medicare_${appointmentId || Date.now()}`,
      notes: {
        appointmentId: appointmentId || ''
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Razorpay error:', error);
    res.status(500);
    throw new Error('Failed to create payment order');
  }
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    res.status(400);
    throw new Error('Please provide all payment verification details');
  }

  const crypto = require('crypto');
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    res.status(400);
    throw new Error('Invalid payment signature');
  }

  res.json({
    success: true,
    message: 'Payment verified successfully',
    paymentId: razorpay_payment_id
  });
});

module.exports = {
  createOrder,
  verifyPayment
};