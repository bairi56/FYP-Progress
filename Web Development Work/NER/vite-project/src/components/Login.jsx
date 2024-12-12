import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      alert("Logged in successfully");
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  // Inline styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  };

  const formStyle = {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
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
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };

  const linkStyle = {
    color: "#4caf50",
    textDecoration: "none",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
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
        <p style={{ textAlign: "center", color: "#888" }}>
          Don't have an account?{" "}
          <a href="/signup" style={linkStyle}>
            Sign up here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
