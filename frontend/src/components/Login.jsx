import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const [Username, setUsername] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [Error, setError] = React.useState('');

  const { user, login, loading } = React.useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({ username: Username, password: Password });
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Login failed. Please check your credentials and try again.');
    }
    try {
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials and try again.');
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">

        {/* Title */}
        <h4 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h4>

        {/* Error Message Placeholder */}
        {Error && (
          <p className="text-sm text-red-500 mb-4 bg-red-50 p-3 rounded border border-red-200">
            {Error}
          </p>
        )}

        <div className="space-y-4">

          {/* Username / Email */}
          <input
            type="text"
            placeholder="Email or Username"
            name="username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 
            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
            transition duration-150"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 
            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
            transition duration-150"
          />

          {/* Login Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white 
            font-semibold py-3 rounded-lg shadow-md hover:shadow-lg 
            transition duration-150">
            Login
          </button>

          {/* Not a User? Register */}
          <p className="text-center text-gray-700 mt-4 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-800 font-semibold underline"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};
