import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, Heart, Activity, Phone, ArrowRight } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import { hospitals } from '../data/hospitals';

const SplashScreen = ({ onGetStarted }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [features, setFeatures] = useState(0);

  const featureList = [
    { icon: Stethoscope, title: 'Book Appointments', desc: 'Connect with top doctors in Mangalore & Bangalore' },
    { icon: Activity, title: 'AI Symptom Checker', desc: 'Get instant AI analysis of your symptoms' },
    { icon: Heart, title: 'Health Records', desc: 'Store prescriptions, reports securely' },
    { icon: Phone, title: 'Emergency SOS', desc: 'One-tap emergency services' }
  ];

  const cities = [
    { name: 'Mangalore', hospitals: 5, image: 'https://images.unsplash.com/photo-1583230387882-298f6c065f74?w=600' },
    { name: 'Bangalore', hospitals: 5, image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600' }
  ];

  useEffect(() => {
    if (!showLogin) {
      const timer = setInterval(() => {
        setFeatures(prev => (prev + 1) % featureList.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [showLogin]);

  if (showLogin) {
    return <LoginOptions onBack={() => setShowLogin(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-primary to-accent">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-heading font-bold text-xl">MediCare AI</span>
          </div>
          <button onClick={() => setShowLogin(true)} className="text-white font-medium">Skip</button>
        </div>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 rounded-3xl bg-white/20 flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">MediCare AI</h1>
          <p className="text-white/80 text-lg mb-8">India's #1 Smart Health Assistant</p>

          {/* Features Carousel */}
          <motion.div key={features} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-8">
            {(() => {
              const Icon = featureList[features].icon;
              return <Icon className="w-10 h-10 text-white mx-auto mb-2" />;
            })()}
            <h3 className="text-white font-bold text-xl mb-1">{featureList[features].title}</h3>
            <p className="text-white/70 text-sm">{featureList[features].desc}</p>
          </motion.div>

          {/* Dots */}
          <div className="flex gap-2 mb-8">
            {featureList.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === features ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </div>
        </div>

        {/* City Selection */}
        <div className="bg-white rounded-t-3xl p-6">
          <h2 className="text-center font-heading font-bold text-xl mb-4">Select Your City</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {cities.map(city => (
              <button key={city.name} onClick={() => localStorage.setItem('selectedCity', city.name)} className="relative rounded-xl overflow-hidden group">
                <img src={city.image} alt={city.name} className="w-full h-32 object-cover group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                  <h3 className="text-white font-bold text-lg">{city.name}</h3>
                  <p className="text-white/80 text-sm">{city.hospitals} Hospitals</p>
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => setShowLogin(true)} className="w-full py-4 gradient-btn rounded-xl font-bold text-lg flex items-center justify-center gap-2">
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const LoginOptions = ({ onBack }) => {
  const { isDark, toggleDark } = useDarkMode();
  const navigate = useNavigate();
  
  const handleGoogleLogin = () => {
    // Use Google Identity Services
    const clientId = "735594895444-38lgudv8fg4ssi0bpsv7o6ok97mtfajc.apps.googleusercontent.com";
    const redirectUri = `${window.location.origin}/google-callback`;
    const scope = "email profile";
    
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-primary to-accent p-4">
      <button onClick={onBack} className="text-white mb-4">← Back</button>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="glass-card rounded-card p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-2xl gradient-btn flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-heading font-bold">Welcome to MediCare AI</h1>
              <p className="text-gray-600 dark:text-gray-400">Your health journey starts here</p>
            </div>

            <div className="space-y-4">
              <Link to="/login" className="w-full py-4 gradient-btn rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                Login with Email
              </Link>
              
              <Link to="/register" className="w-full py-4 border-2 border-primary text-primary rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                Register with Email
              </Link>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                <div className="relative flex justify-center"><span className="bg-white px-4 text-gray-500">or</span></div>
              </div>

              <button onClick={handleGoogleLogin} className="w-full py-4 bg-white dark:bg-gray-800 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg">
                <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;