import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if access token exists in localStorage
    const checkAuthStatus = () => {
      const accessToken = localStorage.getItem('access');
      setIsAuthenticated(!!accessToken);
    };

    // Check authentication status immediately
    checkAuthStatus();

    // Optional: Add event listener to check auth status across tabs
    window.addEventListener('storage', checkAuthStatus);

    // Cleanup event listener
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setIsAuthenticated(false);
      // alert("Logged out successfully");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="container nav_bar" data-aos="fade-down" data-aos-duration="1000">
        <div className="left nav_items">AIQuest Interviews</div>
        <div className="right">
          {/* <Link to="/demo" className="nav_items">Interview Demo</Link> */}
          {/* <Link to="/Chatbot" className="nav_items"> Start Interview</Link> */}
          <Link to="/view-job" className="nav_items">All Posts</Link>
          {/* <Link to="/application-form" className="nav_items">Apply</Link> */}
          <Link to="/JobPosting" className="nav_items">Post</Link>
          {/* <Link to="/question-generation" className="nav_items">Generate Questions</Link> */}
          {/* <Link to="/ner" className="nav_items">NLU</Link> */}
          
          {/* Conditionally render Login and Signup buttons */}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="nav_items">Login</Link>
              <Link to="/signup" className="nav_items">Signup</Link>
            </>
          )}
          
          {/* Conditionally render Logout button */}
          {isAuthenticated && (
            <button onClick={handleLogout} className="nav_items" style={{background: 'none', border: 'none', cursor: 'pointer'}}>
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;