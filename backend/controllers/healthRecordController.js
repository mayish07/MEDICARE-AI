const asyncHandler = require('express-async-handler');
const HealthRecord = require('../models/HealthRecord');

const addRecord = asyncHandler(async (req, res) => {
  const { title, type, date, doctor, hospital, description, fileUrl } = req.body;

  if (!title || !type) {
    res.status(400);
    throw new Error('Please provide title and type');
  }

  const record = await HealthRecord.create({
    user: req.user._id,
    title,
    type,
    date: date || new Date(),
    doctor,
    hospital,
    description,
    fileUrl
  });

  res.status(201).json({
    success: true,
    record
  });
});

const getRecords = asyncHandler(async (req, res) => {
  const { type, sort = '-date' } = req.query;

  const query = { user: req.user._id };
  if (type) query.type = type;

  const records = await HealthRecord.find(query).sort(sort);

  res.json({
    success: true,
    count: records.length,
    records
  });
});

const deleteRecord = asyncHandler(async (req, res) => {
  const record = await HealthRecord.findById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Record not found');
  }

  if (record.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this record');
  }

  await record.deleteOne();

  res.json({
    success: true,
    message: 'Record deleted successfully'
  });
});

module.exports = {
  addRecord,
  getRecords,
  deleteRecord
};