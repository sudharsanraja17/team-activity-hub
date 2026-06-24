import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ActivityCard from "../components/ActivityCard";

import {
  getPrivateActivities,
  createPrivateActivity,
} from "../services/activityService";

import { toast } from "react-toastify";

const PersonalActivities =
  () => {

    const [
      activities,
      setActivities,
    ] = useState([]);

    const [title, setTitle] =
      useState("");

    const [
      description,
      setDescription,
    ] = useState("");

    const fetchActivities =
      async () => {
        const data =
          await getPrivateActivities();

        setActivities(
          data.activities
        );
      };

    useEffect(() => {
      fetchActivities();
    }, []);

    const handleSubmit =
      async (e) => {
        e.preventDefault();

        try {
          await createPrivateActivity(
            {
              title,
              description,
            }
          );

          setTitle("");
          setDescription("");

          toast.success(
            "Private Activity Added"
          );

          fetchActivities();
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

            <h1 className="text-3xl font-bold mb-6">
              Personal Activities
            </h1>

            <form
              onSubmit={
                handleSubmit
              }
              className="bg-white p-5 rounded-xl shadow mb-6"
            >

              <input
                className="w-full border p-3 rounded mb-3"
                placeholder="Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
              />

              <textarea
                className="w-full border p-3 rounded mb-3"
                placeholder="Description"
                value={
                  description
                }
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

              <button
                className="bg-purple-600 text-white px-5 py-2 rounded"
              >
                Add Private Activity
              </button>

            </form>

            <div className="space-y-4">

              {activities.map(
                (
                  activity
                ) => (
                  <ActivityCard
                    key={
                      activity._id
                    }
                    activity={
                      activity
                    }
                  />
                )
              )}

            </div>

          </div>

        </div>

      </div>
    );
  };

export default PersonalActivities;