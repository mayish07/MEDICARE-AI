const express = require('express');
const router = express.Router();
const { symptomChecker, aiChat } = require('../controllers/aiController');

router.post('/symptom-checker', symptomChecker);
router.post('/chat', aiChat);

module.exports = router;