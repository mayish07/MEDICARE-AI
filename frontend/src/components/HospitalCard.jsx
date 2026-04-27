import { Link } from 'react-router-dom';
import { MapPin, Star, Phone, ExternalLink, Siren } from 'lucide-react';
import { motion } from 'framer-motion';

const HospitalCard = ({ hospital, index = 0 }) => {
  const getHref = (name) => {
    const query = encodeURIComponent(name + ' ' + hospital.city);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-card p-4 hover:shadow-xl transition-all hover:-translate-y-1"
    >
      <div className="flex gap-4">
        <img src={hospital.photo || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=200'} alt={hospital.name} className="w-24 h-24 rounded-lg object-cover" />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg">{hospital.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {hospital.city}
              </p>
            </div>
            {hospital.emergencyAvailable && (
              <span className="px-2 py-1 bg-danger/10 text-danger text-xs rounded-full flex items-center gap-1">
                <Siren className="w-3 h-3" /> Emergency
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(hospital.rating || 4) ? 'text-warning fill-warning' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{hospital.rating || 4.5}</span>
            <span className="text-sm text-gray-500">({hospital.totalBeds} beds)</span>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {hospital.specialties?.slice(0, 3).map((spec) => (
              <span key={spec} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">{spec}</span>
            ))}
            {hospital.specialties?.length > 3 && <span className="text-xs text-gray-500">+{hospital.specialties.length - 3} more</span>}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <a href={`tel:${hospital.phone}`} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-btn bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors">
          <Phone className="w-4 h-4" /> Call
        </a>
        <a href={hospital.googleMapsLink || getHref(hospital.name)} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-btn bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors">
          <MapPin className="w-4 h-4" /> Map
        </a>
        <Link to={`/hospitals/${hospital._id}`} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-btn gradient-btn">
          View
        </Link>
      </div>
    </motion.div>
  );
};

export default HospitalCard;