import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeployContract from "./Components/DeployContract.js";
import NFTGallery from "./Components/NFTGallery.js";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DeployContract />} />
        <Route path="/nft" element={<NFTGallery/>} />
      </Routes>
    </Router>
  );
}

export default App;
