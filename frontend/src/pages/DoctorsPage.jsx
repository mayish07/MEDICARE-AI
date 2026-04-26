import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Star, SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DoctorCard from '../components/DoctorCard';
import SkeletonCard from '../components/SkeletonCard';
import { doctors as doctorData } from '../data/doctors';
import { SPECIALIZATIONS } from '../utils/helpers';

const CITIES = ['Mangalore', 'Bangalore', 'Hyderabad', 'Chennai'];

const DoctorsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [specialization, setSpecialization] = useState(searchParams.get('specialization') || '');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    let filtered = doctorData;
    if (city) filtered = filtered.filter(d => d.city.toLowerCase() === city.toLowerCase());
    if (specialization) filtered = filtered.filter(d => d.specialization === specialization);
    if (search) filtered = filtered.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase()));
    setDoctors(filtered);
    setLoading(false);
  }, [city, specialization, search]);

  const clearFilters = () => {
    setCity('');
    setSpecialization('');
    setSearch('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Doctors</h1>
          <p className="text-gray-500">Find the best doctors across India</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex gap-2">
            <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search doctors by name or specialization..." className="w-full pl-10 p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
          </div>
        </div>

        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8 p-4 glass-card rounded-card">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <select value={city} onChange={e => setCity(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800">
                  <option value="">All Cities</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Specialization</label>
                <select value={specialization} onChange={e => setSpecialization(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800">
                  <option value="">All Specializations</option>
                  {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={clearFilters} className="w-full py-3 bg-gray-100 dark:bg-gray-800 rounded-lg">Clear Filters</button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => <SkeletonCard key={i} type="doctor" />)
          ) : doctors.length > 0 ? (
            doctors.map((doctor, i) => <DoctorCard key={doctor._id} doctor={doctor} index={i} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No doctors found</p>
              <button onClick={clearFilters} className="mt-4 px-4 py-2 gradient-btn rounded-btn">Clear Filters</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorsPage;