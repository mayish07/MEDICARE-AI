const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const aiRoutes = require('./routes/aiRoutes');
const healthRecordRoutes = require('./routes/healthRecordRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(helmet());
app.use(cors({
  origin: '*'
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later' }
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'MediCare AI API is running', timestamp: new Date().toISOString() });
});

app.use('/api/auth', apiLimiter, authRoutes);
app.use('/api/hospitals', apiLimiter, hospitalRoutes);
app.use('/api/doctors', apiLimiter, doctorRoutes);
app.use('/api/appointments', apiLimiter, appointmentRoutes);
app.use('/api/ai', apiLimiter, aiRoutes);
app.use('/api/health-records', apiLimiter, healthRecordRoutes);
app.use('/api/payment', apiLimiter, paymentRoutes);

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