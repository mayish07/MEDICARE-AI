const express = require('express');
const router = express.Router();

// In-memory appointments
const appointments = [];

router.post('/', (req, res) => {
  const { doctorId, date, time, type, symptoms } = req.body;
  const appointment = {
    _id: `apt_${Date.now()}`,
    doctorId,
    date,
    time,
    type: type || 'In-Person',
    symptoms,
    status: 'Confirmed',
    createdAt: new Date()
  };
  appointments.push(appointment);
  res.status(201).json({ success: true, appointment });
});

router.get('/', (req, res) => {
  res.json({ success: true, appointments, count: appointments.length });
});

router.put('/:id/cancel', (req, res) => {
  const apt = appointments.find(a => a._id === req.params.id);
  if (apt) { apt.status = 'Cancelled'; }
  res.json({ success: true, message: 'Appointment cancelled' });
});

module.exports = router;