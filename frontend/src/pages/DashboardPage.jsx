import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, FileText, Activity, MessageCircle, Phone, MapPin, 
  Clock, Stethoscope, ArrowRight, Plus, User, Heart,
  Droplets, ChevronRight, Bell, Wind, Moon, Sun, Target, TrendingUp, 
  Award, Video, Scan, X, CheckCircle, Pill, AlertTriangle, Info
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';

const IconApple = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.5 2 5.5 4.5 5 8c.5.5 1 1.5 1 2.5 0 1-.5 2-1 2.5-.5 2 0 4 1.5 5.5 1.5 1.5 3.5 2.5 5.5 2.5s4-1 5.5-2.5c1.5-1.5 2-3.5 1.5-5.5-.5-.5-1-1.5-1-2.5 0-1 .5-2 1-2.5C18.5 4.5 15.5 2 12 2zm-2 5c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1zm4 0c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1z"/>
  </svg>
);

const IconCloud = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
);

const IconStar = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const IconLayout = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="9" rx="1"/>
    <rect x="14" y="3" width="7" height="5" rx="1"/>
    <rect x="14" y="12" width="7" height="9" rx="1"/>
    <rect x="3" y="16" width="7" height="5" rx="1"/>
  </svg>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const [weather] = useState({ temp: 28, condition: 'Sunny', humidity: 65 });
  const [bmiState, setBmiState] = useState({ weight: 70, height: 170, result: 24.2, status: 'Normal' });
  const [medReminders, setMedReminders] = useState([
    { id: 1, name: 'Vitamin D', time: '8:00 AM', taken: false },
    { id: 2, name: 'Iron Tablet', time: '12:00 PM', taken: true },
    { id: 3, name: 'Calcium', time: '9:00 PM', taken: false }
  ]);
  const [showBmiModal, setShowBmiModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Appointment Reminder', desc: 'Dr. Sharma tomorrow at 10 AM', time: '1 hr ago', read: false },
    { id: 2, title: 'Health Tip', desc: 'Stay hydrated today!', time: '2 hrs ago', read: true },
    { id: 3, title: 'Results Ready', desc: 'Blood test results available', time: '1 day ago', read: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const healthTips = useMemo(() => [
    { icon: Droplets, title: 'Stay Hydrated', tip: 'Drink at least 8 glasses of water daily', color: 'text-blue-500' },
    { icon: Moon, title: 'Sleep Well', tip: 'Aim for 7-8 hours of sleep', color: 'text-purple-500' },
    { icon: Activity, title: 'Exercise', tip: '30 min of moderate activity', color: 'text-green-500' },
    { icon: IconApple, title: 'Eat Healthy', tip: 'Include fruits & vegetables', color: 'text-orange-500' }
  ], []);

  const quickActions = useMemo(() => [
    { icon: Scan, label: 'Scan Reports', color: 'from-blue-500 to-cyan-500', href: '/health-records' },
    { icon: MessageCircle, label: 'AI Chat', color: 'from-purple-500 to-pink-500', href: '/ai-chat' },
    { icon: MapPin, label: 'Find Docs', color: 'from-green-500 to-emerald-500', href: '/doctors' },
    { icon: Phone, label: 'Emergency', color: 'from-red-500 to-orange-500', href: '/emergency', urgent: true }
  ], []);

  const recentActivity = useMemo(() => [
    { title: 'Appointment Booked', desc: 'Dr. Sarah - General Checkup', time: '2 hrs ago', icon: Calendar },
    { title: 'Health Report Uploaded', desc: 'Blood Test Results', time: '1 day ago', icon: FileText },
    { title: 'Medication Taken', desc: 'Vitamin D - Morning dose', time: '1 day ago', icon: Pill }
  ], []);

  const doctorsNearYou = useMemo(() => [
    { name: 'Dr. Priya Sharma', specialty: 'Cardiologist', distance: '0.5 km', rating: 4.9, hospital: 'City Heart Center' },
    { name: 'Dr. Rahul Verma', specialty: 'General Physician', distance: '1.2 km', rating: 4.8, hospital: 'Metro Hospital' },
    { name: 'Dr. Anjali Singh', specialty: 'Pediatrician', distance: '2.0 km', rating: 4.7, hospital: 'Children Care Clinic' }
  ], []);

  const healthNews = useMemo(() => [
    { title: 'New Heart Health Guidelines', category: 'Heart', time: '2 hrs ago' },
    { title: 'Benefits of Morning Walk', category: 'Fitness', time: '5 hrs ago' },
    { title: 'Mental Health Awareness Week', category: 'Wellness', time: '1 day ago' }
  ], []);

  const menuItems = useMemo(() => [
    { name: 'Dashboard', icon: IconLayout, active: true },
    { name: 'Find Doctors', icon: Stethoscope, href: '/doctors' },
    { name: 'Appointments', icon: Calendar, href: '/appointments' },
    { name: 'Symptoms', icon: Activity, href: '/symptom-checker' },
    { name: 'AI Chat', icon: MessageCircle, href: '/ai-chat' },
    { name: 'Health Records', icon: FileText, href: '/health-records' },
    { name: 'Emergency', icon: Phone, href: '/emergency', urgent: true }
  ], []);

  const stats = useMemo(() => [
    { label: 'Appointments', value: 3, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Health Score', value: '85%', icon: Heart, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
    { label: 'Days Active', value: 30, icon: Activity, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Streak', value: 7, icon: Award, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' }
  ], []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getHealthCondition = () => {
    if (weather.condition === 'Sunny') return { text: 'Good for outdoor activities', icon: Sun };
    if (weather.condition === 'Cloudy') return { text: 'Stay cautious outdoors', icon: IconCloud };
    return { text: 'Stay indoor if sensitive', icon: Wind };
  };

  const toggleMedTaken = (id) => {
    setMedReminders(medReminders.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  const calculateBmi = () => {
    if (bmiState.height <= 0 || bmiState.weight <= 0) return;
    const heightM = bmiState.height / 100;
    const bmiValue = (bmiState.weight / (heightM * heightM)).toFixed(1);
    let status = 'Normal';
    if (bmiValue < 18.5) status = 'Underweight';
    else if (bmiValue >= 25 && bmiValue < 30) status = 'Overweight';
    else if (bmiValue >= 30) status = 'Obese';
    setBmiState({ ...bmiState, result: bmiValue, status });
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const userName = user?.name || 'User';
  const userCity = user?.city || 'City';
  const firstName = user?.name?.split(' ')[0] || 'User';
  const bmiProgress = Math.min(100, (bmiState.result / 35) * 100);
  const takenCount = medReminders.filter(m => m.taken).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.aside 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-72 flex-shrink-0"
          >
            <div className="glass-card rounded-card p-5 sticky top-24">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=00B4D8&color=fff&size=96`} 
                  alt={userName}
                  className="w-16 h-16 rounded-2xl shadow-lg" 
                />
                <div>
                  <p className="font-heading font-bold text-lg">{userName}</p>
                  <p className="text-sm text-gray-500">{userCity}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-green-500">Online</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-sm text-gray-500 mb-3 uppercase tracking-wider">Menu</h3>
                <nav className="space-y-1">
                  {menuItems.map(item => (
                    <Link 
                      key={item.name}
                      to={item.href || '#'}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        item.active 
                          ? 'gradient-btn text-white shadow-lg shadow-primary/25' 
                          : item.urgent
                            ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="p-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5" />
                  <span className="font-bold">Emergency?</span>
                </div>
                <p className="text-sm opacity-90 mb-3">Quick access to emergency services</p>
                <Link to="/emergency" className="block text-center py-2 bg-white text-red-500 rounded-lg font-medium hover:bg-opacity-90 transition-all">
                  Call Now
                </Link>
              </div>
            </div>
          </motion.aside>

          <motion.main 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                  <h1 className="text-3xl font-heading font-bold mb-1">
                    {getGreeting()}, {firstName} 👋
                  </h1>
                  <p className="text-gray-500">
                    {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="glass-card rounded-card px-4 py-2 flex items-center gap-2"
                    >
                      <Bell className="w-5 h-5 text-primary" />
                      <span className="font-medium">Alerts</span>
                      {unreadCount > 0 && (
                        <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </motion.button>
                    <AnimatePresence>
                      {showNotifications && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full right-0 mt-2 w-80 glass-card rounded-card p-4 z-50"
                        >
                          <h3 className="font-bold mb-3">Notifications</h3>
                          {notifications.map(n => (
                            <div 
                              key={n.id}
                              onClick={() => markNotificationRead(n.id)}
                              className={`p-3 rounded-lg mb-2 cursor-pointer ${
                                n.read ? 'bg-gray-50 dark:bg-gray-800' : 'bg-primary/10'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-sm">{n.title}</p>
                                {!n.read && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                              </div>
                              <p className="text-xs text-gray-500">{n.desc}</p>
                              <p className="text-xs text-gray-400">{n.time}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEmergencyModal(true)}
                    className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25"
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass-card rounded-card p-4 hover:shadow-lg transition-shadow ${stat.bg}`}
                >
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-heading font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="glass-card rounded-card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading font-bold text-lg">Quick Actions</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                      <motion.div key={action.label} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link 
                          to={action.href}
                          className={`block p-4 rounded-2xl bg-gradient-to-br ${action.color} text-white text-center hover:shadow-xl transition-shadow ${
                            action.urgent ? 'animate-pulse' : ''
                          }`}
                        >
                          <action.icon className="w-8 h-8 mx-auto mb-2" />
                          <p className="font-medium text-sm">{action.label}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-card p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-bold text-lg">Weather</h2>
                  <span className="text-sm text-gray-500">Today</span>
                </div>
                <div className="text-center py-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {(() => {
                      const WeatherIcon = getHealthCondition().icon;
                      return <WeatherIcon className="w-12 h-12 text-yellow-500" />;
                    })()}
                    <span className="text-4xl font-heading font-bold">{weather.temp}°</span>
                  </div>
                  <p className="text-gray-500">{weather.condition}</p>
                  <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      {weather.humidity}%
                    </span>
                    <span className="flex items-center gap-1">
                      <Wind className="w-4 h-4" />
                      12 km/h
                    </span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {getHealthCondition().text}
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 glass-card rounded-card p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-bold text-lg">BMI Calculator</h2>
                  <button 
                    onClick={() => setShowBmiModal(true)}
                    className="text-primary text-sm hover:underline"
                  >
                    Calculate
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl text-white">
                    <p className="text-sm opacity-90">Your BMI</p>
                    <p className="text-3xl font-bold mt-1">{bmiState.result}</p>
                    <p className="text-sm mt-2">{bmiState.status}</p>
                  </div>
                  <div className="col-span-2 flex flex-col justify-center">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Underweight</span>
                      <span>Normal</span>
                      <span>Overweight</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${bmiProgress}%` }}
                        className="h-full bg-gradient-to-r from-green-500 to-yellow-500 rounded-full"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      Target BMI: 18.5 - 24.9
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card rounded-card p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-bold text-lg">Medications</h2>
                  <span className="text-sm text-gray-500">{takenCount}/{medReminders.length}</span>
                </div>
                <div className="space-y-3">
                  {medReminders.slice(0, 3).map(med => (
                    <motion.div 
                      key={med.id}
                      whileHover={{ scale: 1.01 }}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                        med.taken ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'
                      }`}
                      onClick={() => toggleMedTaken(med.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          med.taken ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}>
                          {med.taken ? <CheckCircle className="w-5 h-5 text-white" /> : <Pill className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                          <p className={`font-medium ${med.taken ? 'line-through text-gray-400' : ''}`}>{med.name}</p>
                          <p className="text-xs text-gray-500">{med.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card rounded-card p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-bold text-lg">Recent Activity</h2>
                  <Link to="/health-records" className="text-primary text-sm flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <activity.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.desc}</p>
                      </div>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card rounded-card p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-bold text-lg">Health Tips</h2>
                  <Link to="/ai-chat" className="text-primary text-sm flex items-center gap-1">
                    Ask AI <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {healthTips.map((tip, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <tip.icon className={`w-6 h-6 ${tip.color} mb-2`} />
                      <p className="font-medium text-sm">{tip.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{tip.tip}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-card rounded-card p-5 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-lg">Nearby Doctors</h2>
                <Link to="/doctors" className="text-primary text-sm flex items-center gap-1">
                  See All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {doctorsNearYou.map((doc, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -4 }}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=random&size=80`} 
                        alt={doc.name}
                        className="w-12 h-12 rounded-xl"
                      />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        {doc.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <IconStar className="w-4 h-4 text-yellow-500 fill-current" />
                        {doc.rating}
                      </span>
                    </div>
                    <Link to="/doctors" className="block text-center mt-3 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors">
                      Book
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="glass-card rounded-card p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-lg">Health News</h2>
                <Link to="/ai-chat" className="text-primary text-sm flex items-center gap-1">
                  Read More <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {healthNews.map((news, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 4 }}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg mb-2">
                      {news.category}
                    </span>
                    <p className="font-medium mb-2">{news.title}</p>
                    <p className="text-xs text-gray-400">{news.time}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="glass-card rounded-card p-5 mt-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-lg">Upcoming Appointments</h2>
                <Link to="/appointments" className="text-primary text-sm flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">No upcoming appointments</p>
                <Link to="/doctors" className="inline-flex items-center gap-2 px-6 py-3 gradient-btn rounded-xl font-medium hover:shadow-lg transition-shadow">
                  <Plus className="w-5 h-5" />
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </motion.main>
        </div>
      </div>
      <Footer />

      <AnimatePresence>
        {showBmiModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowBmiModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-bold text-xl">BMI Calculator</h2>
                <button 
                  onClick={() => setShowBmiModal(false)}
                  className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                  <input 
                    type="number"
                    value={bmiState.weight}
                    onChange={e => setBmiState({ ...bmiState, weight: Number(e.target.value) || 0 })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Height (cm)</label>
                  <input 
                    type="number"
                    value={bmiState.height}
                    onChange={e => setBmiState({ ...bmiState, height: Number(e.target.value) || 0 })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={calculateBmi}
                  className="w-full py-3 gradient-btn rounded-xl font-medium"
                >
                  Calculate BMI
                </motion.button>
                {bmiState.result && (
                  <div className="text-center p-4 bg-primary/10 rounded-xl">
                    <p className="text-sm text-gray-500">Your BMI</p>
                    <p className="text-3xl font-bold text-primary">{bmiState.result}</p>
                    <p className="text-lg">{bmiState.status}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEmergencyModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEmergencyModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-bold text-xl text-red-500">Emergency Services</h2>
                <button 
                  onClick={() => setShowEmergencyModal(false)}
                  className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <a href="tel:102" className="flex items-center gap-4 p-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">
                  <Phone className="w-6 h-6" />
                  <div>
                    <p className="font-bold">Ambulance</p>
                    <p className="text-sm opacity-90">102</p>
                  </div>
                </a>
                <a href="tel:108" className="flex items-center gap-4 p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                  <Phone className="w-6 h-6" />
                  <div>
                    <p className="font-bold">Emergency</p>
                    <p className="text-sm opacity-90">108</p>
                  </div>
                </a>
                <a href="tel:104" className="flex items-center gap-4 p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                  <Phone className="w-6 h-6" />
                  <div>
                    <p className="font-bold">Medical Help</p>
                    <p className="text-sm opacity-90">104</p>
                  </div>
                </a>
                <Link to="/emergency" className="block text-center py-3 gradient-btn rounded-xl font-medium mt-4">
                  More Options
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;