import { useNavigate } from 'react-router-dom'; // Import the navigation hook
import axiosInstance from './axiosConfig'; // Import the new axios instance

import React, { useEffect, useState } from 'react';



const Interview = () => {
  const navigate = useNavigate();
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      navigate('/login');
      return;
    }

    // Fetch job posts with applicants
    axiosInstance.get('job_posting/with_applicants/')
      .then(response => setJobPosts(response.data))
      .catch(error => {
        console.error('Error fetching job posts:', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          navigate('/login');
        }
      });
  }, [navigate]);

  const handleIconClick = () => {
    navigate('/JobPosting');
  };

  const handleIconPostClick = () => {
    navigate('/view-job');
  };

  return (
    <div style={styles.fullScreenContainer}>
      <div style={styles.container}>
        <nav style={styles.navbar}>
          <div style={styles.logo}>
            <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQn-Y-tmGd9D4jUPkCn1r-9HT209m8amljNVM8CjxPjWhzBzDTp" alt="Recruiter Logo" style={styles.logoImage} />
          </div>
          <div style={styles.welcomeText}>Welcome, Recruiter</div>
        </nav>

        <main style={styles.mainContent}>
          <div style={styles.grid}>
            <h2 style={styles.gridTitle} onClick={handleIconClick}>Post a New Job</h2>
            <div style={styles.icon} onClick={handleIconClick}>
              <span style={styles.iconSymbol}>+</span>
            </div>
            <p style={styles.gridText}>Click here to post a new job and find the perfect candidates!</p>
          </div>

          <div style={styles.grid}>
            <h2 style={styles.gridTitle} onClick={handleIconPostClick}>Posted Jobs</h2>
            <div style={styles.icon}>
              <span style={styles.iconSymbol} onClick={handleIconPostClick}>📦</span>
            </div>
            <p style={styles.gridText}>View all the jobs you have posted so far.</p>
          </div>

          <div style={styles.tableContainer}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Recent Posted Jobs</h2>
            </div>

            {/* Table */}
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.columnHeader}>Job Title</th>
                  <th style={styles.columnHeader}>Skills</th>
                  <th style={styles.columnHeader}>Posted Date</th>
                  <th style={styles.columnHeader}>Applicants</th>
                </tr>
              </thead>
              <tbody>
              {jobPosts.slice(0, 2).map(post => (
              <tr key={post.id}>
                <td style={styles.jobTitle}>{post.job_title}</td>
                <td style={styles.tableCell}>{post.skills}</td>
                <td style={styles.tableCell}>{new Date(post.posted_at).toLocaleDateString()}</td>
                <td style={{ ...styles.applicantsCell }}>
                  {post.applicants.length > 0 ? (
                    <ul style={styles.applicantList}>
                      {post.applicants.map((applicant, index) => (
                        <li key={index} style={styles.applicantItem}>
                          {applicant.candidate_name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No applicants</span>
                  )}
                </td>

                </tr>
            ))}
          </tbody>
          </table>
          </div>
        </main>
      </div>
    </div>
  );
};


// Styles
const styles = {
  fullScreenContainer: {
    // marginTop: '0px', /* Adjust based on navbar height */
    backgroundPosition: 'center 50px', // Move background down by 20px

    height: '100vh',
    width: '100vw',
    backgroundImage: "url('https://c1.wallpaperflare.com/preview/310/294/573/designing-drawing-notes-office.jpg')",
    backgroundSize: 'cover',
    // backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applicantsCell: {
    textAlign: 'left', // Align to left for consistency
    verticalAlign: 'top', // Align text at top of cell
    color: 'black', // Make text color black
    padding: '10px', // Small padding for clean spacing
    whiteSpace: 'nowrap', // Prevent text from breaking unevenly
  },
  applicantList: {
    margin: 0,
    paddingLeft: '15px', // Indentation for bullet list
    listStyleType: 'disc', // Add standard bullets
    color: 'black', // Black text for consistency
  },
  applicantItem: {
    marginBottom: '2px', // Small spacing between applicants
    color: 'black',
  },
  
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '0',
    marginTop: '60px', /* Adjust based on navbar height */
    backgroundColor: '#f4f4f4',
    
    

  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f0f0f0', // White background
    color: '#444', // Light black text
    borderBottom: '1px solid #ddd',
    
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor:'#fffff',
    width: '300px', // Adjust the width
    height: '60px', // Adjust the height
  },
  logoImage: {
    width: '40px', // Adjust the width
    height: '40px', // Adjust the height
    objectFit: 'contain', // Ensure the image retains its aspect ratio
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  welcomeText: {
    fontSize: '18px',
    color:'#444',
  },
  mainContent: {
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
    marginTop: '20px', // Adjust to prevent overlap with the navbar
    
  },
  grid: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  gridTitle: {
    fontSize: '22px',
    marginBottom: '10px',
    color:'black',
    cursor:'pointer',
  },
  icon: {
    fontSize: '40px',
    margin: '10px 0',
    color: '#007bff',
    cursor:'pointer',
  },
  iconSymbol: {
    fontSize: '50px',
  },
  gridText: {
    color: '#555',
    fontSize: '16px',
    
  },
  tableContainer: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
//   sectionTitle: {
//     fontSize: '22px',
//     marginBottom: '20px',
//   },
  searchBarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', // Aligns the search box to the right
    marginLeft: 'auto', // Pushes the search box as far to the right as possible
    paddingRight: '20px', // Optional: Adds spacing from the edge of the container
    width: '50%', // Adjust width as needed to limit space it occupies
  },
  searchInput: {
    width: '35%',
    padding: '13px 40px 10px 15px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
    marginRight: '10px', // Add spacing between input and icon

  },

  customSearchIcon: {
    position: 'absolute',
    top: '10%',
    right: '-17px',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    pointerEvents: 'none',
    width: '30px', // Adjust the width
    height: '30px', // Adjust the height
    objectFit: 'contain', // Ensure the image retains its aspect ratio
  },
  searchIcon: {
    position: 'absolute',
    top: '110.1%',
    right: '120px',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: '#f0f0f0',
    pointerEvents: 'none',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '16px',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0', // Light gray background
    color: '#333', // Dark text
    fontWeight: 'bold',
  },
  columnHeader: {
    padding: '10px',
  },
  jobTitleHeader: {
    padding: '30px',
    color: '#007bff', // Blue color for header
  },
  jobTypeHeader: {
    padding: '20px',
    color: '#28a745', // Green color for header
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left',
    color: 'black', // Added black text color

  },
  jobTitle: {
    color: '#007bff', // Blue color for job title
    fontWeight: 'bold', 
  },
  jobType: {
    // backgroundColor: '#7b828c', // Light green background for job type
    fontWeight: 'bold',
    // borderRadius: '3px',
    padding: '2px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px', // Add some spacing below the header row
  },
  sectionTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 'bold',
    color:'#444',
  },
};

export default Interview;
