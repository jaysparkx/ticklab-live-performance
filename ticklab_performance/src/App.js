import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardPage from './CardPage';
import TickLabPerformance from './TickLabPerformance';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CardPage />} />
          <Route path="/ticklab-performance" element={<TickLabPerformance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;