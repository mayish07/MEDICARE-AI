import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import { motion } from 'framer-motion';

const DarkModeToggle = () => {
  const { isDark, toggleDark } = useDarkMode();

  return (
    <motion.button
      onClick={toggleDark}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:shadow-lg transition-shadow"
    >
      <motion.div animate={{ rotate: isDark ? 180 : 0 }} transition={{ duration: 0.3 }}>
        {isDark ? <Sun className="w-5 h-5 text-warning" /> : <Moon className="w-5 h-5 text-secondary" />}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;