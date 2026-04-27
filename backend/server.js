const express = require('express');
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const aiRoutes = require('./routes/aiRoutes');
const healthRecordRoutes = require('./routes/healthRecordRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'MediCare AI API is running', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/health-records', healthRecordRoutes);
app.use('/api/payment', paymentRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;