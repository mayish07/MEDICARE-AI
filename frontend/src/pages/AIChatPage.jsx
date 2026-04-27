import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Send, Loader, Copy, Mic, MicOff, MessageCircle, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ai } from '../utils/api';
import { useAuth } from '../hooks/useAuth';

const AIChatPage = () => {
  const [messages, setMessages] = useState([{ role: 'assistant', content: "Hello! I'm MediCare AI. How can I help you with your health today?" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEnd = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    try {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    } catch (e) {}
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const suggestions = [
    'What are symptoms of diabetes?',
    'Home remedy for cold?',
    'Is this medication safe?',
    'Diet for high BP?',
    'How to improve immunity?',
    'Healthy sleep tips'
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
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I\'m having trouble responding right now. For medical concerns, please consult a qualified doctor.' }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: 'Hello! I\'m MediCare AI. How can I help you with your health today?' }]);
    localStorage.removeItem('chatHistory');
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied!');
  };

  // Simple speech recognition
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      recognition.start();
    } else {
      toast.error('Voice input not supported');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-btn flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-heading font-bold">MediCare AI Chat</h1>
                <p className="text-sm text-success flex items-center gap-1"><span className="w-2 h-2 bg-success rounded-full"></span> Online</p>
              </div>
            </div>
            <button onClick={clearChat} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><X className="w-5 h-5" /></button>
          </div>

          <div className="glass-card rounded-card p-4" style={{ minHeight: '500px' }}>
            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'gradient-btn text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <div className="flex justify-end mt-2">
                      <button onClick={() => copyMessage(msg.content)} className={`p-1 rounded ${msg.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}><Copy className="w-3 h-3" /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <Loader className="w-5 h-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
              <div ref={messagesEnd} />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {suggestions.map(s => (
                <button key={s} onClick={() => sendMessage(s)} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors">{s}</button>
              ))}
            </div>

            <div className="flex gap-2">
              <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Ask me anything about your health..." className="flex-1 p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800" />
              <button onClick={startListening} className={`p-3 rounded-lg ${isListening ? 'bg-danger text-white animate-pulse' : 'bg-gray-100 dark:bg-gray-800'}`}>
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="p-3 gradient-btn rounded-lg disabled:opacity-50"><Send className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AIChatPage;