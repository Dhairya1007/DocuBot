import React from "react";
import { 
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import HomePage from "./components/HomePage";
import TrainPage from "./components/TrainPage";
import AskPage from "./components/AskPage";
const App = () => (
  <Router>
  <Routes>
  <Route index element={<HomePage />} />
  <Route path="train" element={<TrainPage />}/>
  <Route path="ask" element={<AskPage />}/>
  </Routes>
  </Router>
)

export default App;

