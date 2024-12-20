import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"; // Import styled-component

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleBackButton=()=>{
    navigate('/')
  }
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate that password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Remove any existing tokens before signup
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');

      const response = await axios.post("http://localhost:8000/api/authentication/register/", {
        username,
        email,
        password,
        confirmPassword,
      });
      
      alert("Signup successful");
      navigate("/NewsPage"); // Redirect to login after successful signup
    } catch (err) {
      console.error("Signup error:", err.response ? err.response.data : err);
      alert("Signup failed. " + (err.response?.data?.error || "Please try again."));
    }
    
  };

  return (
    <SignupContainer>
      <button style={backButton} onClick={handleBackButton}>
        <span>←</span> Home
      </button>
      <SignupForm onSubmit={handleSignup}>
      <h2 style={headingStyle}>Signup</h2>
      <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit">Signup</Button>
        <p style={{ textAlign: "center", color: "#888",marginTop:"20px" }}>
          Already have an account?{" "}
          <a href="/login" style={linkStyle}>
            Login here
          </a>
        </p>
      </SignupForm>
      
    </SignupContainer>
  );
};

export default Signup;

// Styled Components

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full screen height */
  width: 100vw; /* Full screen width */
  background-image: url("https://tse2.mm.bing.net/th?id=OIG2.T7B7p3psM6pNsE3XAEdB&pid=ImgGn"); /* Replace with your desired image */
  background-size: cover; /* Ensures the image covers the entire container */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  position: absolute; /* Ensures it stretches across the entire viewport */
  top: 0;
  left: 0;
`;
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
  marginBottom: '400px',
  
};
const headingStyle = {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
    textAlign: "center",
  };
  
const SignupForm = styled.form`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const linkStyle = {
    color: "#4caf50",
    textDecoration: "none",
    fontWeight: "bold",
  };

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }
`;
