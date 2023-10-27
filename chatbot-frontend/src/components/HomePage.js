import React from "react";
import { Link } from "react-router-dom";
import "./styles/HomePage.css"; // Import the CSS file for styling

const HomePage = () => {
  return (
    <div className="container">
      <div className="box">
        <h1>DocuBot</h1>
        <h3>A Personalized Chatbot for you Documents!</h3>
        <Link to="/train" className="button">
          Train
        </Link>
        <Link to="/ask" className="button">
          Ask
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
