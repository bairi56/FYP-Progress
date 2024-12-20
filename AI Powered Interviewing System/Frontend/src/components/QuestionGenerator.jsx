import React, { useState } from "react";
import axios from "axios";

function App() {
    const [job, setJob] = useState("");
    const [experience, setExperience] = useState("");
    const [questions, setQuestions] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/question_management/generate_questions/", {
                job,
                experience,
            });
            setQuestions(response.data.questions);
        } catch (error) {
            console.error("Error generating questions:", error);
        }
        setLoading(false);
    };

    // Inline styles for the components
    const styles = {
        container: {
            fontFamily: "Arial, sans-serif",
            maxWidth: "600px",
            margin: "50px auto",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
        },
        header: {
            textAlign: "center",
            fontSize: "24px",
            color: "#333",
            marginBottom: "20px",
        },
        label: {
            display: "block",
            marginBottom: "10px",
            fontWeight: "bold",
            color: "#555",
        },
        input: {
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
        },
        select: {
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
        },
        button: {
            width: "100%",
            padding: "10px",
            backgroundColor: loading ? "#ccc" : "#007BFF",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s",
        },
        buttonHover: {
            backgroundColor: "#0056b3",
        },
        questionsContainer: {
            marginTop: "30px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#fff",
        },
        questionTitle: {
            fontSize: "20px",
            color: "#333",
            marginBottom: "10px",
        },
        pre: {
            backgroundColor: "#004d4d",
            padding: "10px",
            borderRadius: "5px",
            whiteSpace: "pre-wrap",
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Question Generator</h1>
            <form onSubmit={handleSubmit}>
                <label style={styles.label}>
                    Job Role:
                    <input
                        type="text"
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        style={styles.input}
                        placeholder="Enter job role"
                    />
                </label>
                <label style={styles.label}>
                    Experience Level:
                    <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Select</option>
                        <option value="basic">Basic</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                </label>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        backgroundColor: loading ? "#cccccc" : "#4CAF50", // Gray when loading, Green otherwise
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderRadius: "4px",
                        cursor: loading ? "not-allowed" : "pointer",
                        transition: "background-color 0.3s",
                    }}
                >
                    {loading ? "Generating..." : "Generate Questions"}
                </button>
            </form>
            {questions && (
                <div style={styles.questionsContainer}>
                    <h2 style={styles.questionTitle}>Generated Questions</h2>
                    <pre style={styles.pre}>{questions}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
