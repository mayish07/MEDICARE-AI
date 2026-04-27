const express = require('express');
const router = express.Router();

// AI Symptom Checker (static responses)
router.post('/symptom-checker', (req, res) => {
  const { symptoms } = req.body;
  const hasEmergency = symptoms?.some(s => ['chest pain', 'heart attack', 'stroke', 'severe bleeding'].some(e => s.toLowerCase().includes(e)));
  
  res.json({
    success: true,
    result: {
      conditions: [
        { name: 'Common Cold / Viral Infection', description: 'Most common cause of these symptoms. Rest and hydration recommended.' },
        { name: 'Seasonal Allergies', description: 'Could be due to environmental allergens.' },
        { name: 'Stress-related symptoms', description: 'Could be related to stress or fatigue.' }
      ],
      urgency: hasEmergency ? 'EMERGENCY' : 'LOW',
      specialist: 'General Physician',
      homeRemedies: ['Rest adequately', 'Stay hydrated', 'Take warm fluids', 'Avoid cold drinks'],
      warnings: ['If symptoms worsen, consult a doctor', 'High fever requires attention']
    }
  });
});

// AI Chat (static responses)
router.post('/chat', (req, res) => {
  const { messages } = req.body;
  const lastMsg = messages?.[messages.length - 1]?.content?.toLowerCase() || '';
  
  let response = "I'm here to help! For medical concerns, please consult a qualified doctor. How can I assist you today?";
  
  if (lastMsg.includes('diabetes')) response = "Diabetes symptoms include increased thirst, frequent urination, and fatigue. It's important to get blood tests done. Consult an endocrinologist for proper diagnosis.";
  else if (lastMsg.includes('cold') || lastMsg.includes('cough')) response = "For cold: rest, stay hydrated, warm fluids. If fever lasts more than 3 days, see a doctor.";
  else if (lastMsg.includes('bp') || lastMsg.includes('blood pressure')) response = "High BP often has no symptoms. Reduce salt intake, exercise regularly, and consult a cardiologist.";
  else if (lastMsg.includes('fever')) response = "For fever: take paracetamol, rest, stay hydrated. If fever exceeds 102°F for more than 2 days, consult a doctor.";
  else if (lastMsg.includes('headache')) response = "Headaches can be due to stress, lack of sleep, or dehydration. Rest in a dark room. If severe or persistent, consult a doctor.";
  
  res.json({ success: true, message: response, role: 'assistant' });
});

module.exports = router;