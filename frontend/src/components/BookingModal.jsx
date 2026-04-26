import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, doctor, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  if (!isOpen || !doctor) return null;

  const availableTimes = doctor.availableSlots?.filter(s => !s.isBooked).map(s => s.time) || [];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm({ date: selectedDate, time: selectedTime });
    }
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white dark:bg-dark-bg rounded-card p-6 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-xl">Book Appointment</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><X className="w-5 h-5" /></button>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
            <img src={doctor.photo} alt={doctor.name} className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="font-bold">{doctor.name}</h3>
              <p className="text-primary text-sm">{doctor.specialization}</p>
              <p className="text-sm text-gray-500">₹{doctor.consultationFee}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Date</label>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800" min={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Select Time</label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.slice(0, 9).map(time => (
                  <button key={time} onClick={() => setSelectedTime(time)} className={`py-2 rounded-lg text-sm ${selectedTime === time ? 'gradient-btn' : 'bg-gray-100 dark:bg-gray-800'} transition-colors`}>{time}</button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={handleConfirm} disabled={!selectedDate || !selectedTime} className="w-full mt-4 py-3 rounded-btn gradient-btn disabled:opacity-50 disabled:cursor-not-allowed">Confirm Booking</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;