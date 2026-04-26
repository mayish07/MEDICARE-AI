import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogIn, UserPlus, Sun, Moon, Phone, MapPin } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleDark } = useDarkMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [city, setCity] = useState(() => localStorage.getItem('selectedCity') || 'Mangalore');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCity', city);
  }, [city]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Hospitals', href: '/hospitals' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Symptom Checker', href: '/symptom-checker' },
    { name: 'Emergency', href: '/emergency' },
    { name: 'Coming Soon', href: '/coming-soon' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-card shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center">
              <span className="text-white text-xl font-bold">+</span>
            </div>
            <span className="text-xl font-heading font-bold gradient-text">MediCare AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors font-medium">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-gray-100 dark:bg-dark-bg border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
            >
              <option value="Mangalore">Mangalore</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
            </select>

            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {isDark ? <Sun className="w-5 h-5 text-warning" /> : <Moon className="w-5 h-5 text-secondary" />}
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <img src={`https://ui-avatars.com/api/?name=${user.name}&background=00B4D8&color=fff`} alt={user.name} className="w-9 h-9 rounded-full" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-bg rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-2">
                    <Link to="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Dashboard</Link>
                    <Link to="/profile" className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-danger">Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 rounded-btn font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 rounded-btn gradient-btn font-medium">
                  Register
                </Link>
              </div>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white dark:bg-dark-bg shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 py-2">
                    {link.name}
                  </Link>
                ))}

                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-3 py-2"
                >
                  <option value="Mangalore">Mangalore</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                </select>

                {user ? (
                  <>
                    <Link to="/dashboard" className="px-4 py-2 rounded-btn bg-gray-100 dark:bg-gray-800">Dashboard</Link>
                    <button onClick={handleLogout} className="px-4 py-2 rounded-btn bg-danger/10 text-danger text-left">Logout</button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/login" className="flex-1 px-4 py-2 rounded-btn bg-gray-100 dark:bg-gray-800 text-center">Login</Link>
                    <Link to="/register" className="flex-1 px-4 py-2 rounded-btn gradient-btn text-center">Register</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;