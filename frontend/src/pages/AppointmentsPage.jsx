import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Video, X, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { appointments } from '../utils/api';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const AppointmentsPage = () => {
  const { user } = useAuth();
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await appointments.getAll();
        setAppointmentsList(response.data.appointments);
      } catch (error) {
        console.error('Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    if (!confirm('Cancel this appointment?')) return;
    try {
      await appointments.cancel(id);
      setAppointmentsList(prev => prev.map(a => a._id === id ? { ...a, status: 'Cancelled' } : a));
      toast.success('Appointment cancelled');
    } catch (error) {
      toast.error('Failed to cancel');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-heading font-bold">My Appointments</h1>
          <p className="text-gray-500">View and manage your appointments</p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div></div>
        ) : appointmentsList.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">No appointments yet</p>
            <Link to="/doctors" className="px-6 py-3 gradient-btn rounded-btn">Book Appointment</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {appointmentsList.map(appointment => (
              <motion.div key={appointment._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={appointment.doctor?.photo} alt={appointment.doctor?.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h3 className="font-bold">{appointment.doctor?.name}</h3>
                      <p className="text-primary text-sm">{appointment.doctor?.specialization}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(appointment.date).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${appointment.status === 'Confirmed' ? 'bg-success/10 text-success' : appointment.status === 'Cancelled' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'}`}>
                      {appointment.status === 'Confirmed' ? <CheckCircle className="w-3 h-3" /> : appointment.status === 'Cancelled' ? <XCircle className="w-3 h-3" /> : null}
                      {appointment.status}
                    </span>
                    {appointment.status === 'Confirmed' && (
                      <button onClick={() => handleCancel(appointment._id)} className="block mt-2 text-sm text-danger">Cancel</button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentsPage;