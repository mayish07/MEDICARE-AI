import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, FileText, Activity, MessageCircle, Phone, MapPin, 
  Clock, Stethoscope, ArrowRight, Plus, User
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { useDarkMode } from '../hooks/useDarkMode';
import { appointments } from '../utils/api';

const DashboardPage = () => {
  const { user } = useAuth();
  const { isDark } = useDarkMode();
  const [appointmentsList, setAppointmentsList] = useState([]);

  const stats = [
    { label: 'Upcoming', value: appointmentsList.filter(a => a.status === 'Confirmed').length, icon: Calendar, color: 'text-primary' },
    { label: 'Records', value: 0, icon: FileText, color: 'text-success' },
    { label: 'Checks', value: 0, icon: Activity, color: 'text-warning' },
    { label: 'Profile', value: '100%', icon: User, color: 'text-danger' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="glass-card rounded-card p-4">
              <div className="flex items-center gap-3 mb-6">
                <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=00B4D8&color=fff`} alt={user?.name} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-bold">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.city}</p>
                </div>
              </div>
              <nav className="space-y-1">
                {['Dashboard', 'Find Doctors', 'My Appointments', 'Symptom Checker', 'AI Chat', 'Health Records', 'Emergency', 'Profile'].map(link => (
                  <Link key={link} to={`/${link.toLowerCase().replace(' ', '-')}`} className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">{link}</Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-2xl font-heading font-bold mb-2">Good Morning, {user?.name?.split(' ')[0]} 👋</h1>
              <p className="text-gray-500">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-card p-4">
                  <stat.icon className={`w-8 h-8 ${stat.color} mb-2`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[{ icon: Activity, label: 'Check Symptoms', href: '/symptom-checker' }, { icon: MessageCircle, label: 'Chat with AI', href: '/ai-chat' }, { icon: MapPin, label: 'Find Doctors', href: '/doctors' }, { icon: Phone, label: 'Emergency', href: '/emergency' }].map(action => (
                <Link key={action.label} to={action.href} className="flex items-center gap-4 p-4 glass-card rounded-card hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl gradient-btn flex items-center justify-center">
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">{action.label}</span>
                </Link>
              ))}
            </div>

            <div className="glass-card rounded-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-lg">Upcoming Appointments</h2>
                <Link to="/appointments" className="text-primary text-sm flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
              </div>
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No upcoming appointments</p>
                <Link to="/doctors" className="inline-flex items-center gap-2 mt-4 px-4 py-2 gradient-btn rounded-btn">Book Appointment</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;