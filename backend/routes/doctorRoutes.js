const express = require('express');
const router = express.Router();

// Static doctor data
const doctors = [
  { _id: '1', name: 'Dr. Priya Sharma', specialization: 'Cardiologist', qualification: 'MD, DM Cardiology', experience: 15, city: 'Mangalore', hospital: 'KMC Hospital', consultationFee: 800, rating: 4.8, languages: ['Kannada', 'Hindi', 'English'], onlineConsultation: true },
  { _id: '2', name: 'Dr. Rajesh Kumar', specialization: 'Neurologist', qualification: 'MD, DM Neurology', experience: 18, city: 'Mangalore', hospital: 'KMC Hospital', consultationFee: 1000, rating: 4.9, languages: ['Kannada', 'Hindi', 'English'], onlineConsultation: true },
  { _id: '3', name: 'Dr. Anjali Rao', specialization: 'Gynecologist', qualification: 'MD, DGO', experience: 12, city: 'Mangalore', hospital: 'Father Muller Hospital', consultationFee: 600, rating: 4.7, languages: ['Kannada', 'English'], onlineConsultation: true },
  { _id: '4', name: 'Dr. Suresh Nayak', specialization: 'Orthopedic', qualification: 'MS Orthopedics', experience: 20, city: 'Mangalore', hospital: 'A.J. Hospital', consultationFee: 750, rating: 4.6, languages: ['Kannada', 'English'], onlineConsultation: false },
  { _id: '5', name: 'Dr. Meera Shetty', specialization: 'Pediatrician', qualification: 'MD Pediatrics', experience: 10, city: 'Mangalore', hospital: 'Yenepoya Hospital', consultationFee: 500, rating: 4.8, languages: ['Kannada', 'Hindi'], onlineConsultation: true },
  { _id: '6', name: 'Dr. Vikram Singh', specialization: 'General Physician', qualification: 'MD General Medicine', experience: 8, city: 'Mangalore', hospital: 'Unity Health Complex', consultationFee: 400, rating: 4.5, languages: ['Hindi', 'English', 'Kannada'], onlineConsultation: true },
  { _id: '7', name: 'Dr. Kavita Reddy', specialization: 'Dermatologist', qualification: 'MD Dermatology', experience: 14, city: 'Bangalore', hospital: 'Manipal Hospital', consultationFee: 900, rating: 4.9, languages: ['Kannada', 'Hindi', 'English', 'Tamil'], onlineConsultation: true },
  { _id: '8', name: 'Dr. Arun Thomas', specialization: 'Cardiologist', qualification: 'MD, DM Cardiology', experience: 16, city: 'Bangalore', hospital: 'Fortis Hospital', consultationFee: 1200, rating: 4.8, languages: ['English', 'Hindi', 'Kannada'], onlineConsultation: true },
  { _id: '9', name: 'Dr. Radhika Raj', specialization: 'Neurologist', qualification: 'MD, DM Neurology', experience: 11, city: 'Bangalore', hospital: 'Narayana Health', consultationFee: 1100, rating: 4.7, languages: ['English', 'Kannada', 'Hindi'], onlineConsultation: true },
  { _id: '10', name: 'Dr. Prasad Hegde', specialization: 'Orthopedic', qualification: 'MS Orthopedics', experience: 17, city: 'Bangalore', hospital: 'Sakra World Hospital', consultationFee: 1000, rating: 4.8, languages: ['Kannada', 'English', 'Hindi'], onlineConsultation: true },
  { _id: '11', name: 'Dr. Lakshmi Iyer', specialization: 'Gynecologist', qualification: 'MD, DGO', experience: 13, city: 'Bangalore', hospital: 'Columbia Asia Hospital', consultationFee: 850, rating: 4.9, languages: ['English', 'Hindi', 'Kannada'], onlineConsultation: true },
  { _id: '12', name: 'Dr. Naveen Joshi', specialization: 'Pulmonologist', qualification: 'MD, DM Pulmonology', experience: 9, city: 'Bangalore', hospital: 'Manipal Hospital', consultationFee: 750, rating: 4.6, languages: ['Kannada', 'English', 'Hindi'], onlineConsultation: true },
  { _id: '13', name: 'Dr. Smitha Pai', specialization: 'Ophthalmologist', qualification: 'MS Ophthalmology', experience: 11, city: 'Bangalore', hospital: 'Narayana Health', consultationFee: 700, rating: 4.7, languages: ['Kannada', 'English'], onlineConsultation: true },
  { _id: '14', name: 'Dr. Chandrashekar', specialization: 'Gastroenterologist', qualification: 'MD, DM Gastroenterology', experience: 12, city: 'Bangalore', hospital: 'Sakra World Hospital', consultationFee: 900, rating: 4.6, languages: ['Kannada', 'English', 'Hindi'], onlineConsultation: false },
  { _id: '15', name: 'Dr. Divya Krishnan', specialization: 'Endocrinologist', qualification: 'MD, DM Endocrinology', experience: 7, city: 'Bangalore', hospital: 'Fortis Hospital', consultationFee: 650, rating: 4.5, languages: ['English', 'Hindi', 'Kannada'], onlineConsultation: true }
];

router.get('/', (req, res) => {
  const { city, specialization, minFee, maxFee } = req.query;
  let filtered = [...doctors];
  if (city) filtered = filtered.filter(d => d.city.toLowerCase() === city.toLowerCase());
  if (specialization) filtered = filtered.filter(d => d.specialization === specialization);
  if (minFee) filtered = filtered.filter(d => d.consultationFee >= Number(minFee));
  if (maxFee) filtered = filtered.filter(d => d.consultationFee <= Number(maxFee));
  res.json({ success: true, doctors: filtered, total: filtered.length });
});

router.get('/:id', (req, res) => {
  const doctor = doctors.find(d => d._id === req.params.id);
  if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
  res.json({ success: true, doctor });
});

router.get('/:id/slots', (req, res) => {
  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'];
  const slots = times.map(t => ({ time: t, isBooked: Math.random() < 0.3 }));
  res.json({ success: true, availableSlots: { [new Date().toISOString().split('T')[0]]: slots } });
});

module.exports = router;