import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true });
        setUser(response.data.user);
    } catch (err) {
      setError("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("profile_image", profileImage);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/upload-profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          withCredentials: true,
        },
      });
      setUser({...user, profile_image: response.data.profile_image });
      setProfileImage(null);
    } catch (err) {
      setError("Image upload failed. Please try again.");
    }
  };


  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-blue-600 mb-6">
          PROFILE
        </h2>

        {/* User Info */}
        <div className="space-y-2 text-gray-700 mb-6">
          <p><span className="font-semibold">Username:</span> { user.username }</p>
          <p><span className="font-semibold">Email:</span> { user.email }</p>
          <p><span className="font-semibold">Contact:</span> { user.contact || "N/A" }</p>
        </div>

        {/* Profile Image Section */}
        <div className="flex justify-center mb-6">
          <div className="h-40 w-40 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shadow">
            {user.profile_image && <img src={`http://localhost:5000${user.profile_image}`}
            alt="profile"
            className="h-full w-full object-cover"
            />}
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-3">
          <input
            type="file"
            accept="/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="w-full border border-gray-300 rounded p-2"
          />

          {profileImage && <button
            onClick={handleImageUpload}
           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition shadow">
            Upload Profile Image
          </button>}
        </div>

      </div>
    </div>
  );
};

// export default Profile;
