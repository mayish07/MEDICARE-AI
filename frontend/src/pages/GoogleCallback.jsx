import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Loader } from 'lucide-react';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      setStatus('error');
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    if (code) {
      // In production, exchange code for tokens via backend
      // For demo, simulate successful login
      setTimeout(() => {
        const mockUser = {
          _id: 'google_' + Date.now(),
          name: 'Google User',
          email: 'user@gmail.com',
          city: localStorage.getItem('selectedCity') || 'Mangalore'
        };
        localStorage.setItem('token', 'google_token_' + Date.now());
        localStorage.setItem('user', JSON.stringify(mockUser));
        setStatus('success');
        setTimeout(() => navigate('/dashboard'), 1500);
      }, 1500);
    } else {
      navigate('/');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-primary to-accent flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 text-center"
      >
        {status === 'processing' && (
          <>
            <Loader className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold">Processing...</h2>
            <p className="text-gray-500">Please wait</p>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="text-xl font-bold text-success">Login Successful!</h2>
            <p className="text-gray-500">Redirecting to dashboard...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-danger text-2xl">✕</span>
            </div>
            <h2 className="text-xl font-bold text-danger">Login Failed</h2>
            <p className="text-gray-500">Redirecting...</p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default GoogleCallback;