import React, { useState, useEffect } from "react";
import API from "../../../uitiles/api"; // Your Axios instance
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const MyCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth(); // Get logged-in user details

  useEffect(() => {
    if (user) {
      fetchUserCampaigns();
    }
  }, [user]);

  const fetchUserCampaigns = async () => {
    try {
      const response = await API.get(`/auth/campaigns`); // ✅ Fetch user campaigns
      setCampaigns(response.data);
    } catch (err) {
      setError("Failed to load your campaigns.");
      toast.error("Failed to load campaigns!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">My Campaigns</h3>

      {loading ? (
        <p className="text-gray-600">Loading your campaigns...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : campaigns.length === 0 ? (
        <p className="text-gray-600">You haven't created any campaigns yet.</p>
      ) : (
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="bg-gray-100 p-4 rounded-md shadow"
            >
              <h4 className="text-lg font-semibold text-gray-900">
                {campaign.title}
              </h4>
              <p className="text-gray-700">{campaign.description}</p>

              {/* ✅ Campaign Details */}
              <p className="text-sm text-gray-600">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    campaign.isApproved ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {campaign.isApproved ? "Approved" : "Pending Approval"}
                </span>
              </p>

              <p className="text-sm text-gray-600">
                <strong>Active:</strong>{" "}
                <span
                  className={`font-semibold ${
                    campaign.isActive ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {campaign.isActive ? "Yes" : "No"}
                </span>
              </p>

              <p className="text-sm text-gray-600">
                <strong>Category:</strong> {campaign.category || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Goal Amount:</strong> ₹
                {campaign.goalAmount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Raised Amount:</strong> ₹
                {campaign.currentAmount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Deadline:</strong>{" "}
                {new Date(campaign.deadline).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Created On:</strong>{" "}
                {new Date(campaign.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MyCampaigns;
