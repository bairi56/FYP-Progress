import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Ner from "./components/Ner"; // Ensure the path is correct
import EmotionDetection from "./components/EmotionDection"; // Import your EmotionDetection component
import Home from "./components/Home"; // Import your Home component
import QuestionGenerator from "./components/QuestionGenerator";
import Login from "./components/Login";
import Signup from ".//components/Signup";
import Logout from "./components/Logout";
import NewsPage from "./components/NewsPage";
import Interview from "./components/Interview";
import JobPostingPage from "./components/JobPostingPage";
import ViewJobPage from "./components/ViewJobPage";
import ApplicationForm from "./components/ApplicationForm";
import Chatbot from "./components/Chatbot";
import LandingPage from "./components/LandingPage";
// Component to conditionally render based on the current route
const AppContent = () => {
    const location = useLocation(); // Hook to get the current route
    return (
        <div className="container">
            {location.pathname === "/" && <NewsPage />}


            <Routes>
                <Route path="/ner" element={<Ner />} />
                <Route path="/demo" element={<Home />} /> {/* Home component for the Interview Demo */}
                <Route path="/emotion-detection" element={<EmotionDetection />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/interview" element={<Interview/>}/>
                <Route path="/question-generation" element={<QuestionGenerator/>}/>
                <Route path="/JobPosting" element={<JobPostingPage/>}/>
                <Route path="/view-job" element={<ViewJobPage />} />
                <Route path="/application-form" element={<ApplicationForm />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/landing-page" element={<LandingPage />} />
                {/* <Route path="/" element={<Ner />} /> Default route renders Ner */}

                {/* Add other routes here as needed */}
            </Routes>
            {/* <Question/> */}
            {/* <Test/> */}

        </div>
    );
};

function App() {
    return (
        <Router>
            <NavBar />
            <AppContent />
        </Router>
    );
}


export default App;
