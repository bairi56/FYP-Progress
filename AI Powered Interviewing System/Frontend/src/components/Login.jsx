import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const checkRecruiterStatus = async (accessToken) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/authentication/check-recruiter-status/",
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      return response.data.is_recruiter;
    } catch (err) {
      console.error("Error checking recruiter status", err);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/authentication/token/",
        {
          username,
          password,
        }
      );
      
      // Store tokens
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      
      // Check if user is a recruiter
      const isRecruiter = await checkRecruiterStatus(response.data.access);
      
      // Redirect based on recruiter status
      if (isRecruiter) {
        navigate("/interview");
      } else {
        navigate("/NewsPage");
      }
      
      // alert("Logged in successfully");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  const handleBack=()=>{
    navigate('/')
  }
  // Inline styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "103vw",
    // backgroundColor: "#f0f2f5",
    backgroundImage: "url('https://c1.wallpaperflare.com/preview/185/114/349/business-man-laptop-work-outdoor.jpg')", // Replace with your image path
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const formStyle = {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    position: "relative", // Needed to center the form in flex

  };

  const headingStyle = {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    // marginBottom:'2px'
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Ensures the wrapper takes the entire screen height
  };
  const linkStyle = {
    color: "#4caf50",
    textDecoration: "none",
    fontWeight: "bold",
  };
  const backButton= {
    top:'5px',
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: 'black',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '280px',
    
  };

  return (
    
    <div style={containerStyle}>
      <button style={backButton} onClick={handleBack}>
          <span>←</span> Home
        </button>
      <div style={wrapperStyle}>
      <form
        style={formStyle}
        onSubmit={handleLogin}
      >
        <h2 style={headingStyle}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
        >
          Login
        </button>
        <p style={{ textAlign: "center", color: "#888" , marginTop:'25px'}}>
          Don't have an account?{" "}
          <a href="/signup" style={linkStyle}>
            Sign up here
          </a>
        </p>
      </form>
    </div>
    </div>
  );
};

export default Login;
