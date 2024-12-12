import React, { useState } from "react";
import "./ApplicationForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faGraduationCap, faFileUpload, faFilePdf } from "@fortawesome/free-solid-svg-icons";

function ApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    qualification: "",
  });
  const [resumeFile, setResumeFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setResumeFile(file);
    } else {
      alert("Please upload a valid PDF or DOCX file.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.qualification || !resumeFile) {
      alert("Please fill out all fields and upload a resume.");
      return;
    }

    const form = new FormData();
    form.append("full_name", formData.fullName);
    form.append("email", formData.email);
    form.append("qualification", formData.qualification);
    form.append("resume", resumeFile);

    try {
      const response = await fetch("http://localhost:8000/api/job_posting/apply/", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        setFormData({ fullName: "", email: "", qualification: "" });
        setResumeFile(null);
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please check your connection and try again.");
    }
  };

  return (
    <div className="app">
      <div className="form-container">
        <h1 className="form-title">Application Form</h1>
        <form className="form-grid" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-field">
            <label htmlFor="fullName">Full Name</label>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Write your full name"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Write your Email Address"
              />
            </div>
          </div>

          {/* Highest Qualification */}
          <div className="highest-qualification-field">
            <label htmlFor="qualification">Highest Qualification</label>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faGraduationCap} className="icon" />
              <select id="qualification" value={formData.qualification} onChange={handleChange}>
                <option value="">Select your highest qualification</option>
                <option value="highschool">High School</option>
                <option value="bachelors">Bachelors</option>
                <option value="masters">Masters</option>
                <option value="phd">Ph.D.</option>
              </select>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="form-field">
            <label htmlFor="resume">Resume CV</label>
            <div className="upload-wrapper">
              <FontAwesomeIcon icon={faFilePdf} className="icon pdf-upload-icon" />
              <input
                type="file"
                id="resume"
                onChange={handleFileUpload}
                accept=".pdf,.docx"
                hidden
              />
              <label htmlFor="resume" className="upload-label">
                <FontAwesomeIcon icon={faFileUpload} className="icon" />
                <p>Click to upload your resume</p>
                <p className="small-text">Upload PDF or DOCX files up to 500MB</p>
              </label>
            </div>
            {resumeFile && <p className="file-name">{resumeFile.name}</p>}
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button type="button" className="cancel-button">Cancel</button>
            <button type="submit" className="apply-button">Apply Now</button>
          </div>

          {/* Warning */}
          <div className="warning-box">
            <p>Ensure all the provided information and your resume highlight your skills and experience.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;
