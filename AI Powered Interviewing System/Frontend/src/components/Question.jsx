import React, { useState } from "react";
import axios from "axios";

const Question = () => {
  const [job, setJob] = useState("");
  const [experience, setExperience] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuestions = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/question_management/api", {
        job,
        experience,
      });
      setQuestions(response.data.questions); // Adjust based on API response format
    } catch (err) {
      setError("Error fetching questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuestions();
  };

  return (
    <div style={styles.container}>
      <h1>Question Generator</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Job:
          <input
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            placeholder="Enter Job Role"
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Experience Level:
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            style={styles.select}
          >
            <option value="">Select Experience Level</option>
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </label>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.result}>
        <h2>Generated Questions:</h2>
        {questions.length > 0 ? (
          <ul>
            {questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        ) : (
          <p>No questions generated yet.</p>
        )}
      </div>
    </div>
  );
};

// Inline Styles for Simplicity
const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  result: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default Question;
