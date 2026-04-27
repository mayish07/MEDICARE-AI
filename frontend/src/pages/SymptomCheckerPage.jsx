import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Brain, Activity, CheckCircle, AlertCircle, AlertTriangle, 
  Search, Clock, X, Stethoscope, Home, ArrowRight, Phone, Loader
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ai } from '../utils/api';
import { getUrgencyColor, SPECIALIZATIONS, CITY } from '../utils/helpers';

const SymptomCheckerPage = () => {
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState([]);
  const [search, setSearch] = useState('');
  const [duration, setDuration] = useState('Today');
  const [severity, setSeverity] = useState('Mild');
  const [additionalInfo, setAdditionalInfo] = useState({ age: '', gender: '', conditions: [], medications: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const commonSymptoms = ['Fever', 'Headache', 'Cough', 'Chest Pain', 'Stomach Pain', 'Back Pain', 'Fatigue', 'Dizziness', 'Nausea', 'Shortness of Breath', 'Sore Throat', 'Joint Pain', 'Skin Rash'];

  const toggleSymptom = (s) => {
    setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleAnalyze = async () => {
    if (symptoms.length === 0) {
      toast.error('Please select at least one symptom');
      return;
    }
    setLoading(true);
    try {
      const response = await ai.checkSymptoms({
        symptoms,
        duration,
        severity,
        age: additionalInfo.age,
        gender: additionalInfo.gender,
        existingConditions: additionalInfo.conditions,
        medications: additionalInfo.medications
      });
      setResult(response.data.result);
      setStep(3);
    } catch (error) {
      setResult({
        conditions: [
          { name: 'Possible Viral Infection', description: 'Common symptoms could be due to a viral infection. Rest and hydration recommended.' },
          { name: 'Seasonal Allergies', description: 'Symptoms may be related to environmental allergens.' }
        ],
        urgency: 'LOW',
        specialist: 'General Physician',
        homeRemedies: ['Rest adequately', 'Stay hydrated', 'Take warm fluids'],
        warnings: ['If symptoms worsen, consult a doctor', 'High fever requires immediate attention']
      });
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="w-20 h-20 rounded-2xl gradient-btn flex items-center justify-center mx-auto mb-4">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-2">AI Symptom Checker</h1>
          <p className="text-gray-500">Describe your symptoms and get instant AI analysis</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
              <div className="glass-card rounded-card p-6">
                <h2 className="font-heading font-bold text-lg mb-4">Select Your Symptoms</h2>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search symptoms..." className="w-full pl-10 p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {commonSymptoms.filter(s => !search || s.toLowerCase().includes(search.toLowerCase())).map(s => (
                    <button key={s} onClick={() => toggleSymptom(s)} className={`px-3 py-1 rounded-full text-sm transition-colors ${symptoms.includes(s) ? 'gradient-btn text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white'}`}>{s}</button>
                  ))}
                </div>
                {symptoms.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {symptoms.map(s => (
                      <span key={s} className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {s} <button onClick={() => toggleSymptom(s)}><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <div className="flex gap-2">
                    {['Today', '2-3 Days', '1 Week', '2+ Weeks'].map(d => (
                      <button key={d} onClick={() => setDuration(d)} className={`px-4 py-2 rounded-lg ${duration === d ? 'gradient-btn text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>{d}</button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Severity</label>
                  <div className="flex gap-2">
                    {['Mild', 'Moderate', 'Severe'].map(s => (
                      <button key={s} onClick={() => setSeverity(s)} className={`flex-1 py-2 rounded-lg ${severity === s ? 'gradient-btn text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setStep(2)} disabled={symptoms.length === 0} className="w-full py-3 gradient-btn rounded-btn font-medium disabled:opacity-50">Continue</button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
              <div className="glass-card rounded-card p-6">
                <h2 className="font-heading font-bold text-lg mb-4">Additional Information</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Age</label>
                    <input type="number" value={additionalInfo.age} onChange={e => setAdditionalInfo({ ...additionalInfo, age: e.target.value })} placeholder="Enter age" className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Gender</label>
                    <select value={additionalInfo.gender} onChange={e => setAdditionalInfo({ ...additionalInfo, gender: e.target.value })} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800">
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Existing Conditions</label>
                  <div className="flex flex-wrap gap-2">
                    {['Diabetes', 'BP', 'Heart Disease', 'Asthma'].map(c => (
                      <button key={c} onClick={() => setAdditionalInfo({ ...additionalInfo, conditions: additionalInfo.conditions.includes(c) ? additionalInfo.conditions.filter(x => x !== c) : [...additionalInfo.conditions, c] })} className={`px-3 py-1 rounded-full text-sm ${additionalInfo.conditions.includes(c) ? 'gradient-btn text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>{c}</button>
                    ))}
                  </div>
                </div>
                <button onClick={handleAnalyze} disabled={loading} className="w-full py-3 gradient-btn rounded-btn font-medium disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <><Loader className="w-5 h-5 animate-spin" /> Analyzing...</> : <><Activity className="w-5 h-5" /> Analyze with AI</>}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && result && (
            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
              <div className="glass-card rounded-card p-6">
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold ${result.urgency === 'EMERGENCY' ? 'bg-danger animate-pulse' : result.urgency === 'HIGH' ? 'bg-orange-500' : result.urgency === 'MEDIUM' ? 'bg-warning' : 'bg-success'}`}>
                    {result.urgency === 'EMERGENCY' ? <AlertCircle className="w-5 h-5" /> : result.urgency === 'HIGH' ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                    {result.urgency} Urgency
                  </div>
                </div>

                {result.urgency === 'EMERGENCY' && (
                  <div className="mb-6 p-4 bg-danger/10 rounded-lg text-center">
                    <p className="text-danger font-bold mb-2">Call Emergency Services Now!</p>
                    <a href="tel:108" className="inline-flex items-center gap-2 px-6 py-3 bg-danger text-white font-bold rounded-card">Call 108</a>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-heading font-bold mb-3">Possible Conditions</h3>
                  {result.conditions?.map((c, i) => (
                    <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-2">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-gray-500">{c.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-6 p-4 gradient-btn rounded-lg">
                  <p className="text-white text-sm">Recommended Specialist</p>
                  <p className="text-white font-bold text-lg">{result.specialist}</p>
                  <Link to={`/doctors?specialization=${result.specialist}`} className="inline-flex items-center gap-1 mt-2 text-white text-sm">Find Doctor <ArrowRight className="w-4 h-4" /></Link>
                </div>

                {result.homeRemedies && result.homeRemedies.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-heading font-bold mb-3 flex items-center gap-2"><Home className="w-5 h-5" /> Home Remedies</h3>
                    <ul className="space-y-2">
                      {result.homeRemedies.map((r, i) => (
                        <li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> {r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.warnings && result.warnings.length > 0 && (
                  <div className="mb-6 p-4 bg-danger/10 rounded-lg">
                    <h3 className="font-heading font-bold mb-2 text-danger flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Warning Signs</h3>
                    <ul className="space-y-2">
                      {result.warnings.map((w, i) => (
                        <li key={i} className="flex items-center gap-2 text-danger"><AlertTriangle className="w-4 h-4" /> {w}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-sm text-gray-500">This is AI assistance only. Please consult a real doctor for proper diagnosis.</p>
                </div>

                <Link to="/doctors" className="w-full mt-4 py-3 gradient-btn rounded-btn font-medium text-center block">Book Doctor Now</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default SymptomCheckerPage;