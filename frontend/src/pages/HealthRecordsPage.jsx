import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Upload, X, Eye, Trash2, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { health } from '../utils/api';
import { RECORD_TYPES } from '../utils/helpers';

const HealthRecordsPage = () => {
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [newRecord, setNewRecord] = useState({ title: '', type: 'Prescription', description: '' });

  const typeColors = {
    'Prescription': 'bg-primary/10 text-primary',
    'Lab Report': 'bg-success/10 text-success',
    'Scan': 'bg-purple-500/10 text-purple-500',
    'Vaccination': 'bg-warning/10 text-warning',
    'Other': 'bg-gray-500/10 text-gray-500'
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      toast.success('Record uploaded successfully!');
      setUploadModal(false);
      setNewRecord({ title: '', type: 'Prescription', description: '' });
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold">Health Records</h1>
              <p className="text-gray-500">Store and manage your medical records</p>
            </div>
            <button onClick={() => setUploadModal(true)} className="px-4 py-2 gradient-btn rounded-btn flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload Record
            </button>
          </div>
        </motion.div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search records..." className="w-full pl-10 p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
          </div>
          <select value={type} onChange={e => setType(e.target.value)} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800">
            <option value="">All Types</option>
            {RECORD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {records.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-4">No records yet</p>
              <button onClick={() => setUploadModal(true)} className="px-6 py-3 gradient-btn rounded-btn">Upload First Record</button>
            </div>
          ) : records.map(record => (
            <motion.div key={record._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-card p-4">
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs ${typeColors[record.type]}`}>{record.type}</span>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><Trash2 className="w-4 h-4 text-danger" /></button>
              </div>
              <h3 className="font-bold">{record.title}</h3>
              <p className="text-sm text-gray-500">{record.doctor}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(record.date).toLocaleDateString()}</p>
            </motion.div>
          ))}
        </div>

        {uploadModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setUploadModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white dark:bg-dark-bg rounded-card p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-xl">Upload Record</h2>
                <button onClick={() => setUploadModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Click or drag file here</p>
                  <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input type="text" value={newRecord.title} onChange={e => setNewRecord({ ...newRecord, title: e.target.value })} placeholder="e.g., Annual Checkup" className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select value={newRecord.type} onChange={e => setNewRecord({ ...newRecord, type: e.target.value })} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800">
                    {RECORD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 gradient-btn rounded-btn font-medium disabled:opacity-50">
                  {loading ? 'Uploading...' : 'Upload'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HealthRecordsPage;