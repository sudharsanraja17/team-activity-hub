const User = require("../models/User");
const Activity = require("../models/Activity");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalSharedActivities =
      await Activity.countDocuments({
        visibility: "public",
      });

    const totalPersonalActivities =
      await Activity.countDocuments({
        visibility: "private",
        createdBy: req.user._id,
      });

    res.json({
      success: true,
      totalUsers,
      totalSharedActivities,
      totalPersonalActivities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};