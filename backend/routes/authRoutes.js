const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Demo users (in-memory)
const users = new Map();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'medicare_secret', { expiresIn: '30d' });

router.post('/register', (req, res) => {
  const { name, email, password, phone, city } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }
  if (users.has(email)) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }
  const user = { _id: `user_${Date.now()}`, name, email, phone, city: city || 'Mangalore', createdAt: new Date() };
  users.set(email, { ...user, password });
  const token = generateToken(user._id);
  res.json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email, city: user.city } });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.get(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
  const token = generateToken(user._id);
  res.json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email, city: user.city } });
});

router.get('/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'medicare_secret');
    const user = Array.from(users.values()).find(u => u._id === decoded.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user: { _id: user._id, name: user.name, email: user.email, city: user.city } });
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

router.put('/profile', (req, res) => {
  res.json({ success: true, message: 'Profile updated (demo mode)' });
});

router.put('/password', (req, res) => {
  res.json({ success: true, message: 'Password updated (demo mode)' });
});

module.exports = router;