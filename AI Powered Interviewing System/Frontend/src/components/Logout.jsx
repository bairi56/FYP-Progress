import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

        useEffect(() => {
          const confirmLogout = window.confirm("Are you sure you want to log out?");
          console.log('done')

          if (confirmLogout) {
              console.log('done')
              localStorage.clear(); // Clear all localStorage, including access and refresh tokens
              alert("Logged out successfully");
              navigate("/");
          } else {
              navigate("/");
              console.log('else done')

          }
      }, [navigate]);


  // Inline styles (same as login, signup, and logout with confirmation)
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  };

  const messageStyle = {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  };

  const headingStyle = {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  };

  const buttonStyle = {
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

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>
        <h2 style={headingStyle}>Logging out...</h2>
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
          onClick={() => navigate("/login")}
        >
          Cancel Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
