const express = require('express');
const router = express.Router();

const healthRecords = [];

router.post('/', (req, res) => {
  const { title, type, date, description } = req.body;
  const record = { _id: `record_${Date.now()}`, title, type, date, description, createdAt: new Date() };
  healthRecords.push(record);
  res.status(201).json({ success: true, record });
});

router.get('/', (req, res) => {
  res.json({ success: true, records: healthRecords, count: healthRecords.length });
});

router.delete('/:id', (req, res) => {
  const idx = healthRecords.findIndex(r => r._id === req.params.id);
  if (idx > -1) healthRecords.splice(idx, 1);
  res.json({ success: true, message: 'Record deleted' });
});

module.exports = router;