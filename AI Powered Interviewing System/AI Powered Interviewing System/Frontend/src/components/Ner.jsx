// src/App.js
import React, { useState } from "react";
import axios from "axios";

function Ner() {
  const [text, setText] = useState("");
  const [predictions, setPredictions] = useState([]); //entity predictions result
  const [intent, setIntent] = useState(""); // Intent prediction result
  const [showEntityPrediction, setShowEntityPrediction] = useState(false); // State for entity heading
  const [showIntentPrediction, setShowIntentPrediction] = useState(false); // State for intent heading

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handlePredictEntities = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/predict/", {
        text,
      });
      console.log(text)
      setPredictions(response.data.predictions);
      setShowEntityPrediction(true);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  // Function to predict intent using the new Intent API endpoint
  const handlePredictIntent = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/predict-intent/",
        { text }
      );
      setIntent(response.data.predictions[0][1]); // Assuming the prediction is a single result
      setShowIntentPrediction(true);
    } catch (error) {
      console.error("Error predicting intent:", error);
    }
  };

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <div className="center-heading-container">
        <h1>Named Entity Recognition Prediction</h1>
      </div>

      {/* <h1 className="align-center"></h1> */}
      <textarea
        rows="8"
        cols="60"
        value={text}
        onChange={handleInputChange}
        placeholder="Enter text for NLU"
      />
      <br />

      <div style={{ marginTop: "10px" }}>
        <button className="custom-button" onClick={handlePredictEntities}>
          {/* //  style={{ marginRight: '10px',backgroundColor: 'blue',color: 'white' }}> */}
          Predict Entities
        </button>

        <button className="custom-button" onClick={handlePredictIntent}>
          Predict Intent
        </button>
      </div>

      {showEntityPrediction && (
        <div>
          <div style={{ marginTop: "20px" }}>
            <h2>Entity Predictions:</h2>
            <ul>
              {predictions.map((item, index) => (
                <p key={index}>
                  {item[0]}: {item[1]}
                </p>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div>
        {showIntentPrediction && (
          <div style={{ marginTop: "20px" }}>
            <h2>Intent Prediction:</h2>
            {intent && (
              <div>
                {intent}
              </div>
            )}
            
          </div>
        )}

      </div>
    </div>
  );
}

export default Ner;
