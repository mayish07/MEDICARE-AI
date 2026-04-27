const express = require('express');
const router = express.Router();

// Static hospital data (real hospitals in Mangalore & Bangalore)
const hospitals = [
  { _id: '1', name: 'KMC Hospital', city: 'Mangalore', address: 'Ambedkar Circle, Mangalore - 575001', phone: '0824-2445858', specialties: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics'], rating: 4.7, emergencyAvailable: true, googleMapsLink: 'https://maps.app.goo.gl/KMCMangalore' },
  { _id: '2', name: 'Father Muller Medical College Hospital', city: 'Mangalore', address: 'Father Muller Road, Kankanady', phone: '0824-2238000', specialties: ['General Surgery', 'Gynecology', 'Pediatrics'], rating: 4.6, emergencyAvailable: true },
  { _id: '3', name: 'A.J. Hospital & Research Centre', city: 'Mangalore', address: 'NH-66, Kuntikan', phone: '0824-2225533', specialties: ['Cardiology', 'Gastroenterology', 'Urology'], rating: 4.5, emergencyAvailable: true },
  { _id: '4', name: 'Yenepoya Medical College Hospital', city: 'Mangalore', address: 'Deralakatte', phone: '0824-2204668', specialties: ['Nephrology', 'Endocrinology', 'Pulmonology'], rating: 4.4, emergencyAvailable: true },
  { _id: '5', name: 'Unity Health Complex', city: 'Mangalore', address: 'Bendore', phone: '0824-2221111', specialties: ['General Medicine', 'Orthopedics'], rating: 4.3, emergencyAvailable: false },
  { _id: '6', name: 'Manipal Hospital', city: 'Bangalore', address: '98, HAL Airport Road', phone: '080-25023000', specialties: ['Oncology', 'Cardiology', 'Neurology'], rating: 4.8, emergencyAvailable: true },
  { _id: '7', name: 'Fortis Hospital Bannerghatta', city: 'Bangalore', address: '154/9, Bannerghatta Road', phone: '080-66214444', specialties: ['Cardiac Sciences', 'Orthopedics', 'Neurosciences'], rating: 4.7, emergencyAvailable: true },
  { _id: '8', name: 'Narayana Health City', city: 'Bangalore', address: '258/A, Bommasandra', phone: '080-71222222', specialties: ['Cardiac Surgery', 'Pediatric Cardiology'], rating: 4.8, emergencyAvailable: true },
  { _id: '9', name: 'Sakra World Hospital', city: 'Bangalore', address: 'SY No. 52/2, Devarabeesanahalli', phone: '080-49690000', specialties: ['Orthopedics', 'Neurology', 'Urology'], rating: 4.6, emergencyAvailable: true },
  { _id: '10', name: 'Columbia Asia Hospital Hebbal', city: 'Bangalore', address: 'Kirloskar Business Park, Hebbal', phone: '080-61165353', specialties: ['General Surgery', 'Gynecology', 'Pediatrics'], rating: 4.5, emergencyAvailable: true }
];

router.get('/', (req, res) => {
  const { city } = req.query;
  const filtered = city ? hospitals.filter(h => h.city.toLowerCase() === city.toLowerCase()) : hospitals;
  res.json({ success: true, count: filtered.length, hospitals: filtered });
});

router.get('/:id', (req, res) => {
  const hospital = hospitals.find(h => h._id === req.params.id);
  if (!hospital) return res.status(404).json({ success: false, message: 'Hospital not found' });
  res.json({ success: true, hospital });
});

module.exports = router;