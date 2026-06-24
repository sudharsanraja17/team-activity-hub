const ActivityCard = ({
  activity,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 border">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            {activity.title}
          </h2>

          {/* Activity Owner */}
          <p className="text-sm text-blue-600 mt-1 font-medium">
            Posted by:{" "}
            {activity.createdBy?.name ||
              "Unknown User"}
          </p>

          <p className="text-gray-600 mt-3">
            {activity.description}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            activity.visibility ===
            "public"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {activity.visibility}
        </span>

      </div>

      <div className="mt-5 flex justify-between items-center">

        <div className="text-sm text-gray-500">
          {new Date(
            activity.createdAt
          ).toLocaleString()}
        </div>

        <div className="flex gap-2">

          {onEdit && (
            <button
              onClick={() =>
                onEdit(activity)
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          )}

          {onDelete && (
            <button
              onClick={() =>
                onDelete(
                  activity._id
                )
              }
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default ActivityCard;