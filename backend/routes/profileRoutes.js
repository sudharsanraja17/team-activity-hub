const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const upload = require(
  "../middleware/uploadMiddleware"
);

const {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage,
} = require(
  "../controllers/profileController"
);

router.get(
  "/",
  protect,
  getProfile
);

router.put(
  "/",
  protect,
  updateProfile
);

router.put(
  "/password",
  protect,
  changePassword
);

router.post(
  "/upload-image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage
);

module.exports = router;