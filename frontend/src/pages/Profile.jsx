import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";

import { toast } from "react-toastify";

const Profile = () => {

  const [user, setUser] =
    useState({});

  const loadProfile =
    async () => {
      const data =
        await getProfile();

      setUser(data.user);
    };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await updateProfile(
          user
        );

        toast.success(
          "Profile Updated"
        );
      } catch {
        toast.error(
          "Failed"
        );
      }
    };

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6">

          <div className="bg-white rounded-xl shadow p-6 max-w-xl">

            <h2 className="text-2xl font-bold mb-5">
              Profile
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
            >

              <input
                className="w-full border p-3 rounded mb-3"
                value={
                  user.name || ""
                }
                onChange={(e) =>
                  setUser({
                    ...user,
                    name:
                      e.target
                        .value,
                  })
                }
              />

              <input
                className="w-full border p-3 rounded mb-3"
                value={
                  user.email || ""
                }
                onChange={(e) =>
                  setUser({
                    ...user,
                    email:
                      e.target
                        .value,
                  })
                }
              />

              <button
                className="bg-blue-600 text-white px-5 py-2 rounded"
              >
                Save Changes
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;