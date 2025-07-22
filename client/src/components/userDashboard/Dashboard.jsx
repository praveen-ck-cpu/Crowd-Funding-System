import React, { useState } from "react";
import {
  FaUser,
  FaDonate,
  FaClipboardList,
  FaSignOutAlt,
  FaHome,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import DonationHistory from "./DonationHistory";
import MyCampaigns from "./MyCampaigns";
import CreateCampaign from "./CreateCampaign";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth(); // Get user from AuthContext
  const [activeSection, setActiveSection] = useState("profile");

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-700 text-white p-6 fixed h-full">
        <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
        <ul className="space-y-4">
          <li
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              activeSection === "profile"
                ? "bg-indigo-500"
                : "hover:bg-indigo-600"
            }`}
            onClick={() => setActiveSection("profile")}
          >
            <FaUser /> Profile
          </li>
          <li
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              activeSection === "donations"
                ? "bg-indigo-500"
                : "hover:bg-indigo-600"
            }`}
            onClick={() => setActiveSection("donations")}
          >
            <FaDonate /> Donation History
          </li>
          <li
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              activeSection === "campaigns"
                ? "bg-indigo-500"
                : "hover:bg-indigo-600"
            }`}
            onClick={() => setActiveSection("campaigns")}
          >
            <FaClipboardList /> My Campaigns
          </li>
          <li
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              activeSection === "create"
                ? "bg-indigo-500"
                : "hover:bg-indigo-600"
            }`}
            onClick={() => setActiveSection("create")}
          >
            <FaPlus /> Create Campaign
          </li>
          {/* Navigate to Home */}
          <li
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-green-600"
            onClick={() => navigate("/")}
          >
            <FaHome /> Home
          </li>
          {/* Logout Button */}
          <li
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-red-600"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>
        <div className="mt-6">
          {activeSection === "profile" && <ProfileCard />}
          {activeSection === "donations" && <DonationHistory />}
          {activeSection === "campaigns" && <MyCampaigns />}
          {activeSection === "create" && <CreateCampaign />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
