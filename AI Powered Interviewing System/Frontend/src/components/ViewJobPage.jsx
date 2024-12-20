import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosConfig';
import { 
  Lock as LockIcon, 
  Unlock as UnlockIcon, 
  Edit as EditIcon, 
  Trash2 as DeleteIcon 
} from 'lucide-react';

const AllJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    const accessToken = localStorage.getItem('access');

    axiosInstance.get('job_posting/jobposts/')
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleCheckApplicants = (job) => {
    navigate('/job-applicants', { state: { job } });
  };

  const handleEditJob = (job) => {
    setEditingJob({
      ...job,
      skills: Array.isArray(job.skills) ? job.skills.join(', ') : job.skills
    });
  };

  const handleSaveEdit = async () => {
    try {
      // Prepare the job data for update
      const updateData = {
        ...editingJob,
        // Convert skills back to an array if needed
        skills: editingJob.skills.split(',').map(skill => skill.trim())
      };

      await axiosInstance.patch(`job_posting/jobposts/${editingJob.id}/`, updateData);
      fetchJobs();
      setEditingJob(null);
    } catch (err) {
      console.error('Error updating job:', err);
      alert('Failed to update job');
    }
  };

  const handleTogglePrivacy = async (job) => {
    try {
      await axiosInstance.patch(`job_posting/jobposts/${job.id}/`, {
        is_private: !job.is_private
      });
      fetchJobs();
    } catch (err) {
      console.error('Error toggling job privacy:', err);
      alert('Failed to update job privacy');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await axiosInstance.delete(`job_posting/jobposts/${jobId}/`);
        fetchJobs();
      } catch (err) {
        console.error('Error deleting job:', err);
        alert('Failed to delete job');
      }
    }
  };

  const renderJobCard = (job) => {
    // Experience level options
    const experienceLevels = [
      'Entry Level', 
      'Mid Level', 
      'Senior Level', 
      'Executive Level', 
      'Internship'
    ];

    // If editing this job, show edit form
    if (editingJob && editingJob.id === job.id) {
      return (
        <div key={job.id} style={styles.editCard}>
          <input
            style={styles.editInput}
            value={editingJob.title}
            onChange={(e) => setEditingJob({...editingJob, title: e.target.value})}
            placeholder="Job Title"
          />
          <textarea
            style={styles.editTextarea}
            value={editingJob.description}
            onChange={(e) => setEditingJob({...editingJob, description: e.target.value})}
            placeholder="Job Description"
          />
          <input
            style={styles.editInput}
            value={editingJob.skills}
            onChange={(e) => setEditingJob({...editingJob, skills: e.target.value})}
            placeholder="Skills (comma-separated)"
          />
          <select
            style={styles.editSelect}
            value={editingJob.experience_level}
            onChange={(e) => setEditingJob({...editingJob, experience_level: e.target.value})}
          >
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <div style={styles.editButtonContainer}>
            <button style={styles.saveButton} onClick={handleSaveEdit}>Save</button>
            <button style={styles.cancelButton} onClick={() => setEditingJob(null)}>Cancel</button>
          </div>
        </div>
      );
    }

    // Regular job card view
    return (
      
      <div key={job.id} style={styles.card}>
        <div style={styles.jobHeaderContainer}>
          <h3 style={styles.jobTitle}>Title: {job.title}</h3>
          <div style={styles.iconContainer}>
            <button 
              style={styles.iconButton} 
              onClick={() => handleTogglePrivacy(job)}
              title={job.is_private ? "Make Public" : "Make Private"}
            >
              {job.is_private ? <LockIcon size={20} color="red" /> : <UnlockIcon size={20} color="green" />}
            </button>
          </div>
        </div>
        <p style={styles.jobText}><strong>Description:</strong> {job.description}</p>
        <p style={styles.jobText}><strong>Skills:</strong> {Array.isArray(job.skills) ? job.skills.join(', ') : job.skills}</p>
        <p style={styles.jobText}><strong>Experience Level:</strong> {job.experience_level}</p>
        <div style={styles.buttonContainer}>
          <button
            style={styles.viewButton}
            onClick={() => handleEditJob(job)}
          >
            <EditIcon size={16} /> Edit
          </button>

          <button
            style={styles.viewButton}
            onClick={() => handleDeleteJob(job.id)}
          >
            <DeleteIcon size={16} /> Delete
          </button>

          <button
            style={styles.viewButton}
            onClick={() => handleCheckApplicants(job)}
          >
            Check Applicants
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return <p style={styles.loadingText}>Loading jobs...</p>;
  }

  if (error) {
    return <p style={styles.errorText}>Error: {error}</p>;
  }

  return (
    <div style={styles.container}>
    {/* Back Button */}
    <button style={styles.backButton} onClick={() => navigate('/interview')}>
      Go Back
    </button>
    <div style={styles.container}>
      <h2 style={styles.pageTitle}>Your All Posted Jobs</h2>
      {jobs.length > 0 ? (
        <div style={styles.gridContainer}>
          {jobs.map(renderJobCard)}
        </div>
      ) : (
        <p style={styles.noJobsText}>No jobs available.</p>
      )}
    </div>
    </div>

  );
  
};
const styles = {
  container: {
    padding: '20px',
    paddingTop: '20px',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  },
  viewButton: {
    padding: '8px 15px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
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
  jobHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
  },
  editCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  editInput: {
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  editTextarea: {
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minHeight: '100px',
  },
  editButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    editSelect: {
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%',
    },
    backButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px',
    },
    
  },
};

export default AllJobsPage;
