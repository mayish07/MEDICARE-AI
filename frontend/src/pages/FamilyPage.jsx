import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, User, Heart, Calendar, Trash2, Edit2, Phone, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';

const FamilyPage = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState([
    { id: 1, name: 'Self', relation: 'Self', age: 28, gender: 'Male', bloodGroup: 'B+', conditions: [], allergies: [] }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({ name: '', relation: '', age: '', gender: '', bloodGroup: '' });

  const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const RELATIONS = ['Self', 'Spouse', 'Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister', 'Grandfather', 'Grandmother'];

  const handleAddMember = () => {
    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...formData, id: editingMember.id } : m));
    } else {
      setMembers([...members, { ...formData, id: Date.now(), conditions: [], allergies: [] }]);
    }
    setShowModal(false);
    setEditingMember(null);
    setFormData({ name: '', relation: '', age: '', gender: '', bloodGroup: '' });
  };

  const handleDeleteMember = (id) => {
    if (confirm('Are you sure you want to remove this family member?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({ name: member.name, relation: member.relation, age: member.age, gender: member.gender, bloodGroup: member.bloodGroup });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2">👨‍👩‍👧 Family Health</h1>
              <p className="text-gray-500">Manage health profiles for your family</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setEditingMember(null); setFormData({ name: '', relation: '', age: '', gender: '', bloodGroup: '' }); setShowModal(true); }}
              className="flex items-center gap-2 px-4 py-2 gradient-btn rounded-xl font-medium"
            >
              <Plus className="w-5 h-5" /> Add Member
            </motion.button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full gradient-btn flex items-center justify-center">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.relation}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(member)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {member.relation !== 'Self' && (
                    <button onClick={() => handleDeleteMember(member.id)} className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                      <Trash2 className="w-4 h-4 text-danger" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Age</span>
                  <span className="font-medium">{member.age} years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Gender</span>
                  <span className="font-medium">{member.gender}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Blood Group</span>
                  <span className="font-medium text-danger">{member.bloodGroup}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link to="/health-records" className="text-primary text-sm font-medium">
                  View Health Records →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-warning" />
            <h3 className="font-bold">Health Tips for Family</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Heart className="w-6 h-6 text-blue-500 mb-2" />
              <h4 className="font-bold mb-1">Heart Health</h4>
              <p className="text-sm text-gray-500">Regular checkups for members above 40</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <Calendar className="w-6 h-6 text-green-500 mb-2" />
              <h4 className="font-bold mb-1">Vaccinations</h4>
              <p className="text-sm text-gray-500">Keep vaccination records updated</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <User className="w-6 h-6 text-purple-500 mb-2" />
              <h4 className="font-bold mb-1">Elderly Care</h4>
              <p className="text-sm text-gray-500">Regular BP & sugar monitoring</p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="glass-card dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              {editingMember ? 'Edit Member' : 'Add Family Member'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Relation</label>
                <select
                  value={formData.relation}
                  onChange={e => setFormData({ ...formData, relation: e.target.value })}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700"
                >
                  <option value="">Select relation</option>
                  {RELATIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700"
                    placeholder="Age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700"
                  >
                    <option value="">Select</option>
                    {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="flex-1 py-3 gradient-btn rounded-xl font-medium"
              >
                {editingMember ? 'Update' : 'Add'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FamilyPage;