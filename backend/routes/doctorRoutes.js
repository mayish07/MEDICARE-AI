const express = require('express');
const router = express.Router();
const { getAllDoctors, getDoctorById, addReview, getAvailableSlots } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.get('/:id/slots', getAvailableSlots);
router.post('/:id/reviews', protect, addReview);

module.exports = router;