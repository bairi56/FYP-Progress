import { useNavigate } from 'react-router-dom'; // Import the navigation hook

import React, { useEffect, useState } from 'react';

const Interview = () => {
  const navigate = useNavigate(); // Initialize the navigation function
  const [jobPosts, setJobPosts] = useState([]); // State to store job posts

  // Fetch job posts when the component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/job_posting/jobposts/')
      .then(response => response.json())
      .then(data => setJobPosts(data));
      console.log(jobPosts)
  }, []);

  const handleIconClick = () => {
    navigate('/JobPosting'); // Replace '/next-page' with your target route
  };

  const handleIconPostClick = () => {
    navigate('/view-job'); // Replace '/next-page' with your target route
  };
  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQn-Y-tmGd9D4jUPkCn1r-9HT209m8amljNVM8CjxPjWhzBzDTp" alt="Recruiter Logo" style={styles.logoImage} />
        </div>
        <div style={styles.welcomeText}>Welcome, Recruiter</div>
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.grid}>
          <h2 style={styles.gridTitle}>Post a New Job</h2>
          <div style={styles.icon} onClick={handleIconClick}>
            <span style={styles.iconSymbol}>+</span>
          </div>
          <p style={styles.gridText}>Click here to post a new job and find the perfect candidates!</p>
        </div>

        <div style={styles.grid}>
          <h2 style={styles.gridTitle} onClick={handleIconPostClick}>Posted Jobs</h2>
          <div style={styles.icon}>
            <span style={styles.iconSymbol}>📦</span>
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
                <th style={styles.columnHeader}>Location</th>
                <th style={styles.columnHeader}>Posted Date</th>
                <th style={styles.columnHeader}>Job Type</th>
              </tr>
            </thead>
            <tbody>
              {jobPosts.map(post => (
                <tr key={post.id}>
                  <td style={styles.jobTitle}>{post.title}</td>
                  <td style={styles.tableCell}>{post.skills}</td>
                  <td style={styles.tableCell}>{post.experience_level}</td>
                  <td style={styles.jobType}>{post.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '0',
    marginTop: '350px', /* Adjust based on navbar height */
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
  },
  icon: {
    fontSize: '40px',
    margin: '10px 0',
    color: '#007bff',
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
    backgroundColor: '#7b828c', // Light green background for job type
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
