import React from 'react';
import Button from '../components/Button'; // Reusing the Button component
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for page redirection

function Result() {
  // Hardcoded result
  const result = 8;
  const total = 10;
  const percentage = (result / total) * 100;

  const navigate = useNavigate(); // Hook for navigation

  // Handle Go to Dashboard action
  const handleGoToDashboard = () => {
    navigate('/Start'); // Navigate to the start page (or dashboard)
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center font-inter px-6 py-12">
      <div className="w-full max-w-xl bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700">
        {/* Result Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">Interview Result</h2>
        </div>

        {/* Result Score */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-6xl font-semibold text-green-500">{result}/{total}</p>
          <p className="text-xl text-gray-300">{percentage}%</p>
        </div>

        {/* Feedback */}
        <div className="text-center mb-6">
          <p className="text-lg text-gray-300">Great job! You've almost nailed it. Keep up the good work.</p>
        </div>

        {/* Button to navigate (Could be a home button or a retry option) */}
        <div className="flex justify-center space-x-4">
          <Button
            text="Go to Dashboard"
            onClick={handleGoToDashboard} // Use the navigation function
            className="bg-blue-600 hover:bg-blue-500"
          />
          <Button
            text="Retry Interview"
            onClick={handleGoToDashboard} // Same here, replace with actual logic
            className="bg-gray-600 hover:bg-gray-500"
          />
        </div>
      </div>
    </div>
  );
}

export default Result;
