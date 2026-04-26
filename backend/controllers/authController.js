const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, city } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    city: city || 'Mangalore',
    isVerified: true
  });

  const token = generateToken(user._id);

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4f8; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #00B4D8, #0077B6); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .body { padding: 30px; }
        .body h2 { color: #0D1B2A; margin-top: 0; }
        .body p { color: #555; line-height: 1.6; }
        .button { display: inline-block; background: linear-gradient(135deg, #00B4D8, #0077B6); color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; margin-top: 20px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏥 MediCare AI</h1>
        </div>
        <div class="body">
          <h2>Welcome, ${name}! 👋</h2>
          <p>Your health journey starts now! 🎉</p>
          <p>MediCare AI is your smart health assistant for Mangalore & Bangalore. Book appointments at top hospitals, check symptoms with AI, and manage your health records - all in one place.</p>
          <p>Start exploring your health today!</p>
        </div>
        <div class="footer">
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await sendEmail(email, 'Welcome to MediCare AI - Your Health Journey Starts Now!', emailHtml);
  } catch (emailError) {
    console.error('Email sending failed:', emailError);
  }

  res.status(201).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      bloodGroup: user.bloodGroup
    }
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      bloodGroup: user.bloodGroup,
      profilePhoto: user.profilePhoto
    }
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('appointments')
    .populate('healthRecords');

  res.json({
    success: true,
    user
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = ['name', 'phone', 'dateOfBirth', 'gender', 'bloodGroup', 'city', 'address', 'profilePhoto', 'medicalHistory', 'allergies', 'emergencyContact'];
  
  const updates = {};
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    updates,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    user
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error('Please provide old and new password');
  }

  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.comparePassword(oldPassword))) {
    res.status(401);
    throw new Error('Old password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Password updated successfully'
  });
});

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword
};