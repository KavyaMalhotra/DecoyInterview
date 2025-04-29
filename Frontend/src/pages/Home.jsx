// pages/Home.jsx

import { Link } from 'react-router-dom';
import Button from '../components/Button';

function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-12 flex flex-col items-center text-center font-inter">
      <div className="max-w-5xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
          Automate Interviews. Save Time. Hire Smarter.
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed">
          Your intelligent hiring assistant. Use AI-driven keyword detection, structured questions, and instant feedback to assess candidates — no human panel needed. Less screening, more hiring.
        </p>

        <div className="flex justify-center space-x-4 mb-16">
          <Link to="/login">
            <Button text="Login" />
          </Link>
          <Link to="/register">
            <Button text="Register" />
          </Link>
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

export default Home;
