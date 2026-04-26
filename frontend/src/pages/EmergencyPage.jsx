import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Building2, Siren, AlertCircle, ChevronRight, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import { hospitals } from '../data/hospitals';

const CITIES = ['Mangalore', 'Bangalore', 'Hyderabad', 'Chennai'];

const EmergencyPage = () => {
  const [expanded, setExpanded] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Mangalore');

  const emergencyHospitals = hospitals.filter(h => h.city === selectedCity && h.emergencyAvailable);

  const emergencyNumbers = [
    { label: 'Siren', number: '108', color: 'bg-danger' },
    { label: 'Police', number: '100', color: 'bg-secondary' },
    { label: 'Fire', number: '101', color: 'bg-orange-500' },
    { label: 'Women Helpline', number: '1091', color: 'bg-pink-500' },
    { label: 'Child Helpline', number: '1098', color: 'bg-success' }
  ];

  const firstAid = [
    { title: 'Heart Attack', steps: ['Call 108 immediately', 'Sit the person down', 'Loosen tight clothing', 'If conscious, give aspirin', 'Start CPR if needed'] },
    { title: 'Choking', steps: ['Encourage coughing', 'Back blows (5)', 'Heimlich maneuver', 'Call 108 if fails'] },
    { title: 'Bleeding', steps: ['Apply direct pressure', 'Elevate the area', 'Apply bandage', 'Call 108'] },
    { title: 'Burns', steps: ['Cool water 10min', 'Remove jewelry/clothes', 'Cover with clean cloth', 'Do not apply cream'] },
    { title: 'Fracture', steps: ['Do not move', 'Immobilize area', 'Apply cold pack', 'Call 108'] },
    { title: 'Stroke (FAST)', steps: ['F - Face drooping', 'A - Arm weakness', 'S - Speech difficulty', 'T - Time to call 108'] }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        <div className="bg-danger text-white py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-heading font-bold mb-4">🚨 Medical Emergency?</h1>
            <p className="text-xl mb-6">Call 108 Immediately for Siren</p>
            <a href="tel:108" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-danger font-bold text-xl rounded-card animate-pulse">Call 108</a>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-heading font-bold mb-6">Emergency Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {emergencyNumbers.map(item => (
              <a key={item.label} href={`tel:${item.number}`} className={`${item.color} text-white p-6 rounded-card text-center hover:scale-105 transition-transform`}>
                <Phone className="w-8 h-8 mx-auto mb-2" />
                <p className="font-bold text-lg">{item.number}</p>
                <p className="text-sm opacity-80">{item.label}</p>
              </a>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-6">Emergency Hospitals</h2>
            <div className="flex gap-2 mb-6 flex-wrap">
              {CITIES.map(city => (
                <button key={city} onClick={() => setSelectedCity(city)} className={`px-6 py-2 rounded-full font-medium transition-colors ${selectedCity === city ? 'gradient-btn text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                  {city}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {emergencyHospitals.length > 0 ? emergencyHospitals.map(h => (
                <div key={h._id} className="glass-card rounded-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">{h.name}</h3>
                      <p className="text-sm text-gray-500">{h.address}</p>
                      <a href={`tel:${h.phone}`} className="text-primary flex items-center gap-1 mt-1"><Phone className="w-4 h-4" /> {h.phone}</a>
                    </div>
                    <a href={h.googleMapsLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ' ' + h.city)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <MapPin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500">No emergency hospitals found in this city</p>
              )}
            </div>
          </div>

          <h2 className="text-2xl font-heading font-bold mb-6">Quick First Aid Guide</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {firstAid.map(item => (
              <div key={item.title} className="glass-card rounded-card overflow-hidden">
                <button onClick={() => setExpanded(expanded === item.title ? null : item.title)} className="w-full p-4 flex items-center justify-between text-left">
                  <span className="font-bold">{item.title}</span>
                  <ChevronRight className={`w-5 h-5 transition-transform ${expanded === item.title ? 'rotate-90' : ''}`} />
                </button>
                {expanded === item.title && (
                  <div className="p-4 pt-0">
                    <ol className="list-decimal list-inside space-y-1">
                      {item.steps.map((s, i) => <li key={i} className="text-sm text-gray-600">{s}</li>)}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;