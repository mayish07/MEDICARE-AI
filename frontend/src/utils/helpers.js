export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const formatTime = (time) => {
  if (!time) return '';
  return time;
};

export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateAvatar = (name) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00B4D8&color=fff&size=150`;
};

export const getUrgencyColor = (urgency) => {
  switch (urgency?.toUpperCase()) {
    case 'LOW':
      return '#06D6A0';
    case 'MEDIUM':
      return '#FFB703';
    case 'HIGH':
      return '#FB8500';
    case 'EMERGENCY':
      return '#EF233C';
    default:
      return '#00B4D8';
  }
};

export const getUrgencyBg = (urgency) => {
  switch (urgency?.toUpperCase()) {
    case 'LOW':
      return 'bg-success/10 text-success';
    case 'MEDIUM':
      return 'bg-warning/10 text-warning';
    case 'HIGH':
      return 'bg-orange-500/10 text-orange-500';
    case 'EMERGENCY':
      return 'bg-danger/10 text-danger';
    default:
      return 'bg-primary/10 text-primary';
  }
};

export const SPECIALIZATIONS = [
  'General Physician',
  'Cardiologist',
  'Neurologist',
  'Orthopedic',
  'Pediatrician',
  'Dermatologist',
  'Gynecologist',
  'Urologist',
  'Gastroenterologist',
  'Pulmonologist',
  'Nephrologist',
  'Endocrinologist',
  'Oncologist',
  'Psychiatrist',
  'Ophthalmologist',
  'ENT',
  'Dentist',
  'Plastic Surgeon',
  'Radiologist',
  'Anesthesiologist'
];

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const RECORD_TYPES = ['Prescription', 'Lab Report', 'Scan', 'Vaccination', 'Other'];

export const CITY = { MANGALORE: 'Mangalore', BANGALORE: 'Bangalore' };