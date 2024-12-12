import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EmotionDetection = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [predictions, setPredictions] = useState([]);
    const [popupMessage, setPopupMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const video = videoRef.current;

        // Get access to the camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();
            })
            .catch(err => console.error("Error accessing camera: ", err));

        const intervalId = setInterval(() => {
            captureFrame();
        }, 1000); // Capture frame every second

        return () => clearInterval(intervalId);
    }, []);

    const captureFrame = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const frame = canvas.toDataURL('image/png');

        sendFrameToApi(frame);
    };

    const sendFrameToApi = async (frame) => {
        try {
            const response = await axios.post('http://localhost:8000/api/emotion-detection/', {
                frame: frame,
            });

            if (response.data.predictions) {
                setPredictions(response.data.predictions);
            }
        } catch (error) {
            console.error('Error sending frame to API:', error);
        }
    };

    const handleCancel = () => {
        // Set the pop-up message
        setPopupMessage('Interview canceled.');
        
        // Optionally reset the predictions
        setPredictions([]);

        navigate('/demo'); // Change this path to your actual route

        // Hide the pop-up after 3 seconds
        setTimeout(() => {
            setPopupMessage('');
        }, 3000);
    };

    return (
        <div style={styles.container}>
            <h2>Emotion Detection</h2>
            <div style={styles.videoContainer}>
                <video ref={videoRef} style={styles.video} />
                {/* Cancel Interview Button */}
                <button style={styles.cancelButton} onClick={handleCancel}>
                    🗙 Cancel Interview
                </button>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} width={640} height={480}></canvas>
            <h3>Predictions:</h3>
            <ul>
                {predictions.map((pred, index) => (
                    <li key={index}>
                        {pred.label} at [{pred.x}, {pred.y}] size [{pred.w}, {pred.h}]
                    </li>
                ))}
            </ul>
            {/* Pop-up message */}
            {popupMessage && <div style={styles.popup}>{popupMessage}</div>}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    videoContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative', // This allows positioning the button in relation to the video
    },
    video: {
        width: '600px',
        height: 'auto',
        borderRadius: '10px', // Optional styling for video
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional shadow effect
    },
    cancelButton: {
        marginLeft: '30px', // Space between video and button
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50', // Red background
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
        position: 'absolute', // Position the button absolutely in relation to the video
        top: '150px', // Adjust as necessary
        right: '-250px', // Move the button to the right of the video
        
    },
    popup: {
        marginTop: '-330px',
        marginLeft: '900px',
        padding: '10px',
        backgroundColor: '#ffe6e6',
        color: '#d9534f',
        border: '1px solid #d9534f',
        borderRadius: '5px',
        textAlign: 'center',
        
    },
};

export default EmotionDetection;
