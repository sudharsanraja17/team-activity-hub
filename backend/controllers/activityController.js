const Activity = require("../models/Activity");

/*
==================================
PUBLIC ACTIVITIES
==================================
*/

// GET ALL PUBLIC ACTIVITIES
exports.getPublicActivities = async (
  req,
  res
) => {
  try {
    const { search } = req.query;

    let query = {
      visibility: "public",
    };

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const activities =
      await Activity.find(query)
        .populate(
          "createdBy",
          "name email profileImage"
        )
        .sort({
          createdAt: -1,
        });

    res.json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE PUBLIC ACTIVITY
exports.createPublicActivity =
  async (req, res) => {
    try {
      const {
        title,
        description,
      } = req.body;

      const activity =
        await Activity.create({
          title,
          description,
          visibility: "public",
          createdBy: req.user._id,
        });

      res.status(201).json({
        success: true,
        activity,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// UPDATE PUBLIC ACTIVITY
exports.updatePublicActivity =
  async (req, res) => {
    try {
      const activity =
        await Activity.findById(
          req.params.id
        );

      if (!activity) {
        return res.status(404).json({
          success: false,
          message:
            "Activity not found",
        });
      }

      if (
        activity.createdBy.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Not authorized",
        });
      }

      activity.title =
        req.body.title ||
        activity.title;

      activity.description =
        req.body.description ||
        activity.description;

      await activity.save();

      res.json({
        success: true,
        activity,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// DELETE PUBLIC ACTIVITY
exports.deletePublicActivity =
  async (req, res) => {
    try {
      const activity =
        await Activity.findById(
          req.params.id
        );

      if (!activity) {
        return res.status(404).json({
          success: false,
          message:
            "Activity not found",
        });
      }

      if (
        activity.createdBy.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Not authorized",
        });
      }

      await activity.deleteOne();

      res.json({
        success: true,
        message:
          "Activity deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/*
==================================
PRIVATE ACTIVITIES
==================================
*/

// GET PRIVATE ACTIVITIES
exports.getPrivateActivities =
  async (req, res) => {
    try {
      const activities =
        await Activity.find({
          visibility: "private",
          createdBy: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        count: activities.length,
        activities,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// CREATE PRIVATE ACTIVITY
exports.createPrivateActivity =
  async (req, res) => {
    try {
      const {
        title,
        description,
      } = req.body;

      const activity =
        await Activity.create({
          title,
          description,
          visibility: "private",
          createdBy: req.user._id,
        });

      res.status(201).json({
        success: true,
        activity,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// UPDATE PRIVATE ACTIVITY
exports.updatePrivateActivity =
  async (req, res) => {
    try {
      const activity =
        await Activity.findOne({
          _id: req.params.id,
          createdBy: req.user._id,
          visibility: "private",
        });

      if (!activity) {
        return res.status(404).json({
          success: false,
          message:
            "Activity not found",
        });
      }

      activity.title =
        req.body.title ||
        activity.title;

      activity.description =
        req.body.description ||
        activity.description;

      await activity.save();

      res.json({
        success: true,
        activity,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// DELETE PRIVATE ACTIVITY
exports.deletePrivateActivity =
  async (req, res) => {
    try {
      const activity =
        await Activity.findOne({
          _id: req.params.id,
          createdBy: req.user._id,
          visibility: "private",
        });

      if (!activity) {
        return res.status(404).json({
          success: false,
          message:
            "Activity not found",
        });
      }

      await activity.deleteOne();

      res.json({
        success: true,
        message:
          "Private activity deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };