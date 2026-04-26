# MediCare AI 🏥
India's #1 Smart Health Assistant for Mangalore & Bangalore

<a href="https://vercel.com"><img src="https://img.shields.io/badge/Frontend-Vercel-00B4D8?style=for-the-badge&logo=vercel"></a>
<a href="https://render.com"><img src="https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render"></a>
<a href="https://mongodb.com"><img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb"></a>

<p>MediCare AI is a comprehensive healthcare platform that connects patients with top hospitals and doctors in Mangalore and Bangalore. Features AI-powered symptom checking, online consultations, appointment booking, and secure health record management.</p>

## ✨ Features

- 🏥 **Hospital Directory** - Complete listings of top hospitals in Mangalore & Bangalore
- 👨‍⚕️ **Doctor Booking** - Book appointments with 200+ specialists
- 🤖 **AI Symptom Checker** - Instant AI analysis of your symptoms
- 💬 **AI Health Chat** - 24/7 AI assistant for health queries
- 📱 **Online Consultations** - Video consultations with doctors
- 📋 **Health Records** - Secure storage of medical documents
- 🚨 **Emergency Services** - Quick access to emergency numbers

## 🚀 Demo

- **Frontend**: [https://medicare-ai.vercel.app](https://medicare-ai.vercel.app)
- **Backend API**: [https://medicare-ai.onrender.com](https://medicare-ai.onrender.com)

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Framer Motion
- React Router Dom
- Axios
- AOS Animations
- Leaflet Maps

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Google Gemini AI
- Razorpay Payments
- Nodemailer

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mayish07/MEDICARE-AI.git
cd MEDICARE-AI

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://yourcluster
JWT_SECRET=medicare_super_secret_2024
GEMINI_API_KEY=your_gemini_key
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_app_password
RAZORPAY_KEY_ID=rzp_test_yourkey
RAZORPAY_KEY_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_yourkey
```

## 🏃‍♂️ Running the App

```bash
# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
cd frontend
npm run dev
```

## 🌐 Deployment

### Backend on Render
1. Push code to GitHub
2. Create new Web Service on render.com
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add environment variables

### Frontend on Vercel
1. Import project on vercel.com
2. Framework: Vite
3. Add `VITE_API_URL` environment variable
4. Deploy

## 📱 Supported Cities

- **Mangalore**: KMC Hospital, Father Muller, A.J. Hospital, Yenepoya
- **Bangalore**: Manipal, Fortis, Narayana Health, Sakra World, Columbia Asia

## 📄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Hospitals
- `GET /api/hospitals` - Get all hospitals
- `GET /api/hospitals/:id` - Get hospital by ID

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/:id/slots` - Get available slots
- `POST /api/doctors/:id/reviews` - Add review

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments` - Get user appointments
- `PUT /api/appointments/:id/cancel` - Cancel appointment

### AI
- `POST /api/ai/symptom-checker` - Analyze symptoms
- `POST /api/ai/chat` - AI chat

## 📝 License

MIT License - Made with ❤️ in India

## 🙏 Acknowledgments

- All hospitals in Mangalore & Bangalore
- Google Gemini AI
- Open source community