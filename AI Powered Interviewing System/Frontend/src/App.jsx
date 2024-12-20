import React from "react";
import NavBar from "./components/NavBar";
import Ner from "./components/Ner";
import EmotionDetection from "./components/EmotionDection";
import Home from "./components/Home";
import QuestionGenerator from "./components/QuestionGenerator";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import NewsPage from "./components/NewsPage";
import Interview from "./components/Interview";
import JobPostingPage from "./components/JobPostingPage";
import AllJobsPage from "./components/ViewJobPage";
import ApplicationForm from "./components/ApplicationForm";
import Chatbot from "./components/Chatbot";
import LandingPage from "./components/LandingPage";
import NavBar1 from "./components/NavBar1";
import ViewJobPage from "./components/ViewJobPage"
import AllPosts from "./components/AllPosts";
import ApplicantsDetailsPage from "./components/ApplicantsDetailsPage";
import ApplicantProfilePage from "./components/ApplicantProfilePage";
// import Test from "./components/Test";
// Component to conditionally render based on the current route
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Create a PrivateRoute component
const PrivateRoute = ({ children }) => {
    const accessToken = localStorage.getItem('access');
    const location = useLocation();

    return accessToken ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};
// const AppContent = () => {
//     const location = useLocation(); // Hook to get the current route

function App() {
    const ConditionalNavRecruiter = () => {
        const location = useLocation();
        const excludedPaths = ["/", "/signup", "/login"];
        return !excludedPaths.includes(location.pathname) && location.pathname === "/interview" && <NavBar />;
    };
    
    const ConditionalNavCandidate = () => {
        const location = useLocation();
        const excludedPaths = ["/", "/signup", "/login"];
        return !excludedPaths.includes(location.pathname) && location.pathname === "/NewsPage" && <NavBar1 />;
    };
    return (
        <Router>
            <ConditionalNavRecruiter />
            <ConditionalNavCandidate />
            <div className="container">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected Routes */}
                    <Route 
                        path="/logout" 
                        element={
                            <PrivateRoute>
                                <Logout />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/NewsPage" 
                        element={
                            <PrivateRoute>
                                <NewsPage />
                            </PrivateRoute>
                        } 
                    />
                <Route path="/ner" element={<Ner />} />
                <Route path="/NewsPage" element={<NewsPage />} />
                <Route path="/demo" element={<Home />} />
                <Route path="/emotion-detection" element={<EmotionDetection />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/interview" element={<Interview />} />
                <Route path="/question-generation" element={<QuestionGenerator />} />
                <Route path="/JobPosting" element={<JobPostingPage />} />
                <Route path="/application-form" element={<ApplicationForm />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/view-job" element={<ViewJobPage/>} />
                <Route path="/publicposts" element={<AllPosts/>}></Route>
                <Route path="/job-applicants" element={<ApplicantsDetailsPage />} />
                <Route path="/applicant-profile" element={<ApplicantProfilePage />} />
                {/* <Route path="/test" element={<Test />} /> */}
            </Routes>
        </div>
        </Router>

    );
};
export default App;


//         <Router>
//             {/* Wrap AppContent so it can use useLocation */}
//             <ConditionalNavRecruiter />
//             <ConditionalNavCandidate/>
//             <AppContent />
//         </Router>
//     );


// // This component handles the conditional rendering of NavBar
// const ConditionalNavRecruiter = () => {
//     const location = useLocation();
//     const excludedPaths = ["/", "/signup", "/login"];
//     return !excludedPaths.includes(location.pathname) && location.pathname === "/interview" && <NavBar />;
// };

// const ConditionalNavCandidate = () => {
//     const location = useLocation();
//     const excludedPaths = ["/", "/signup", "/login"];
//     return !excludedPaths.includes(location.pathname) && location.pathname === "/NewsPage" && <NavBar1 />;
// };

