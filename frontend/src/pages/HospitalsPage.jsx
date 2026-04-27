import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HospitalCard from '../components/HospitalCard';
import SkeletonCard from '../components/SkeletonCard';
import { hospitals as hospitalData } from '../data/hospitals';
import { hospitals as apiHospitals } from '../utils/api';

const CITIES = ['Mangalore', 'Bangalore', 'Hyderabad', 'Chennai'];

const HospitalsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const storedCity = localStorage.getItem('selectedCity') || 'Mangalore';
  const cityParam = searchParams.get('city') || storedCity;
  const [city, setCity] = useState(cityParam);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    setLoading(true);
    const filtered = hospitalData.filter(h => h.city.toLowerCase() === city.toLowerCase());
    if (search) {
      setHospitals(filtered.filter(h => h.name.toLowerCase().includes(search.toLowerCase())));
    } else {
      setHospitals(filtered);
    }
    setLoading(false);
  }, [city, search]);

  const handleCityChange = (newCity) => {
    setCity(newCity);
    setSearchParams({ city: newCity });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Hospitals</h1>
          <p className="text-gray-500">Find the best hospitals across India</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {CITIES.map(c => (
              <button key={c} onClick={() => handleCityChange(c)} className={`px-6 py-2 rounded-full font-medium transition-colors ${city === c ? 'gradient-btn text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>{c}</button>
            ))}
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search hospitals..." className="w-full pl-10 p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => <SkeletonCard key={i} type="hospital" />)
          ) : hospitals.length > 0 ? (
            hospitals.map((hospital, i) => <HospitalCard key={hospital._id} hospital={hospital} index={i} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No hospitals found</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HospitalsPage;