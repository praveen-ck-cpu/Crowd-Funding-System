import React, { useEffect, useState } from "react";
import API from "../../../uitiles/api"; // ✅ Ensure this is correctly set up
import Loading from "../Loading"; // ✅ Import a loading component (if you have one)

const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get("/admin/stats"); // ✅ Replace with your actual API endpoint
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loading />; // ✅ Show a loading screen while fetching data

  if (!stats) {
    return <p className="text-center text-red-500">Failed to load stats</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 px-4">
      {[
        {
          title: "Total Users",
          value: stats.totalUsers,
          color: "text-indigo-600",
        },
        {
          title: "Active Campaigns",
          value: stats.activeCampaigns,
          color: "text-green-600",
        },
        {
          title: "Total Donations",
          value: `₹${stats.totalDonations.toLocaleString()}`,
          color: "text-blue-600",
        },
        {
          title: "Pending Approvals",
          value: stats.pendingApprovals,
          color: "text-red-600",
        },
      ].map((stat, index) => (
        <div
          key={index}
          className="w-full sm:w-[48%] lg:w-[23%] p-6 bg-white shadow-md rounded-lg text-center transition-transform transform hover:scale-105"
        >
          <h3 className="text-lg font-semibold">{stat.title}</h3>
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
