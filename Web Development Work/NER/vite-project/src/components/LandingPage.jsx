import React from 'react';
import './LandingPage.css';
import interviewerImg from '../assets/interviewer.png';
import AIInterviewer from '../assets/AIInterviewer.jpg';
const LandingPage = () => {
  return (
    <div className="app">
      <header className="header">
        <div className="logo-title">
          <div className="logo">[Logo]</div>
          <h1 style={{ color: 'black' }}>TalentScout</h1>
        </div>
        <nav className="navbar">
          <button className="nav-button">Signup</button>
          <button className="nav-button">Login</button>
          <button className="nav-button recruiter">Join as Recruiter</button>
        </nav>
      </header>

      <main className="main" >
        
        <div className="left-content">
          <h2 className="heading">From Search to Success... <br /> TalentScout Delivers.</h2>
          <p className="subtext">
            We deliver Precision Hiring for Recruiters and a Stage for Candidates.
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
          <img src={interviewerImg} alt="Man with Robot" className="image" style={{ marginLeft: '-180px' ,marginTop: '-40px' }} 
          />
          <img src={AIInterviewer} alt="AI Interviewer" className="image" style={{ marginLeft: '-100px' ,marginTop: '-40px' }} 
 />
        </div>
      </div>

      </main>

      <section className="services">
        <p className="category">Category</p>
        <h3 className="services-heading">We Offer Best Services</h3>
        <div className="service-list">
          <div className="service-item">
            <div className="service-icon">[Icon]</div>
            <h4>Posts Broadcast</h4>
            <p>Effortlessly create job posts and share widely.</p>
          </div>
          <div className="service-item">
            <div className="service-icon">[Icon]</div>
            <h4>Easy Apply</h4>
            <p>Candidates can apply seamlessly with intuitive workflows.</p>
          </div>
          <div className="service-item">
            <div className="service-icon">[Icon]</div>
            <h4>Vocal Interaction</h4>
            <p>Revolutionize hiring with voice-enabled tools.</p>
          </div>
          <div className="service-item">
            <div className="service-icon">[Icon]</div>
            <h4>Intelligent Decisions</h4>
            <p>AI-powered scoring for informed decisions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
