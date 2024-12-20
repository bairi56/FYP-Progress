import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false); // State for tracking hover

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    
    fetch('http://127.0.0.1:8000/api/job_posting/publicposts/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      return response.json();
    })
    .then((data) => {
      setJobs(data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  const handleApplyJob = (job) => {
    navigate('/application-form', { state: { jobData: job }  });
  };

  const handleMouseEnter = () => {
    setIsHovered(true); // Set hover to true on mouse enter
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Set hover to false on mouse leave
  };
  const handleBack = () => {
    navigate('/NewsPage'); // Go back to the previous page
  };

  if (loading) {
    return <p style={styles.loadingText}>Loading jobs...</p>;
  }

  if (error) {
    return <p style={styles.errorText}>Error: {error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.pageTitle}>All Job Postings</h2>
      {/* Back Button */}
      <button 
        style={styles.backButton}
        onClick={handleBack}
      >
        Back
      </button>
      {jobs.length > 0 ? (
        <div style={styles.gridContainer}>
          {jobs.map((job) => (
            <div key={job.id} style={styles.card}>
              <h3 style={styles.jobTitle}>Job Title: {job.title}</h3>
              <p style={styles.jobText}><strong>Description:</strong> {job.description}</p>
              <p style={styles.jobText}><strong>Skills:</strong> {job.skills.join(', ')}</p>
              <p style={styles.jobText}><strong>Experience Level:</strong> {job.experience_level}</p>
              
              <button
                style={isHovered ? { ...styles.viewButton, ...styles.viewButtonHover } : styles.viewButton}
                onClick={() => handleApplyJob(job)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noJobsText}>No jobs available.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px', // Space within the container
    paddingTop: '20px', // Adjust top padding to account for NavBar height
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
  },
  pageTitle: {
    fontSize: '28px',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive grid
    gap: '20px',
    padding: '10px',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  jobTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  jobText: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
  },
  viewButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
  },
  viewButtonHover: {
    backgroundColor: '#0056b3',
  },
  loadingText: {
    fontSize: '18px',
    color: '#777',
    textAlign: 'center',
  },
  errorText: {
    fontSize: '18px',
    color: 'red',
    textAlign: 'center',
  },
  noJobsText: {
    fontSize: '18px',
    color: '#777',
    textAlign: 'center',
  },
  backButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
};


export default AllPosts;
