import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [stats, setStats] =
    useState({
      totalUsers: 0,
      totalSharedActivities: 0,
      totalPersonalActivities: 0,
    });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );
const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/dashboard/stats`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">
            Dashboard
          </h1>

          <div className="grid md:grid-cols-3 gap-5">

            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-gray-500">
                Shared Activities
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats.totalSharedActivities}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-gray-500">
                Personal Activities
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats.totalPersonalActivities}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-gray-500">
                Users
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats.totalUsers}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;