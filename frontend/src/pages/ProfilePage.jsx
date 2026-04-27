import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { User, Mail, Phone, MapPin, Calendar, Droplet, AlertCircle, Save, Camera } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../utils/api';
import { BLOOD_GROUPS, CITY } from '../utils/helpers';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || CITY.MANGALORE,
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    bloodGroup: user?.bloodGroup || '',
    address: user?.address || '',
    medicalHistory: user?.medicalHistory || [],
    allergies: user?.allergies || [],
    emergencyContact: user?.emergencyContact || { name: '', phone: '', relation: '' }
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await auth.updateProfile(form);
      updateUser(response.data.user);
      toast.success('Profile updated!');
      setEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const toggleArrayField = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter(x => x !== value) : [...prev[field], value]
    }));
  };

  const commonAllergies = ['Penicillin', 'Aspirin', 'Pollen', 'Dust', 'Nuts', 'Shellfish'];
  const commonConditions = ['Diabetes', 'BP', 'Heart Disease', 'Asthma', 'Arthritis'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-heading font-bold">My Profile</h1>
            <button onClick={() => editing ? handleSave() : setEditing(true)} disabled={loading} className="px-4 py-2 gradient-btn rounded-btn font-medium disabled:opacity-50 flex items-center gap-2">
              {editing ? <><Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save'}</> : 'Edit Profile'}
            </button>
          </div>

          <div className="glass-card rounded-card p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img src={`https://ui-avatars.com/api/?name=${form.name}&background=00B4D8&color=fff&size=150`} alt={form.name} className="w-20 h-20 rounded-full" />
                {editing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 gradient-btn rounded-full flex items-center justify-center">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl">{form.name}</h2>
                <p className="text-gray-500">{form.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} disabled={!editing} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800 disabled:opacity-50" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} disabled={!editing} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800 disabled:opacity-50" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} disabled={!editing} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800 disabled:opacity-50">
                    <option value="Mangalore">Mangalore</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Blood Group</label>
                  <select value={form.bloodGroup} onChange={e => setForm({ ...form, bloodGroup: e.target.value })} disabled={!editing} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800 disabled:opacity-50">
                    <option value="">Select</option>
                    {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>

              {editing && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Allergies</label>
                    <div className="flex flex-wrap gap-2">
                      {commonAllergies.map(a => (
                        <button key={a} onClick={() => toggleArrayField('allergies', a)} className={`px-3 py-1 rounded-full text-sm ${form.allergies.includes(a) ? 'gradient-btn text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>{a}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Medical History</label>
                    <div className="flex flex-wrap gap-2">
                      {commonConditions.map(c => (
                        <button key={c} onClick={() => toggleArrayField('medicalHistory', c)} className={`px-3 py-1 rounded-full text-sm ${form.medicalHistory.includes(c) ? 'gradient-btn text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>{c}</button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-danger/10 rounded-lg">
                    <h3 className="font-bold mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Emergency Contact</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <input type="text" placeholder="Name" value={form.emergencyContact?.name} onChange={e => setForm({ ...form, emergencyContact: { ...form.emergencyContact, name: e.target.value } })} className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
                      <input type="tel" placeholder="Phone" value={form.emergencyContact?.phone} onChange={e => setForm({ ...form, emergencyContact: { ...form.emergencyContact, phone: e.target.value } })} className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
                      <input type="text" placeholder="Relation" value={form.emergencyContact?.relation} onChange={e => setForm({ ...form, emergencyContact: { ...form.emergencyContact, relation: e.target.value } })} className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;