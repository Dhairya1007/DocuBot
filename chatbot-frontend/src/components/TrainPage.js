import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/TrainPage.css"; // Import the CSS file for styling

const baseURL = "http://localhost:5000/";

const TrainPage = () => {
  const [model_name, setModelName] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [isTraining, setIsTraining] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const trainModel = () => {
    if (model_name && file) {
      setIsTraining(true);
      const formData = new FormData();
      formData.append("model_name", model_name);
      formData.append("file", file);

      axios
        .post(baseURL + "train-from-file", formData)
        .then((response) => {
          setResponse(response.data.message);
          setIsTraining(false);
        })
        .catch((error) => {
          console.error(error);
          setIsTraining(false);
        });
    } else {
      setResponse("Please enter a model name and select a file.");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Document Trainer</h1>
        <p className="subtext">(Only .txt and .pdf files are supported)</p>
        <input
          type="text"
          placeholder="Enter Model Name"
          value={model_name}
          onChange={(e) => setModelName(e.target.value)}
        />
        <label className="file-upload">
          <input type="file" onChange={handleFileChange} />
          Select File
        </label>
        {file && <p className="file-name">Selected File: {file.name}</p>}
        <button
          onClick={trainModel}
          className={`button train-button ${isTraining ? "disabled" : ""}`}
          disabled={isTraining}
        >
          {isTraining ? (
            <>
              Training... <i className="loader"></i>
            </>
          ) : (
            "Train Model"
          )}
        </button>
        <p className="response-text">{response}</p>
        <div className="buttons">
          <Link to="/" className="button">
            Return
          </Link>
          <Link to="/ask" className="button">
            Go to Ask
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainPage;
