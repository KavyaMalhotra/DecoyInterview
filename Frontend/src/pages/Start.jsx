// src/pages/Start.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function Start() {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔍 Check for active media stream and shut it down if it exists
    const turnOffCamera = () => {
      const videoElements = document.querySelectorAll('video');
      videoElements.forEach(video => {
        const stream = video.srcObject;
        if (stream && stream.getTracks) {
          stream.getTracks().forEach(track => track.stop());
          video.srcObject = null;
          console.log('📷 Camera stream stopped');
        }
      });
    };

    turnOffCamera();
  }, []);

  const handleLogout = () => {
    alert('Logged out successfully!');
    navigate('/login');
  };

  const handleStartInterview = () => {
    navigate('/interview');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-12 flex flex-col items-center text-center font-inter relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg shadow transition"
      >
        Logout
      </button>

      <div className="max-w-5xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
          Ready to Shine? Let’s Start the Interview.
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed">
          This is your stage. Click start to begin your AI-powered interview session. Be clear, be bold, and own your answers.
        </p>

        {/* Start Interview Button */}
        <div className="flex justify-center mb-16">
          <Button text="Start Interview" onClick={handleStartInterview} />
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <FeatureCard
            title="Voice-Powered Interviews"
            description="Candidates speak, we listen. Our system extracts keywords from speech to analyze intent and relevance in real-time."
          />
          <FeatureCard
            title="Custom Question Sets"
            description="Tailor your interviews by setting predefined questions. Maintain consistency across all sessions."
          />
          <FeatureCard
            title="Data-Backed Insights"
            description="Review keyword matches and performance metrics to make informed hiring decisions faster."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 hover:border-blue-500 transition duration-300">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-300 text-sm">{description}</p>
    </div>
  );
}

export default Start;
