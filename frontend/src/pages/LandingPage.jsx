import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Stethoscope, Activity, Heart, Pill, Calendar, FileText, 
  MessageCircle, Phone, MapPin, Clock, Star, CheckCircle, AlertCircle,
  Building2, Users, Award, ArrowRight, Search, ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HospitalCard from '../components/HospitalCard';
import DoctorCard from '../components/DoctorCard';
import { hospitals } from '../data/hospitals';
import { doctors } from '../data/doctors';
import { useAuth } from '../hooks/useAuth';
import { CITY } from '../utils/helpers';

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [city, setCity] = useState(() => localStorage.getItem('selectedCity') || CITY.MANGALORE);
  const titles = [`for ${city.charAt(0).toUpperCase() + city.slice(1)}`, 'for Mangalore', 'for Bangalore'];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex(prev => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-primary to-accent">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"></motion.div>
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></motion.div>
        <motion.div animate={{ x: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></motion.div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
              <Stethoscope className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">India's #1 Smart Health Assistant</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-4">
              Your AI Health Assistant<br />
              <span className="text-warning">{titles[titleIndex]}</span>
            </h1>

            <p className="text-lg text-white/80 mb-8 max-w-lg">Book appointments at KMC, Manipal, Fortis & more. AI symptom checker. Health records. All in one place.</p>

            <div className="flex flex-wrap gap-4">
              <Link to="/symptom-checker" className="px-6 py-3 bg-white text-primary font-bold rounded-card hover:shadow-xl transition-shadow flex items-center gap-2">
                <Activity className="w-5 h-5" /> Check My Symptoms
              </Link>
              <Link to="/doctors" className="px-6 py-3 bg-white/20 text-white font-bold rounded-card hover:bg-white/30 transition-colors flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Book Doctor
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 mt-10">
              {[{ label: '50+', sub: 'Hospitals' }, { label: '200+', sub: 'Doctors' }, { label: '10k+', sub: 'Patients' }, { label: '4.9★', sub: 'Rating' }].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{stat.label}</p>
                  <p className="text-white/70 text-sm">{stat.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:block">
            <div className="glass-card rounded-card p-6">
              <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg mb-4">
                <img src="https://ui-avatars.com/api/?name=Dr+Priya+Sharma&background=fff&color=00B4D8" alt="Doctor" className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <p className="text-white font-medium">Dr. Priya Sharma</p>
                  <p className="text-white/70 text-sm">Cardiologist</p>
                </div>
                <span className="w-3 h-3 bg-success rounded-full animate-pulse"></span>
              </div>
              <p className="text-white/80 text-center text-sm">Available for consultation now</p>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[ '09:00', '10:00', '11:00', '14:00', '15:00', '16:00' ].map(time => (
                  <button key={time} className="py-2 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20">{time}</button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, index }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="glass-card rounded-card p-6 hover:shadow-xl transition-all hover:-translate-y-1">
    <div className="w-12 h-12 rounded-xl gradient-btn flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="font-heading font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
  </motion.div>
);

const CityCard = ({ city, count }) => (
  <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-card overflow-hidden">
    <div className={`h-64 ${city === 'Mangalore' ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-gradient-to-br from-secondary to-primary'}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
        <Building2 className="w-16 h-16 mb-4" />
        <h3 className="text-2xl font-heading font-bold">{city}</h3>
        <p className="text-white/80">{count.hospitals} Hospitals • {count.doctors} Doctors</p>
        <button className="mt-4 px-6 py-2 bg-white text-primary font-bold rounded-btn">Explore {city}</button>
      </div>
    </div>
  </motion.div>
);

const TestimonialCard = ({ name, city, text, rating }) => (
  <div className="glass-card rounded-card p-6">
    <div className="flex items-center gap-2 mb-3">
      <img src={`https://ui-avatars.com/api/?name=${name}&background=00B4D8&color=fff`} alt={name} className="w-10 h-10 rounded-full" />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{city}</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-400 mb-3">"{text}"</p>
    <div className="flex gap-1">
      {[...Array(rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-warning fill-warning" />)}
    </div>
  </div>
);

const FAQItem = ({ question, answer, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: index * 0.1 }} className="border-b border-gray-200 dark:border-gray-700">
      <button onClick={() => setOpen(!open)} className="w-full py-4 flex items-center justify-between text-left">
        <span className="font-medium">{question}</span>
        <ChevronRight className={`w-5 h-5 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && <p className="pb-4 text-gray-600 dark:text-gray-400">{answer}</p>}
    </motion.div>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />

      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-12">Top Hospitals in Your City</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <CityCard city="Mangalore" count={{ hospitals: 5, doctors: 25 }} />
          <CityCard city="Bangalore" count={{ hospitals: 5, doctors: 40 }} />
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Our Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Activity} title="AI Symptom Checker" desc="Describe your symptoms and get instant AI analysis" index={0} />
            <FeatureCard icon={Calendar} title="Book Appointments" desc="Real hospitals in Mangalore & Bangalore" index={1} />
            <FeatureCard icon={MessageCircle} title="Online Consultation" desc="Video call with doctors from home" index={2} />
            <FeatureCard icon={FileText} title="Health Records" desc="Store prescriptions, reports securely" index={3} />
            <FeatureCard icon={Phone} title="Emergency SOS" desc="One tap emergency with hospital contact" index={4} />
            <FeatureCard icon={Stethoscope} title="AI Health Chat" desc="24/7 AI assistant for health queries" index={5} />
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-12">Top Doctors</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.slice(0, 6).map((doc, i) => <DoctorCard key={doc._id} doctor={doc} index={i} />)}
        </div>
        <div className="text-center mt-8">
          <Link to="/doctors" className="inline-flex items-center gap-2 px-6 py-3 gradient-btn rounded-btn font-medium">View All Doctors <ArrowRight className="w-5 h-5" /></Link>
        </div>
      </section>

      <section className="py-16 bg-danger text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">Medical Emergency?</h2>
          <p className="mb-8">Call 108 for ambulance. Our hospitals have 24/7 emergency services.</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="tel:108" className="px-8 py-4 bg-white text-danger font-bold rounded-card text-xl animate-pulse">Call 108</a>
            <a href="tel:0824-2445858" className="px-6 py-4 bg-white/20 rounded-card">KMC: 0824-2445858</a>
            <a href="tel:080-25023000" className="px-6 py-4 bg-white/20 rounded-card">Manipal: 080-25023000</a>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-12">What Our Patients Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard name="Rohan Shetty" city="Mangalore" text="Booked KMC appointment in 2 minutes! Amazing experience." rating={5} />
          <TestimonialCard name="Priya Nair" city="Bangalore" text="AI symptom checker helped me identify my issue before visiting the doctor." rating={5} />
          <TestimonialCard name="Arjun Reddy" city="Mangalore" text="Very easy to find doctors and book appointments. Highly recommended!" rating={4} />
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto">
          <FAQItem index={0} question="How do I book an appointment?" answer="Simply browse doctors, select one, choose a time slot, and confirm. You'll receive a confirmation email." />
          <FAQItem index={1} question="Is the AI symptom checker accurate?" answer="Our AI provides suggestions based on symptoms. Always consult a real doctor for proper diagnosis." />
          <FAQItem index={2} question="Can I get online consultations?" answer="Yes, many doctors offer online video consultations. Look for the Online badge." />
          <FAQItem index={3} question="How do I access my health records?" answer="Log in to your dashboard and navigate to Health Records to view and upload documents." />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;