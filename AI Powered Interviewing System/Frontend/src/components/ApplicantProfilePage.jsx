import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from './axiosConfig';

const ApplicantProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [applicantDetails, setApplicantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get applicant from navigation state
  const applicant = location.state?.applicant;

  useEffect(() => {
    // If no applicant was passed via state, redirect back to job applicants
    if (!applicant) {
      navigate('/view-job');
      return;
    }

    const fetchApplicantDetails = async () => {
      try {
        // Fetch full applicant details
        const response = await axiosInstance.get(`job_posting/applicant/${applicant.id}/`);
        setApplicantDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching applicant details:', err);
        setError('Failed to load applicant profile');
        setLoading(false);
      }
    };

    fetchApplicantDetails();
  }, [applicant, navigate]);

  const handleBack = () => {
    navigate(-1); // Navigate back to previous page
  };

  

  // Handle case where no applicant is passed
  if (!applicant) {
    return <div style={styles.errorContainer}>No applicant selected</div>;
  }

  if (loading) return <div style={styles.loadingContainer}>Loading applicant profile...</div>;
  if (error) return <div style={styles.errorContainer}>{error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <button onClick={handleBack} style={styles.backButton}>← Back</button>
        <h1 style={styles.pageTitle}>Applicant Profile</h1>
      </div>

      <div style={styles.profileContainer}>
        <div style={styles.profileHeader}>
          <h2 style={styles.applicantName}>{applicantDetails.full_name}</h2>
          <p style={styles.applicantEmail}>{applicantDetails.email}</p>
        </div>

        <div style={styles.profileSection}>
          <h3 style={styles.sectionTitle}>Personal Information</h3>
          <div style={styles.infoGrid}>
            <div>
              <strong>Qualification:</strong> {applicantDetails.qualification}
            </div>
            <div>
              <strong>Applied At:</strong> {new Date(applicantDetails.applied_at).toLocaleString()}
            </div>
            <div>
              <strong>Marks:</strong> {applicantDetails.marks || 'Not provided'}
            </div>
          </div>
        </div>

        <div style={styles.profileSection}>
          <h3 style={styles.sectionTitle}>Application Details</h3>
          <div style={styles.infoGrid}>
            <div>
              <strong>Job Applied:</strong> {applicantDetails.job_title}
            </div>
            <div>
              <strong>Application Status:</strong> {applicantDetails.status || 'Under Review'}
            </div>
          </div>
        </div>

        {applicantDetails.resume && (
          <div style={styles.profileSection}>
            <h3 style={styles.sectionTitle}>Resume</h3>
            <div style={styles.resumeSection}>
              <a 
                href={applicantDetails.resume} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.resumeLink}
              >
                View Resume
              </a>
            </div>
          </div>
        )}

        <div style={styles.actionButtons}>
          <button style={styles.shortlistButton}>Shortlist</button>
          <button style={styles.rejectButton}>Reject</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  backButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    marginRight: '15px',
    cursor: 'pointer',
  },
  pageTitle: {
    fontSize: '24px',
    color: '#333',
    margin: 0,
  },
  profileContainer: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  profileHeader: {
    textAlign: 'center',
    borderBottom: '1px solid #eee',
    paddingBottom: '20px',
    marginBottom: '20px',
  },
  applicantName: {
    fontSize: '24px',
    color: '#333',
    margin: '0 0 10px 0',
  },
  applicantEmail: {
    color: '#777',
    margin: 0,
  },
  profileSection: {
    marginBottom: '25px',
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#333',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    marginBottom: '15px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
    color:'black'
  },
  resumeSection: {
    textAlign: 'center',
  },
  resumeLink: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    textDecoration: 'none',
    display: 'inline-block',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '25px',
  },
  shortlistButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  rejectButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
  },
  errorContainer: {
    textAlign: 'center',
    color: 'red',
    padding: '50px',
    fontSize: '18px',
  },
};

export default ApplicantProfilePage;