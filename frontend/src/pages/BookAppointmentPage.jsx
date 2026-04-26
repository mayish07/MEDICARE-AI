import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Calendar, Clock, MapPin, Video, User, FileText, CreditCard, CheckCircle, Loader } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { appointments, payment } from '../utils/api';
import { doctors as doctorData } from '../data/doctors';
import { useAuth } from '../hooks/useAuth';

const BookAppointmentPage = () => {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get('doctorId');
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [step, setStep] = useState(1);
  const [doctor, setDoctor] = useState(null);
  const [booking, setBooking] = useState({ date: '', time: '', type: 'In-Person', symptoms: '', notes: '' });
  const [patient, setPatient] = useState({ name: user?.name || '', age: '', phone: user?.phone || '', emergencyContact: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doctorId) {
      const doc = doctorData.find(d => d._id === doctorId);
      if (doc) setDoctor(doc);
    }
  }, [doctorId]);

  const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00'];

  const handleBook = async () => {
    if (!booking.date || !booking.time) {
      toast.error('Please select date and time');
      return;
    }
    setLoading(true);
    try {
      const response = await appointments.book({
        doctorId: doctor?._id,
        date: booking.date,
        time: booking.time,
        type: booking.type,
        symptoms: booking.symptoms,
        notes: booking.notes
      });
      toast.success('Appointment booked successfully!');
      navigate('/appointments');
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-12 container mx-auto px-4 text-center">
          <p className="text-gray-500 mb-4">Please select a doctor first</p>
          <Link to="/doctors" className="px-6 py-3 gradient-btn rounded-btn">Find Doctors</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            {['Select Slot', 'Patient Info', 'Confirm'].map((label, i) => (
              <div key={label} className={`flex items-center gap-2 ${step > i ? 'text-success' : step === i + 1 ? 'text-primary' : 'text-gray-400'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center ${step > i ? 'bg-success text-white' : step === i + 1 ? 'gradient-btn text-white' : 'bg-gray-200'}`}>
                  {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </span>
                <span className="hidden md:inline font-medium">{label}</span>
              </div>
            ))}
          </div>

          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-card p-6">
            {step === 1 && (
              <>
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-6">
                  <img src={doctor.photo} alt={doctor.name} className="w-16 h-16 rounded-full" />
                  <div>
                    <h3 className="font-bold">{doctor.name}</h3>
                    <p className="text-primary text-sm">{doctor.specialization}</p>
                    <p className="text-sm text-gray-500">₹{doctor.consultationFee}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-2">Appointment Type</label>
                  <div className="flex gap-2">
                    <button onClick={() => setBooking({ ...booking, type: 'In-Person' })} className={`flex-1 py-3 rounded-lg ${booking.type === 'In-Person' ? 'gradient-btn text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      <MapPin className="w-4 h-4 inline mr-2" /> In-Person
                    </button>
                    <button onClick={() => setBooking({ ...booking, type: 'Online' })} className={`flex-1 py-3 rounded-lg ${booking.type === 'Online' ? 'gradient-btn text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      <Video className="w-4 h-4 inline mr-2" /> Video Call
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-2">Select Date</label>
                  <input type="date" value={booking.date} onChange={e => setBooking({ ...booking, date: e.target.value })} min={new Date().toISOString().split('T')[0]} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-2">Select Time</label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map(time => (
                      <button key={time} onClick={() => setBooking({ ...booking, time })} className={`py-2 rounded-lg ${booking.time === time ? 'gradient-btn text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>{time}</button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-2">Symptoms (Optional)</label>
                  <textarea value={booking.symptoms} onChange={e => setBooking({ ...booking, symptoms: e.target.value })} placeholder="Describe your symptoms..." className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" rows={3} />
                </div>

                <button onClick={() => setStep(2)} disabled={!booking.date || !booking.time} className="w-full py-3 gradient-btn rounded-btn font-medium disabled:opacity-50">Continue</button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block font-medium mb-2">Full Name</label>
                    <input type="text" value={patient.name} onChange={e => setPatient({ ...patient, name: e.target.value })} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-2">Age</label>
                      <input type="number" value={patient.age} onChange={e => setPatient({ ...patient, age: e.target.value })} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
                    </div>
                    <div>
                      <label className="block font-medium mb-2">Phone</label>
                      <input type="tel" value={patient.phone} onChange={e => setPatient({ ...patient, phone: e.target.value })} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Emergency Contact</label>
                    <input type="tel" value={patient.emergencyContact} onChange={e => setPatient({ ...patient, emergencyContact: e.target.value })} placeholder="Phone number" className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
                  </div>
                </div>
                <button onClick={() => setStep(3)} className="w-full py-3 gradient-btn rounded-btn font-medium">Continue</button>
              </>
            )}

            {step === 3 && (
              <>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-6">
                  <h3 className="font-bold mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Doctor:</span> {doctor.name}</p>
                    <p><span className="text-gray-500">Specialization:</span> {doctor.specialization}</p>
                    <p><span className="text-gray-500">Date:</span> {booking.date}</p>
                    <p><span className="text-gray-500">Time:</span> {booking.time}</p>
                    <p><span className="text-gray-500">Type:</span> {booking.type}</p>
                    <p><span className="text-gray-500">Fee:</span> ₹{doctor.consultationFee}</p>
                  </div>
                </div>
                <button onClick={handleBook} disabled={loading} className="w-full py-3 gradient-btn rounded-btn font-medium disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <><Loader className="w-5 h-5 animate-spin" /> Processing...</> : <><CreditCard className="w-5 h-5" /> Pay & Book (₹{doctor.consultationFee})</>}
                </button>
              </>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookAppointmentPage;