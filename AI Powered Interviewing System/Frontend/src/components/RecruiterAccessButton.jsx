import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecruiterAccessButton = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleJoinAsRecruiter = async () => {
    try {
      const accessToken = localStorage.getItem("access");
      const response = await axios.post(
        "http://localhost:8000/api/authentication/join-as-recruiter/",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setMessage(response.data.message);

      if (response.data.status === "success") {
        navigate("/interview");
      }
    } catch (err) {
      setMessage("Error submitting recruiter request");
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleJoinAsRecruiter} style={{ marginTop: "10px" }}>
        Request Recruiter Access
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RecruiterAccessButton;
