import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from './axiosConfig';

const ApplicantsDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get job details from navigation state
  const job = location.state?.job;

  useEffect(() => {
    // If no job was passed via state, redirect back to job listings
    if (!job) {
      navigate('/view-job');
      return;
    }

    const fetchApplicants = async () => {
      try {
        // Fetch applicants for this specific job
        const applicantsResponse = await axiosInstance.get(`job_posting/job/${job.id}/applicants/`);
        setApplicants(applicantsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching applicants:', err);
        setError('Failed to load applicants');
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [job, navigate]);

  const handleBack = () => {
    navigate('/view-job');
  };

  const handleViewApplicantDetails = (applicant) => {
    navigate('/applicant-profile', { state: { applicant } });
  };

  // Handle case where no job is passed
  if (!job) {
    return <div style={styles.errorContainer}>No job selected</div>;
  }

  if (loading) return <div style={styles.loadingContainer}>Loading applicants...</div>;
  if (error) return <div style={styles.errorContainer}>{error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <button onClick={handleBack} style={styles.backButton}>← Back to Jobs</button>
        <h1 style={styles.pageTitle}>Applicants for {job.title}</h1>
      </div>

      {applicants.length === 0 ? (
        <div style={styles.noApplicantsContainer}>
          <p>No applicants have applied for this job yet.</p>
        </div>
      ) : (
        <div style={styles.applicantsGrid}>
          {applicants.map((applicant) => (
            <div key={applicant.id} style={styles.applicantCard}>
              <h3 style={styles.applicantName}>{applicant.full_name}</h3>
              <div style={styles.applicantDetails}>
                <p><strong>Email:</strong> {applicant.email}</p>
                <p><strong>Qualification:</strong> {applicant.qualification}</p>
                <p><strong>Applied At:</strong> {new Date(applicant.applied_at).toLocaleString()}</p>
                <p><strong>Marks:</strong> {applicant.marks || 'Not provided'}</p>
              </div>
              <div style={styles.actionButtons}>
              <button 
                style={styles.viewDetailsButton}
                onClick={() => handleViewApplicantDetails(applicant)}
              >
                View Full Profile
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
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
  applicantsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  applicantCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  applicantName: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#333',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  },
  applicantDetails: {
    marginBottom: '15px',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
  },
  viewDetailsButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
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
  noApplicantsContainer: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#777',
  },
};

export default ApplicantsDetailsPage;