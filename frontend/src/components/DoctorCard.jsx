import { Link } from 'react-router-dom';
import { Star, Calendar, Video, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateAvatar, formatDate } from '../utils/helpers';

const DoctorCard = ({ doctor, index = 0 }) => {
  const hasAvailability = doctor.availableSlots?.some(s => !s.isBooked) || doctor.isAvailable;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="glass-card rounded-card p-4 hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="flex gap-4">
        <img src={doctor.photo || generateAvatar(doctor.name)} alt={doctor.name} className="w-20 h-20 rounded-full object-cover border-2 border-primary" />
        <div className="flex-1">
          <h3 className="font-heading font-bold text-lg">{doctor.name}</h3>
          <p className="text-primary font-medium">{doctor.specialization}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {doctor.hospital?.name}, {doctor.city}
          </p>
          
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-sm">
              <Clock className="w-3 h-3" /> {doctor.experience} yrs
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-warning fill-warning" /> {doctor.rating || 4.5}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {doctor.languages?.map((lang) => (
          <span key={lang} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs rounded-full">{lang}</span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 py-3 border-t border-gray-100 dark:border-gray-800">
        <div>
          <span className="text-lg font-bold text-primary">₹{doctor.consultationFee}</span>
          <span className="text-sm text-gray-500"> / consultation</span>
        </div>
        <div className={`flex items-center gap-1 text-sm ${hasAvailability ? 'text-success' : 'text-danger'}`}>
          <span className={`w-2 h-2 rounded-full ${hasAvailability ? 'bg-success' : 'bg-danger'}`}></span>
          {hasAvailability ? 'Available' : 'Unavailable'}
        </div>
      </div>

      <div className="flex gap-2">
        {doctor.onlineConsultation && (
          <span className="flex items-center gap-1 px-3 py-1 bg-success/10 text-success text-sm rounded-full">
            <Video className="w-3 h-3" /> Online
          </span>
        )}
        <Link to={`/doctors/${doctor._id}`} className="flex-1 py-2 rounded-btn bg-gray-100 dark:bg-gray-800 text-center hover:bg-primary hover:text-white transition-colors">View</Link>
        <Link to={`/book-appointment?doctorId=${doctor._id}`} className="flex-1 py-2 rounded-btn gradient-btn text-center">Book</Link>
      </div>
    </motion.div>
  );
};

export default DoctorCard;