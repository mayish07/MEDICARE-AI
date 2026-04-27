const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

dotenv.config();

const connectDB = require('../config/db');

const hospitals = [
  {
    name: 'KMC Hospital',
    city: 'Mangalore',
    address: 'Ambedkar Circle, Mangalore - 575001',
    phone: '0824-2445858',
    email: 'kmc@manipal.edu',
    website: 'https://www.manipal.edu/kmc-mangalore.html',
    googleMapsLink: 'https://maps.app.goo.gl/KMCMangalore',
    lat: 12.8698,
    lng: 74.8347,
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Emergency'],
    facilities: ['ICU', 'Blood Bank', 'Pharmacy', 'Ambulance', 'Radiology'],
    photo: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800',
    rating: 4.7,
    totalBeds: 1800,
    emergencyAvailable: true,
    ambulanceAvailable: true,
    timings: '24/7',
    about: 'Kasturba Medical College Hospital is a premier medical institution in Mangalore providing comprehensive healthcare services.'
  },
  {
    name: 'Father Muller Medical College Hospital',
    city: 'Mangalore',
    address: 'Father Muller Road, Kankanady, Mangalore - 575002',
    phone: '0824-2238000',
    email: 'info@fathermuller.in',
    website: 'https://www.fathermuller.in',
    googleMapsLink: 'https://maps.app.goo.gl/FatherMuller',
    lat: 12.8642,
    lng: 74.8394,
    specialties: ['General Surgery', 'Gynecology', 'Pediatrics', 'Psychiatry'],
    facilities: ['ICU', 'Blood Bank', 'Pharmacy', ' Ambulance'],
    photo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6d0a1?w=800',
    rating: 4.6,
    totalBeds: 1400,
    emergencyAvailable: true,
    ambulanceAvailable: true,
    timings: '24/7',
    about: 'Father Muller Medical College Hospital is a renowned medical institution affiliated with Father Muller Charitable Institutions.'
  },
  {
    name: 'A.J. Hospital & Research Centre',
    city: 'Mangalore',
    address: 'NH-66, Kuntikan, Mangalore - 575004',
    phone: '0824-2225533',
    email: 'info@ajhospital.in',
    website: 'https://www.ajhospital.in',
    googleMapsLink: 'https://maps.app.goo.gl/AJHospital',
    lat: 12.8423,
    lng: 74.8234,
    specialties: ['Cardiology', 'Gastroenterology', 'Urology', 'Dermatology'],
    facilities: ['ICU', 'Pharmacy', 'Ambulance', 'Lab'],
    photo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
    rating: 4.5,
    totalBeds: 800,
    emergencyAvailable: true,
    ambulanceAvailable: true,
    timings: '24/7',
    about: 'A.J. Hospital & Research Centre is a multi-specialty hospital with state-of-the-art facilities.'
  },
  {
    name: 'Yenepoya Medical College Hospital',
    city: 'Mangalore',
    address: 'Deralakatte, Mangalore - 575018',
    phone: '0824-2204668',
    email: 'medical@yenepoya.edu.in',
    website: 'https://www.yenepoya.edu.in',
    googleMapsLink: 'https://maps.app.goo.gl/Yenepoya',
    lat: 12.8234,
    lng: 74.8567,
    specialties: ['Nephrology', 'Endocrinology', 'Pulmonology', 'ENT'],
    facilities: ['ICU', 'Dialysis', 'Pharmacy', 'Ambulance'],
    photo: 'https://images.unsplash.com/photo-1551190822-a9333d879b1e?w=800',
    rating: 4.4,
    totalBeds: 1000,
    emergencyAvailable: true,
    ambulanceAvailable: true,
    timings: '24/7',
    about: 'Yenepoya Medical College Hospital is a leading medical institution in the region.'
  },
  {
    name: 'Unity Health Complex',
    city: 'Mangalore',
    address: 'Bendore, Mangalore - 575002',
    phone: '0824-2221111',
    email: 'info@unityhealth.in',
    googleMapsLink: 'https://maps.app.goo.gl/UnityHealthMangalore',
    lat: 12.8567,
    lng: 74.8289,
    specialties: ['General Medicine', 'Orthopedics', 'Ophthalmology'],
    facilities: ['Lab', 'Pharmacy'],
    photo: 'https://images.unsplash.com/photo-1590658218037-767816a80fcb?w=800',
    rating: 4.3,
    totalBeds: 300,
    emergencyAvailable: false,
    ambulanceAvailable: false,
    timings: '9AM - 6PM',
    about: 'Unity Health Complex provides quality healthcare services at affordable costs.'
  },
  {
    name: 'Manipal Hospital',
    city: 'Bangalore',
    address: '98, HAL Airport Road, Bangalore - 560017',
    phone: '080-25023000',
    email: 'info@manipalhospitals.com',
    website: 'https://www.manipalhospitals.com/bangalore',
    googleMapsLink: 'https://maps.app.goo.gl/ManipaBangalore',
    lat: 12.9612,
    lng: 77.6448,
    specialties: ['Oncology', 'Cardiology', 'Neurology', 'Transplants', 'Robotics'],
    facilities: ['ICU', 'Blood Bank', 'Pharmacy', 'Ambulance', 'Robotics'],
    photo: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800',
    rating: 4.8,
    totalBeds: 600,
    emergencyAvailable: true,
    ambulanceAvailable: true,
    timings: '24/7',
    about: 'Manipal Hospital is a multi-specialty tertiary care hospital with world-class amenities.'
  },
  {
    name: 'Fortis Hospital Bannerghatta',
    city: 'Bangalore',
    address: '154/9, Bannerghatta Road, Bangalore - 560076',
    phone: '080-66214444',
    email: 'bannerghatta@fortishealthcare.com',
    website: 'https://www.fortishealthcare.com',
    googleMapsLink: 'https://maps.app.goo.gl/FortisBangalore',
    lat: 12.9176,
    lng: 77.5991,
    specialties: ['Cardiac Sciences', 'Orthopedics', 'Neurosciences'],
    facilities: ['ICU', 'Blood Bank', 'Pharmacy', 'Ambulance'],
    photo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
    rating: 4.7,
    totalBeds: 400,
    emergencyAvailable: true,
    ambulanceAvailable: true,
    timings: '24/7',
    about: 'Fortis Bannerghatta is a premier cardiac and orthopedics center in Bangalore.'
  },
  {
    name: 'Narayana Health City',
    city: 'Bangalore',
    address: '258/A, Bommasandra, Bangalore - 560099',
    phone: '080-71222222',
    email: 'info@narayanahealth.org',
    website: 'https://www.narayanahealth.org',
    googleMapsLink: 'https://maps.app.goo.gl/NarayanaHealth',
    lat: 12.8421,
    lng: 77.6589,
    specialties: ['Cardiac Surgery', 'Pediatric Cardiology', 'Bone Marrow Transplant'],
    facilities: ['ICU', 'Blood Bank', 'Pharmacy', 'Ambulance'],
    photo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6d0a1?w=800',
    rating: 4.8,
    totalBeds: 1500,
    emergencyAvailable: true,
    ambulanceAvailable: true,
    timings: '24/7',
    about: 'Narayana Health City is a world-class healthcare destination with affordable cardiac care.'
  },
  {
    name: 'Sakra World Hospital',
    city: 'Bangalore',
    address: 'SY No. 52/2, Devarabeesanahalli, Bangalore - 560103',
    phone: '080-49690000',
    email: 'info@sakraworldhospital.com',
    website: 'https://www.sakraworldhospital.com',
    googleMapsLink: 'https://maps.app.goo.gl/SakraWorld',
    lat: 13.0067,
    lng: 77.6312,
    specialties: ['Orthopedics', 'Neurology', 'Urology', 'Gastroenterology'],
    facilities: ['ICU', 'Pharmacy', 'Ambulance', 'Lab'],
    photo: 'https://images.unsplash.com/photo-1551190822-a9333d879b1e?w=800',
    rating: 4.6,
    totalBeds: 350,
    emergencyAvailable: true,
    ambulanceAvailable: true,
    timings: '24/7',
    about: 'Sakra World Hospital is a premium multi-specialty hospital with international standards.'
  },
  {
    name: 'Columbia Asia Hospital Hebbal',
    city: 'Bangalore',
    address: 'Kirloskar Business Park, Hebbal, Bangalore - 560024',
    phone: '080-61165353',
    email: 'hebbal@columbiaasia.com',
    website: 'https://www.columbiaasia.com',
    googleMapsLink: 'https://maps.app.goo.gl/ColumbiaAsiaHebbal',
    lat: 13.0353,
    lng: 77.5970,
    specialties: ['General Surgery', 'Gynecology', 'Pediatrics', 'Diabetes'],
    facilities: ['ICU', 'Pharmacy', 'Ambulance'],
    photo: 'https://images.unsplash.com/photo-1590658218037-767816a80fcb?w=800',
    rating: 4.5,
    totalBeds: 290,
    emergencyAvailable: true,
    ambulanceAvailable: true,
    timings: '24/7',
    about: 'Columbia Asia Hospital provides quality healthcare with patient-centric approach.'
  }
];

const generateSlots = (days = 7) => {
  const slots = [];
  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
  
  for (let d = 0; d < days; d++) {
    const date = new Date();
    date.setDate(date.getDate() + d);
    date.setHours(0, 0, 0, 0);
    
    times.forEach(time => {
      slots.push({
        date: new Date(date),
        time,
        isBooked: Math.random() < 0.3
      });
    });
  }
  return slots;
};

const doctorData = [
  {
    name: 'Dr. Priya Sharma',
    specialization: 'Cardiologist',
    qualification: 'MD, DM Cardiology',
    experience: 15,
    hospitalIndex: 0,
    city: 'Mangalore',
    bio: 'Dr. Priya Sharma is a renowned cardiologist with 15 years of experience in treating heart conditions. She specializes in interventional cardiology and has performed over 5000 successful procedures.',
    languages: ['Kannada', 'Hindi', 'English'],
    consultationFee: 800,
    rating: 4.8,
    totalReviews: 156,
    onlineConsultation: true,
    bookingLink: 'https://www.practo.com/doctors/cardiologists'
  },
  {
    name: 'Dr. Rajesh Kumar',
    specialization: 'Neurologist',
    qualification: 'MD, DM Neurology',
    experience: 18,
    hospitalIndex: 0,
    city: 'Mangalore',
    bio: 'Dr. Rajesh Kumar is a senior neurologist specializing in stroke treatment and neurodegenerative disorders. He has been instrumental in establishing the stroke unit at KMC.',
    languages: ['Kannada', 'Hindi', 'English', 'Tulu'],
    consultationFee: 1000,
    rating: 4.9,
    totalReviews: 203,
    onlineConsultation: true,
    bookingLink: 'https://www.practo.com/doctors/neurologists'
  },
  {
    name: 'Dr. Anjali Rao',
    specialization: 'Gynecologist',
    qualification: 'MD, DGO',
    experience: 12,
    hospitalIndex: 1,
    city: 'Mangalore',
    bio: 'Dr. Anjali Rao is a leading gynecologist in Mangalore with expertise in high-risk pregnancies and minimally invasive surgeries.',
    languages: ['Kannada', 'English', 'Hindi'],
    consultationFee: 600,
    rating: 4.7,
    totalReviews: 178,
    onlineConsultation: true,
    bookingLink: 'https://www.practo.com/doctors/gynecologists'
  },
  {
    name: 'Dr. Suresh Nayak',
    specialization: 'Orthopedic',
    qualification: 'MS Orthopedics',
    experience: 20,
    hospitalIndex: 2,
    city: 'Mangalore',
    bio: 'Dr. Suresh Nayak is a highly experienced orthopedic surgeon specializing in joint replacements and sports injuries.',
    languages: ['Kannada', 'English', 'Tulu'],
    consultationFee: 750,
    rating: 4.6,
    totalReviews: 145,
    onlineConsultation: false,
    bookingLink: 'https://www.practo.com/doctors/orthopedists'
  },
  {
    name: 'Dr. Meera Shetty',
    specialization: 'Pediatrician',
    qualification: 'MD Pediatrics',
    experience: 10,
    hospitalIndex: 3,
    city: 'Mangalore',
    bio: 'Dr. Meera Shetty is a compassionate pediatrician dedicated to child health and wellness. She has special interest in developmental pediatrics.',
    languages: ['Kannada', 'English', 'Hindi'],
    consultationFee: 500,
    rating: 4.8,
    totalReviews: 98,
    onlineConsultation: true,
    bookingLink: 'https://www.practo.com/doctors/pediatricians'
  },
  {
    name: 'Dr. Vikram Singh',
    specialization: 'General Physician',
    qualification: 'MD General Medicine',
    experience: 8,
    hospitalIndex: 4,
    city: 'Mangalore',
    bio: 'Dr. Vikram Singh is a dedicated physician providing comprehensive primary care services with a patient-first approach.',
    languages: ['Hindi', 'English', 'Kannada'],
    consultationFee: 400,
    rating: 4.5,
    totalReviews: 67,
    onlineConsultation: true,
    bookingLink: 'https://www.practo.com/doctors/general-physicians'
  },
  {
    name: 'Dr. Kavita Reddy',
    specialization: 'Dermatologist',
    qualification: 'MD Dermatology',
    experience: 14,
    hospitalIndex: 5,
    city: 'Bangalore',
    bio: 'Dr. Kavita Reddy is a celebrated dermatologist in Bangalore specializing in cosmetic dermatology and skin rejuvenation treatments.',
    languages: ['Kannada', 'Hindi', 'English', 'Tamil'],
    consultationFee: 900,
    rating: 4.9,
    totalReviews: 234,
    onlineConsultation: true,
    bookingLink: 'https://www.practo.com/doctors/dermatologists'
  },
  {
    name: 'Dr. Arun Thomas',
    specialization: 'Cardiologist',
    qualification: 'MD, DM Cardiology',
    experience: 16,
    hospitalIndex: 6,
    city: 'Bangalore',
    bio: 'Dr. Arun Thomas is a leading cardiologist with expertise in complex cardiac interventions and heart failure management.',
    languages: ['English', 'Hindi', 'Kannada'],
    consultationFee: 1200,
    rating: 4.8,
    totalReviews: 189,
    onlineConsultation: true,
    bookingLink: 'https://www.practo.com/doctors/cardiologists'
  },
  {
    name: 'Dr. Radhika Raj',
    specialization: 'Neurologist',
    qualification: 'MD, DM Neurology',
    experience: 11,
    hospitalIndex: 7,
    city: 'Bangalore',
    bio: 'Dr. Radhika Raj is a skilled neurologist with expertise in movement disorders and epilepsy management.',
    languages: ['English', 'Kannada', 'Hindi', 'Tamil'],
    consultationFee: 1100,
    rating: 4.7,
    totalReviews: 156,
    onlineConsultation: true,
    bookingLink: 'https://www.practo.com/doctors/neurologists'
  },
  {
    name: 'Dr. Prasad Hegde',
    specialization: 'Orthopedic',
    qualification: 'MS Orthopedics, Fellowship Joint Replacement',
    experience: 17,
    hospitalIndex: 8,
    city: 'Bangalore',
    bio: 'Dr. Prasad Hegde is a distinguished orthopedic surgeon specializing in robotic joint replacements and sports medicine.',
    languages: ['Kannada', 'English', 'Hindi'],
    consultationFee: 1000,
    rating: 4.8,
    totalReviews: 178,
    onlineConsultation: true,
    bookingLink: 'https://www.practo.com/doctors/orthopedists'
  },
  {
    name: 'Dr. Lakshmi Iyer',
    specialization: 'Gynecologist',
    qualification: 'MD, DGO, Fellowship Reproductive Medicine',
    experience: 13,
    hospitalIndex: 9,
    city: 'Bangalore',
    bio: 'Dr. Lakshmi Iyer is a renowned gynecologist and fertility specialist helping couples achieve their dream of parenthood.',
    languages: ['English', 'Hindi', 'Kannada', 'Tamil'],
    consultationFee: 850,
    rating: 4.9,
    totalReviews: 267,
    onlineConsultation: true,
    bookingLink: 'https://www.practo.com/doctors/gynecologists'
  },
  {
    name: 'Dr. Naveen Joshi',
    specialization: 'Pulmonologist',
    qualification: 'MD, DM Pulmonology',
    experience: 9,
    hospitalIndex: 5,
    city: 'Bangalore',
    bio: 'Dr. Naveen Joshi is a pulmonologist specializing in respiratory diseases, sleep disorders, and critical care pulmonology.',
    languages: ['Kannada', 'English', 'Hindi'],
    consultationFee: 750,
    rating: 4.6,
    totalReviews: 123,
    onlineConsultation: true,
    bookingLink: 'https://www.practo.com/doctors/pulmonologists'
  },
  {
    name: 'Dr. Smitha Pai',
    specialization: 'Ophthalmologist',
    qualification: 'MS Ophthalmology, Fellowship Cornea',
    experience: 11,
    hospitalIndex: 7,
    city: 'Bangalore',
    bio: 'Dr. Smitha Pai is a skilled ophthalmologist with expertise in corneal diseases, LASIK, and cataract surgeries.',
    languages: ['Kannada', 'English'],
    consultationFee: 700,
    rating: 4.7,
    totalReviews: 145,
    onlineConsultation: true,
    bookingLink: 'https://www.practo.com/doctors/ophthalmologists'
  },
  {
    name: 'Dr. Chandrashekar',
    specialization: 'Gastroenterologist',
    qualification: 'MD, DM Gastroenterology',
    experience: 12,
    hospitalIndex: 8,
    city: 'Bangalore',
    bio: 'Dr. Chandrashekar is a gastroenterologist specializing in liver diseases, IBD, and therapeutic endoscopy.',
    languages: ['Kannada', 'English', 'Hindi'],
    consultationFee: 900,
    rating: 4.6,
    totalReviews: 112,
    onlineConsultation: false,
    bookingLink: 'https://www.practo.com/doctors/gastroenterologists'
  },
  {
    name: 'Dr. Divya Krishnan',
    specialization: 'Endocrinologist',
    qualification: 'MD, DM Endocrinology',
    experience: 7,
    hospitalIndex: 6,
    city: 'Bangalore',
    bio: 'Dr. Divya Krishnan is a young and dynamic endocrinologist with expertise in diabetes, thyroid, and hormonal disorders.',
    languages: ['English', 'Hindi', 'Kannada'],
    consultationFee: 650,
    rating: 4.5,
    totalReviews: 89,
    onlineConsultation: true,
    bookingLink: 'https://www.practo.com/doctors/endocrinologists'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Connected to database');
    
    await Hospital.deleteMany({});
    console.log('Cleared hospitals');
    
    await Doctor.deleteMany({});
    console.log('Cleared doctors');
    
    const hospitalDocs = await Hospital.insertMany(hospitals);
    console.log(`Inserted ${hospitalDocs.length} hospitals`);
    
    const doctorsToInsert = doctorData.map(doc => ({
      ...doc,
      hospital: hospitalDocs[doc.hospitalIndex]._id,
      availableSlots: generateSlots(7),
      isAvailable: true
    }));
    
    const doctorDocs = await Doctor.insertMany(doctorsToInsert);
    console.log(`Inserted ${doctorDocs.length} doctors`);
    
    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();