import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Gallery from './components/gallery.component'
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </Router>
      {/* <Gallery /> */}
      {/* <SpotifyPlayer /> */}
    </div>
  );
}

export default App;
