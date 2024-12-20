import React from 'react';
import './LandingPage.css';
import interviewerImg from '../assets/interviewer.png';
import AIInterviewer from '../assets/AIInterviewer.jpg';
import { useNavigate } from 'react-router-dom';
import RecruiterAccessButton from "./RecruiterAccessButton"; // Import the button component
import { FaBroadcastTower, FaRegClipboard, FaMicrophoneAlt, FaBrain } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa'; // Importing a professional logo icon from react-icons
const LandingPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  const handleSignup = () => {
    navigate('/signup');
  };
  return (
    <div className="app">
      <header className="header">
          <div className="logo-title">
          <div className="logo">
            <FaUserTie size={30} color="#007bff" /> {/* React logo added */}
            </div>
            <h1 style={{color:'black'}}>TalentScout</h1>
        </div>
        <nav className="navbar">
          <button className="nav-button" onClick={handleSignup}>Signup</button>
          <button className="nav-button" onClick={handleLogin}>Login</button>
          <button className="nav-button recruiter" onClick={handleLogin}>Join as Recruiter</button>
        </nav>
      </header>

      <main className="main">
        <div className="left-content">
          <h2 className="heading">From Search <br />to Success... <br />TalentScout <br /> Delivers.</h2>
          <p className="subtext">
            We deliver Precision Hiring for<br />a Recruiters and  Stage for Candidates.
          </p>
          <div className="buttons">
            <button className="find-more">Find Out More</button>
            <button className="play-demo">
              <span className="play-icon">▶</span> Play Demo
            </button>
          </div>
        </div>

        <div className="right-content">
          <div className="image-container">
            <img src={interviewerImg} alt="Man with Robot" className="image" />
            <img src={AIInterviewer} alt="AI Interviewer" className="image" />
          </div>
        </div>
      </main>

      <section className="services">
        <h1 className="category">Category</h1>
        <h3 className="services-heading">We Offer Best Services</h3>
        <div className="service-list">
          <div className="service-item">
            <div className="service-icon"><FaBroadcastTower /></div>
            <h4>Posts Broadcast</h4>
            <p>Effortlessly create job posts and share widely.</p>
          </div>
          <div className="service-item">
            <div className="service-icon"><FaRegClipboard /></div>
            <h4>Easy Apply</h4>
            <p>Candidates can apply seamlessly with intuitive workflows.</p>
          </div>
          <div className="service-item">
            <div className="service-icon"><FaMicrophoneAlt /></div>
            <h4>Vocal Interaction</h4>
            <p>Revolutionize hiring with voice-enabled tools.</p>
          </div>
          <div className="service-item">
            <div className="service-icon"><FaBrain /></div>
            <h4>Intelligent Decisions</h4>
            <p>AI-powered scoring for informed decisions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
