import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

const Footer = () => {
  const { isDark } = useDarkMode();

  const hospitalsMangalore = [
    { name: 'KMC Hospital', phone: '0824-2445858' },
    { name: 'Father Muller', phone: '0824-2238000' },
    { name: 'A.J. Hospital', phone: '0824-2225533' }
  ];

  const hospitalsBangalore = [
    { name: 'Manipal Hospital', phone: '080-25023000' },
    { name: 'Fortis Hospital', phone: '080-66214444' },
    { name: 'Narayana Health', phone: '080-71222222' }
  ];

  const quickLinks = [
    { name: 'Find Doctors', href: '/doctors' },
    { name: 'Hospitals', href: '/hospitals' },
    { name: 'Symptom Checker', href: '/symptom-checker' },
    { name: 'AI Chat', href: '/ai-chat' },
    { name: 'Emergency', href: '/emergency' }
  ];

  return (
    <footer className={`${isDark ? 'bg-dark-bg' : 'bg-white'} border-t border-gray-200 dark:border-gray-800`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center">
                <span className="text-white text-xl font-bold">+</span>
              </div>
              <span className="text-xl font-heading font-bold gradient-text">MediCare AI</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Your Health, Our Priority. India's #1 Smart Health Assistant for Mangalore & Bangalore.</p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Mangalore Hospitals</h3>
            <ul className="space-y-3">
              {hospitalsMangalore.map((h) => (
                <li key={h.name}>
                  <a href={`tel:${h.phone}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" /> {h.name}: {h.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Bangalore Hospitals</h3>
            <ul className="space-y-3">
              {hospitalsBangalore.map((h) => (
                <li key={h.name}>
                  <a href={`tel:${h.phone}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" /> {h.name}: {h.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">Made with ❤️ in India © 2024 MediCare AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;