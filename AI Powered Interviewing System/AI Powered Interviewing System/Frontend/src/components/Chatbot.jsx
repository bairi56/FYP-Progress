import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Initialize Speech Recognition and Speech Synthesis
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechRecognizer = recognition ? new recognition() : null;

  let silenceTimeout; // Timer for silence

  const handleVoiceInput = () => {
    if (!speechRecognizer) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }
  
    if (isListening) {
      // Manually stop listening
      speechRecognizer.stop();
      clearTimeout(silenceTimeout);
      setIsListening(false);
      console.log('Stopped by user.');
    } else {
      setIsListening(true);
      speechRecognizer.continuous = true; // Keep listening indefinitely
      speechRecognizer.interimResults = true; // Allow processing partial results
      speechRecognizer.start();
  
      console.log('Listening...');
  
      // Handle result
      speechRecognizer.onresult = (event) => {
        clearTimeout(silenceTimeout); // Reset the silence timeout when user speaks
  
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
  
        setInput(transcript); // Update input with transcribed text
        console.log('User said:', transcript);
  
        // Restart silence timeout
        silenceTimeout = setTimeout(() => {
          speechRecognizer.stop();
          setIsListening(false);
          console.log('Stopped due to inactivity (silence).');
        }, 10000); // 10-second silence timeout
      };
  
      // Handle end of speech detection
      speechRecognizer.onspeechend = () => {
        console.log('Speech ended.');
        clearTimeout(silenceTimeout);
        silenceTimeout = setTimeout(() => {
          speechRecognizer.stop();
          setIsListening(false);
          console.log('Stopped due to inactivity (silence).');
        }, 10000); // Restart the silence timeout
      };
  
      // Handle errors
      speechRecognizer.onerror = (error) => {
        console.error('Speech Recognition Error:', error);
        setIsListening(false);
        clearTimeout(silenceTimeout);
      };
  
      // Reset timeout if any error occurs
      speechRecognizer.onend = () => {
        if (isListening) {
          // Restart recognition for continuous listening
          console.log('Restarting listener...');
          speechRecognizer.start();
        }
      };
    }
  };
  

  const speak = (text) => {
    if (!window.speechSynthesis) {
      alert('Speech Synthesis not supported in this browser.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Customize the speech properties
    utterance.lang = 'en-GB'; // British English accent
    utterance.rate = 0.9; // Slower than the default speed
    utterance.pitch = 1; // Normal pitch
    utterance.volume = 1; // Maximum volume

    // Find a preferred voice (e.g., a British or other natural-sounding voice)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (voice) => voice.lang === 'en-GB' && voice.name.includes('Female') // Adjust as needed
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    // Add the user's message to the conversation
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    try {
      // Send the message to the backend API
      const response = await axios.post('http://localhost:8000/api/chatbot/response/', { message: input });
      const assistantMessage = response.data.response;

      // Add the assistant's response to the conversation
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: assistantMessage }
      ]);

      // Speak the assistant's response
      speak(assistantMessage);
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1>AI Interview Chatbot</h1>
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
              className="chatbot-mic"
              type="button"
              onClick={handleVoiceInput}
              title="Speak now"
            >
              🎤
            </button>
          </div>
        </form>

        <button
          className="voice-button"
          onClick={handleVoiceInput}
          style={{
            padding: '10px',
            backgroundColor: isListening ? '#FF5733' : '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            marginTop: '10px',
            cursor: 'pointer',
          }}
        >
          {isListening ? 'Mute' : 'Unmute'}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
