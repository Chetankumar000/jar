import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const Profile = () => {
  const navigate = useNavigate();
  const user = useAuthStore.getState().user;
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout(); // Call your logout logic here (e.g., clearing tokens, Zustand state)
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="min-h-screen text-white flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9pLoSySk6m6k8jo6mrZgifjDTKRYa4xt3Q&s"
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
          <h2 className="mt-4 text-xl font-semibold">{user?.name}</h2>
          <p className="text-gray-400">{user?.email}</p>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Profile Info Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Full Name</span>
            <span className="font-medium">{user?.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Phone</span>
            <span className="font-medium">{user?.phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Joined</span>
            <span className="font-medium">{user?.doj}</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Settings Section */}
        <div className="space-y-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
            Edit Profile
          </button>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg">
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
