const express = require('express');
const router = express.Router();

// Payment routes (demo)
router.post('/create-order', (req, res) => {
  const { amount } = req.body;
  res.json({ success: true, orderId: `order_${Date.now()}`, amount, keyId: 'rzp_test_demo' });
});

router.post('/verify', (req, res) => {
  res.json({ success: true, message: 'Payment verified (demo)', paymentId: `pay_${Date.now()}` });
});

module.exports = router;