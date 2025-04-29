import { useState } from 'react';

function Login() {
  // State hooks for form data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can later add code here to send the login data to the backend
    console.log('Logging in with:', { username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white font-inter px-4">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-700">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-slate-700 text-white placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-slate-700 text-white placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg shadow transition-all duration-200 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
