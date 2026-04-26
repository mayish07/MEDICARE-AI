const express = require('express');
const router = express.Router();
const { bookAppointment, getUserAppointments, cancelAppointment, updateAppointmentStatus } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, bookAppointment);
router.get('/', protect, getUserAppointments);
router.put('/:id/cancel', protect, cancelAppointment);
router.put('/:id/status', protect, updateAppointmentStatus);

module.exports = router;