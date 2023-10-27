import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { marked } from "marked"; // Import the marked library for Markdown formatting
import "./styles/AskPage.css"; // Import the CSS file for styling

const baseURL = "http://localhost:5000/";

const AskPage = () => {
  const [modelNames, setModelNames] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [questionsAndResponses, setQuestionsAndResponses] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const chatContentRef = useRef(null);

  useEffect(() => {
    axios.get(`${baseURL}models`).then((response) => {
      setModelNames(response.data.models);
    });
  }, []);

  const askQuestion = () => {
    if (questionText && selectedModel && !isAsking) {
      setIsAsking(true);
      axios
        .post(`${baseURL}ask`, { question: questionText, model_name: selectedModel })
        .then((response) => {
          const newQuestionResponse = {
            question: questionText,
            response: response.data.answer,
          };
          setQuestionsAndResponses([...questionsAndResponses, newQuestionResponse]);
          setQuestionText(""); // Clear the text box after asking a question
          setIsAsking(false);
        })
        .catch((error) => {
          console.error(error);
          setIsAsking(false);
        });
    }
  };

  // Function to format response text as Markdown
  const formatResponse = (text) => {
    const formattedText = marked(text);
    return { __html: formattedText };
  };

  // Scroll to the bottom of the chat content when new messages arrive
  useEffect(() => {
    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
  }, [questionsAndResponses]);

  return (
    <div className="chat-container">
      <div className="chat-box">
        <h1>DocuBot</h1>
        <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
          <option value="">Select Model</option>
          {modelNames.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
        <div className="chat-content" ref={chatContentRef}>
          {questionsAndResponses.map((qa, index) => (
            <div className="chat-bubble" key={index}>
              <div className="question-bubble">{qa.question}</div>
              <div className="response-bubble" dangerouslySetInnerHTML={formatResponse(qa.response)} />
            </div>
          ))}
        </div>
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter your question..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="question-input"
          />
          <button onClick={askQuestion} className={`button ask-button ${isAsking ? "disabled" : ""}`}>
            {isAsking ? "Asking..." : "Ask"}
          </button>
        </div>
        <div className="buttons">
          <Link to="/" className="button">
            Return
          </Link>
          <Link to="/train" className="button">
            Train
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AskPage;
