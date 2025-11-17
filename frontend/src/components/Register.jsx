import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!username || !email || !password) {
      setError("⚠️ Please complete all necessary details (Username, Email, Password)");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("⚠️ Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("⚠️ Password must be at least 6 characters long");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("contact", contact || "");
      formData.append("password", password);
      if (profileImage) {
        formData.append("profile_image", profileImage);
      }

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err.response?.data);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h4 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h4>
        
        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-500 mb-4 bg-red-50 p-3 rounded border border-red-200">
            {error}
          </p>
        )}

        <div className="space-y-4">
          {/* Username */}
          <input
            type="text"
            placeholder="Username *"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            required
          />

          {/* Contact */}
          <input
            type="text"
            placeholder="Contact *"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            required
          />

          {/* Profile Image */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />

          {/* Register Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!username || !email || !password || !contact}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Register
          </button>

          {/* Already have account? */}
          <p className="text-center text-gray-700 mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-semibold underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};