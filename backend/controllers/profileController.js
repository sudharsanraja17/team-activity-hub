const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET PROFILE
exports.getProfile = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (
  req,
  res
) => {
  try {
    const { name, email } =
      req.body;

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (email) {
      const emailExists =
        await User.findOne({
          email,
          _id: {
            $ne: req.user._id,
          },
        });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message:
            "Email already in use",
        });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CHANGE PASSWORD
exports.changePassword =
  async (req, res) => {
    try {
      const {
        currentPassword,
        newPassword,
      } = req.body;

      const user =
        await User.findById(
          req.user._id
        );

      const isMatch =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message:
            "Current password is incorrect",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      user.password =
        hashedPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Password changed successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// UPLOAD PROFILE IMAGE
exports.uploadProfileImage =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "No image uploaded",
        });
      }

      user.profileImage =
        `/uploads/${req.file.filename}`;

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Profile image uploaded",
        image:
          user.profileImage,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };