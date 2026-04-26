import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, Activity, Heart, Pill, Calendar, FileText, 
  MessageCircle, Phone, MapPin, Clock, Star, CheckCircle, AlertCircle,
  Send, Copy, Mic, MicOff, Loader
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ai } from '../utils/api';

const AIChatBot = ({ minimized = false, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m MediCare AI. How can I help you with your health today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const quickTopics = [
    'General Health', 'Medications', 'Diet & Nutrition', 'Mental Health'
  ];

  const suggestions = [
    'What are symptoms of diabetes?',
    'Home remedy for cold?',
    'Is this medication safe?',
    'Diet for high BP?'
  ];

  const sendMessage = async (text = input) => {
    if (!text.trim() || loading) return;
    
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await ai.chat({ messages: [...messages, userMsg] });
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.message }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I\'m here to help! For any health concerns, please consult a qualified doctor. Can you tell me more about what you\'re looking for?' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`glass-card rounded-card ${minimized ? 'p-3' : 'p-4'}`}>
      {!minimized && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-btn flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm">MediCare AI</h3>
              <p className="text-xs text-success flex items-center gap-1"><span className="w-1.5 h-1.5 bg-success rounded-full"></span> Online</p>
            </div>
          </div>
          {onClose && <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><Stethoscope className="w-4 h-4" /></button>}
        </div>
      )}

      {minimized ? (
        <button onClick={onClose} className="flex items-center gap-2 text-primary">
          <MessageCircle className="w-5 h-5" /> Chat with AI
        </button>
      ) : (
        <>
          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar mb-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <Loader className="w-5 h-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {suggestions.map(s => (
              <button key={s} onClick={() => sendMessage(s)} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors">{s}</button>
            ))}
          </div>

          <div className="flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type your message..." className="flex-1 p-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="p-2 gradient-btn rounded-lg disabled:opacity-50"><Send className="w-4 h-4" /></button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default AIChatBot;