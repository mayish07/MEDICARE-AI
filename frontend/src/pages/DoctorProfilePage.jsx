import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Calendar, Phone, Globe, Video, Award, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { doctors as doctorData } from '../data/doctors';

const DoctorProfilePage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [tab, setTab] = useState('about');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  useEffect(() => {
    const doc = doctorData.find(d => d._id === id);
    setDoctor(doc);
  }, [id]);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-12 container mx-auto px-4 text-center">
          <p className="text-gray-500">Doctor not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-card p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img src={doctor.photo} alt={doctor.name} className="w-32 h-32 rounded-full mx-auto md:mx-0 border-4 border-primary" />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-heading font-bold">{doctor.name}</h1>
                <p className="text-primary font-medium">{doctor.specialization}</p>
                <p className="text-gray-500 flex items-center justify-center md:justify-start gap-1 mt-1"><MapPin className="w-4 h-4" /> {doctor.hospital?.name}, {doctor.city}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-3">
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-warning fill-warning" /> {doctor.rating}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {doctor.experience} yrs</span>
                  <span className="font-bold text-primary">₹{doctor.consultationFee}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {doctor.languages?.map(lang => (
                    <span key={lang} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full">{lang}</span>
                  ))}
                  {doctor.onlineConsultation && <span className="px-2 py-1 bg-success/10 text-success text-sm rounded-full flex items-center gap-1"><Video className="w-3 h-3" /> Online</span>}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Link to={`/book-appointment?doctorId=${doctor._id}`} className="px-6 py-3 gradient-btn rounded-btn text-center">Book Appointment</Link>
                {doctor.bookingLink && (
                  <a href={doctor.bookingLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-btn text-center flex items-center justify-center gap-2">
                    <Globe className="w-4 h-4" /> Book on Practo
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          <div className="flex gap-2 mb-6">
            {['about', 'availability', 'reviews'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-btn font-medium capitalize ${tab === t ? 'gradient-btn text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>{t}</button>
            ))}
          </div>

          {tab === 'about' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-card p-6">
              <h2 className="font-heading font-bold text-lg mb-4">About</h2>
              <p className="text-gray-600 dark:text-gray-400">{doctor.bio}</p>
              <div className="mt-4">
                <h3 className="font-bold mb-2">Qualification</h3>
                <p className="text-gray-500">{doctor.qualification}</p>
              </div>
            </motion.div>
          )}

          {tab === 'availability' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-card p-6">
              <h2 className="font-heading font-bold text-lg mb-4">Available Slots</h2>
              <div className="grid grid-cols-4 gap-2">
                {doctor.availableSlots?.filter(s => !s.isBooked).slice(0, 12).map((slot, i) => (
                  <Link key={i} to={`/book-appointment?doctorId=${doctor._id}`} className="py-2 bg-success/10 text-success text-center rounded-lg hover:bg-success hover:text-white">{slot.time}</Link>
                ))}
              </div>
              <Link to={`/book-appointment?doctorId=${doctor._id}`} className="block mt-4 text-center gradient-btn rounded-btn py-3">Book Now</Link>
            </motion.div>
          )}

          {tab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-card p-6">
              <h2 className="font-heading font-bold text-lg mb-4">Reviews</h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl font-bold">{doctor.rating}</span>
                <div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? 'text-warning fill-warning' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{doctor.totalReviews} reviews</p>
                </div>
              </div>
              <div className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="font-medium mb-2">Add Review</p>
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => setRating(star)}><Star className={`w-6 h-6 ${star <= rating ? 'text-warning fill-warning' : 'text-gray-300'}`} /></button>
                  ))}
                </div>
                <textarea value={review} onChange={e => setReview(e.target.value)} placeholder="Write your review..." className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800 mb-2" rows={3} />
                <button className="px-4 py-2 gradient-btn rounded-btn">Submit Review</button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorProfilePage;