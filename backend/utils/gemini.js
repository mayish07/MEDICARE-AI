const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;
let model = null;

const initializeGemini = () => {
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('Gemini AI initialized');
  } else {
    console.log('Gemini API key not configured');
  }
  return { genAI, model };
};

const getGeminiModel = () => {
  if (!model) {
    initializeGemini();
  }
  return model;
};

module.exports = {
  initializeGemini,
  getGeminiModel
};