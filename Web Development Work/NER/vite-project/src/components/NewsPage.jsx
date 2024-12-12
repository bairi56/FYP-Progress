import React from "react";
import "./NewsPage.css";

const NewsPage = () => {
  const newsItems = [
    {
      date: "Nov 19",
      title: "AI POWERED INTERVIEW SYSTEM WITH MULTIFACTOR ANALYSIS AND COMPUTER VISION",
      image: "https://www.totaljobs.com/recruiter-advice/wp-content/uploads/how-to-conduct-a-video-interview.jpg",
    },
    {
      date: "Nov 18",
      title: "corporate: Expectations and Pathways to Success",
      image: "https://tldv.io/wp-content/uploads/2023/01/linkedin-sales-solutions-VtKoSy_XzNU-unsplash-scaled.jpg",
    },
    {
      date: "Nov 14",
      title: "AI POWERED INTERVIEW SYSTEM WITH MULTIFACTOR ANALYSIS AND COMPUTER VISION",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxz4e6EIUFI5_H8ZiuB9gI3y1q8o-aNbxDeg&s",
    },
    {
      date: "Nov 14",
      title: "Corporate: Expectations and Pathways to Success",
      image: "https://www.24seventalent.com/wp-content/uploads/2024/06/Employee-Conducting-Remote-Interview-Successfully.jpeg",
    },
    {
      date: "Nov 14",
      title: "AI POWERED INTERVIEW SYSTEM WITH MULTIFACTOR ANALYSIS AND COMPUTER VISION",
      image: "https://cenizalevine.com/wp-content/uploads/2021/01/Man-sitting-at-computer.jpg",
    },

    {
      date: "Nov 14",
      title: "Campus to Corporate: Expectations and Pathways to Success",
      image: "https://gtm.com/household/wp-content/uploads/2020/08/virutal-interview-nanny-1024x683.jpg",
    },
  ];

  return (
    <div className="news-page">
      <h1 className="news-title">NEWS</h1>
      <h2 className="news-subtitle">Latest From Our AI Powered Interviewing System</h2>

      <div className="news-container">
        {newsItems.map((news, index) => (
          <div className="news-card" key={index}>
            <img src={news.image} alt={news.title} className="news-image" />
            <div className="news-content">
              <span className="news-date">{news.date}</span>
              <h3 className="news-title-card">{news.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <button className="more-news-button">More News</button>
    </div>
  );
};

export default NewsPage;
