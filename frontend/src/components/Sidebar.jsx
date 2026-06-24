import {
  FaHome,
  FaUser,
  FaLock,
  FaGlobe
} from "react-icons/fa";

import {
  Link
} from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">

      <h2 className="text-2xl font-bold mb-8">
        Team Hub
      </h2>

      <div className="space-y-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/shared"
          className="flex items-center gap-3"
        >
          <FaGlobe />
          Shared Activities
        </Link>

        <Link
          to="/personal"
          className="flex items-center gap-3"
        >
          <FaLock />
          Personal Activities
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3"
        >
          <FaUser />
          Profile
        </Link>

      </div>
    </div>
  );
};

export default Sidebar;