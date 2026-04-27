import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock, Truck, Heart, Pill, Calendar, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const ComingSoonCard = ({ icon: Icon, title, description, progress, link }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="glass-card rounded-2xl p-6 text-center"
  >
    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
      <Icon className="w-8 h-8 text-primary" />
    </div>
    <h3 className="font-heading font-bold text-lg mb-2">{title}</h3>
    <p className="text-sm text-gray-500 mb-4">{description}</p>
    {link ? (
      <Link to={link} className="inline-block px-4 py-2 gradient-btn rounded-lg text-white font-medium">
        Try Now →
      </Link>
    ) : (
      <>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
          <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-gray-400">{progress}% Complete</p>
        <span className="inline-block mt-3 px-3 py-1 bg-warning/20 text-warning text-xs rounded-full">
          Coming Soon
        </span>
      </>
    )}
  </motion.div>
);

const FeaturesPage = () => {
  const features = [
    {
      icon: Pill,
      title: 'Medicine Delivery',
      description: 'Order medicines online, get delivered at home. Partner with PharmEasy & 1mg.',
      progress: 15
    },
    {
      icon: Heart,
      title: 'Telemedicine',
      description: 'Video consultation with doctors from home. Secure video calls.',
      progress: 10
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Push notifications for appointments, medicines, health tips.',
      progress: 25
    },
    {
      icon: Clock,
      title: 'Lab Tests',
      description: 'Book lab tests at home. Free sample collection.',
      progress: 20
    },
    {
      icon: Calendar,
      title: 'Payments',
      description: 'Pay via UPI/Razorpay. Health insurance integration.',
      progress: 30
    },
    {
      icon: Truck,
      title: 'Ambulance Tracking',
      description: 'Real-time ambulance tracking, nearest hospital map.',
      progress: 10
    },
    {
      icon: AlertTriangle,
      title: 'ABHA Integration',
      description: 'Link Government Health ID, access national health records.',
      progress: 5
    },
    {
      icon: Heart,
      title: '✅ Family Profiles',
      description: 'Manage health for entire family in one account.',
      link: '/family'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-heading font-bold mb-4">🚀 Coming Soon</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We're working on these exciting features! Soon you'll be able to book medicines, 
            video consult doctors, track health vitals, and much more.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ComingSoonCard {...feature} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-card rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-heading font-bold mb-4">Want these features sooner?</h2>
          <p className="text-gray-500 mb-6">
            We're looking for partners and investors to build these faster. 
            Contact us to collaborate!
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-6 py-3 gradient-btn rounded-xl font-medium"
          >
            Contact Us
          </Link>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="glass-card rounded-xl p-6 text-center">
            <h3 className="font-bold text-3xl text-primary mb-2">50+</h3>
            <p className="text-gray-500">Hospitals</p>
          </div>
          <div className="glass-card rounded-xl p-6 text-center">
            <h3 className="font-bold text-3xl text-primary mb-2">200+</h3>
            <p className="text-gray-500">Doctors</p>
          </div>
          <div className="glass-card rounded-xl p-6 text-center">
            <h3 className="font-bold text-3xl text-primary mb-2">10k+</h3>
            <p className="text-gray-500">Patients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;