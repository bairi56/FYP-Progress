import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('chatbot_user_id') || null);

  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-GB';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSubmit(new Event('submit'));
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      synthesisRef.current = voices.find(
        voice => voice.lang === 'en-GB' || voice.lang === 'en-US'
      );
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const speak = (text) => {
    if (!window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Adjust speed
    utterance.pitch = 1;  // Adjust pitch
    utterance.volume = 1; // Adjust volume

    // Select a female voice with an English accent
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
        voice =>
            (voice.lang === 'en-GB' || voice.lang === 'en-US') &&
            voice.name.toLowerCase().includes('female')
    );

    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
};


  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition not supported');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    let currentUserId = userId;
    if (!currentUserId) {
      currentUserId = Date.now().toString();
      setUserId(currentUserId);
      localStorage.setItem('chatbot_user_id', currentUserId);
    }

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const originalInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/chatbot/response/', { 
        message: originalInput,
        user_id: currentUserId 
      });

      const assistantMessage = response.data.response;
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);

      speak(assistantMessage);  // Speak the response after it’s fetched
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1>AI Powered Interview System</h1>
      </div>
      <div className="chatbot-body">
        <div className="chatbot-conversation">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.role === 'user' ? 'user' : 'assistant'}`}
            >
              {message.content}
            </div>
          ))}
          {loading && <div className="loading">...</div>}
        </div>
        <form className="chatbot-form" onSubmit={handleSubmit}>
          <textarea
            className="chatbot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message or use the mic..."
          />
          <div className="chatbot-actions">
            <button className="chatbot-submit" type="submit" disabled={loading}>
              Send
            </button>
            <button
              className={`chatbot-mic ${isListening ? 'active' : ''}`}
              type="button"
              onClick={handleVoiceInput}
              title="Voice Input"
            >
              🎤
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
