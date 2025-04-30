// App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Interview from './pages/Interview';
import Start from './pages/Start'; // Assuming you have a Start page
import Button from './components/Button'; // We'll create this in step 2

function App() {
  return (
    <Router>
      <div>
        {/* Header or any other global component can go here */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/start" element={<Start />} /> {/* New Start page route */}
          {/* Add more routes as needed */}
        </Routes>

        {/* Footer or any other global component can go here */}
      </div>
    </Router>
  );
}

export default App;
