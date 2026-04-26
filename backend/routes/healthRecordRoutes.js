const express = require('express');
const router = express.Router();
const { addRecord, getRecords, deleteRecord } = require('../controllers/healthRecordController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addRecord);
router.get('/', protect, getRecords);
router.delete('/:id', protect, deleteRecord);

module.exports = router;