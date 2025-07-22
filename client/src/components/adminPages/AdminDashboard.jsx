import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
  FaClock,
  FaDev,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import AdminHeader from "./AdminHeader";
import DashboardStats from "./DashboardStatus";
import ManageUsers from "./ManageUsers";
import ManageCampaigns from "./ManageCampaigns";
import ManagePendingCampaigns from "./ManagePendingCampaign";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderSection = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardStats />;
      case "users":
        return <ManageUsers />;
      case "campaigns":
        return <ManageCampaigns />;
      case "pending":
        return <ManagePendingCampaigns />; // ✅ New Section
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* ✅ Fixed Sidebar */}
      <div className="w-64 bg-indigo-700 text-white p-6 fixed h-full">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-indigo-600"
            onClick={() => navigate("/")}
          >
            <FaHome /> Home
          </li>
          <li
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-indigo-500"
                : "hover:bg-indigo-600"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <FaDev /> Dashboard
          </li>
          <li
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              activeTab === "users" ? "bg-indigo-500" : "hover:bg-indigo-600"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <FaUsers /> Manage Users
          </li>
          <li
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              activeTab === "campaigns"
                ? "bg-indigo-500"
                : "hover:bg-indigo-600"
            }`}
            onClick={() => setActiveTab("campaigns")}
          >
            <FaClipboardList /> Manage Campaigns
          </li>
          <li
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              activeTab === "pending" ? "bg-indigo-500" : "hover:bg-indigo-600"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            <FaClock /> Waiting for Approval
          </li>
          <li
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-red-600"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </div>

      {/* ✅ Scrollable Main Content */}
      <div className="flex-1 ml-64 h-screen overflow-auto">
        <AdminHeader />
        <div className="p-6">{renderSection()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
