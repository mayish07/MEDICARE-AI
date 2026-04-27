const asyncHandler = require('express-async-handler');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) 
  : null;

const sendEmail = require('../utils/sendEmail');

const symptomChecker = asyncHandler(async (req, res) => {
  const { symptoms, duration, severity, age, gender, existingConditions, medications } = req.body;

  if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
    res.status(400);
    throw new Error('Please provide an array of symptoms');
  }

  if (!genAI) {
    res.status(503);
    throw new Error('AI service is not configured');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const patientInfo = [];
  if (age) patientInfo.push(`Age: ${age}`);
  if (gender) patientInfo.push(`Gender: ${gender}`);
  if (existingConditions?.length) patientInfo.push(`Existing conditions: ${existingConditions.join(', ')}`);
  if (medications) patientInfo.push(`Current medications: ${medications}`);

  const prompt = `You are a medical AI assistant. User has these symptoms: ${symptoms.join(', ')}.
${duration ? `Duration: ${duration}` : ''}
${severity ? `Severity: ${severity}` : ''}
${patientInfo.length > 0 ? patientInfo.join('. ') : ''}

Analyze and provide: 
1) Possible conditions (list 3-5 with brief explanation each) 
2) Urgency level: LOW, MEDIUM, HIGH, or EMERGENCY
3) Recommended specialist type (like Cardiologist, Neurologist, General Physician, etc.)
4) Home remedies if applicable (max 3-4 bullet points)
5) Warning signs to watch for (max 3-4 bullet points)

Format response as clean JSON with keys exactly: 
conditions (array of objects with name and description), urgency, specialist, homeRemedies, warnings.
Be helpful but ALWAYS recommend consulting a real doctor. Start response with "{"conditions":`
  ;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    let parsedResponse;
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found');
      }
    } catch (parseError) {
      parsedResponse = {
        conditions: [
          { name: 'Possible Viral Infection', description: 'Common symptoms could be due to a viral infection. Rest and hydration recommended.' },
          { name: 'Seasonal Allergies', description: 'Symptoms may be related to environmental allergens.' },
          { name: 'Common Cold', description: 'Upper respiratory infection causing these symptoms.' }
        ],
        urgency: 'LOW',
        specialist: 'General Physician',
        homeRemedies: ['Rest adequately', 'Stay hydrated', 'Take warm fluids'],
        warnings: ['If symptoms worsen, consult a doctor', 'High fever requires immediate attention']
      };
    }

    res.json({
      success: true,
      result: parsedResponse
    });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500);
    throw new Error('Failed to analyze symptoms');
  }
});

const aiChat = asyncHandler(async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    res.status(400);
    throw new Error('Please provide messages array');
  }

  if (!genAI) {
    res.status(503);
    throw new Error('AI service is not configured');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const systemPrompt = `You are MediCare AI, a friendly medical assistant for Indian users in Mangalore and Bangalore. You help with health queries, medication info, diet advice, and wellness tips. Always recommend consulting a qualified doctor for serious concerns. Be warm, clear, and helpful. Use simple language.`;

  const chatMessages = messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  const prompt = `${systemPrompt}\n\nUser message: ${messages[messages.length - 1]?.content || ''}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({
      success: true,
      message: response,
      role: 'assistant'
    });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500);
    throw new Error('Failed to get AI response');
  }
});

module.exports = {
  symptomChecker,
  aiChat
};