import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, User, Phone, Stethoscope, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', city: 'Mangalore' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 10) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      await register(formData);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-primary to-accent p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="glass-card rounded-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-btn flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold">Create Account</h1>
            <p className="text-gray-600 dark:text-gray-400">Join MediCare AI today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your name" className="w-full pl-10 p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter your email" className="w-full pl-10 p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Enter phone number" className="w-full pl-10 p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <select value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800">
                <option value="Mangalore">Mangalore</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Create a password" className="w-full pl-10 pr-10 p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full transition-all ${getPasswordStrength() >= 50 ? 'bg-warning' : getPasswordStrength() >= 75 ? 'bg-success' : 'bg-danger'}`} style={{ width: `${getPasswordStrength()}%` }}></div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 rounded-btn gradient-btn font-medium disabled:opacity-50">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Already have an account? <Link to="/login" className="text-primary font-medium">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;