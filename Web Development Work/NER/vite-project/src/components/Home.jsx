import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const startInterview = () => {
      navigate('/emotion-detection'); // Navigate to the interview component
    };

    const PredictIntent = () => {
      navigate('/'); // Navigate to the interview component
    };

    return (
        <div style={styles.container}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbMfsw2_7sycoxHbYuDxrscQP9ir37koIdIA&s" alt="" />
            <h1>Welcome to Interview</h1>
            <p>Select an option to proceed</p>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={startInterview}>Start Interview</button>
                <button style={styles.button} onClick={PredictIntent}>Predict Intent</button>
                <button style={styles.button} onClick={PredictIntent}>Predict Entities</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#333333',
        textAlign: 'center',
    },
    img:{
      marginTop:2
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50', // Green background
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    },
};

export default Home;
