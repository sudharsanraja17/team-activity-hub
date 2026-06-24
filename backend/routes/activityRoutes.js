const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  getPublicActivities,
  createPublicActivity,
  updatePublicActivity,
  deletePublicActivity,
  getPrivateActivities,
  createPrivateActivity,
  updatePrivateActivity,
  deletePrivateActivity,
} = require(
  "../controllers/activityController"
);

/*
=========================
PUBLIC
=========================
*/

router.get(
  "/public",
  protect,
  getPublicActivities
);

router.post(
  "/public",
  protect,
  createPublicActivity
);

router.put(
  "/public/:id",
  protect,
  updatePublicActivity
);

router.delete(
  "/public/:id",
  protect,
  deletePublicActivity
);

/*
=========================
PRIVATE
=========================
*/

router.get(
  "/private",
  protect,
  getPrivateActivities
);

router.post(
  "/private",
  protect,
  createPrivateActivity
);

router.put(
  "/private/:id",
  protect,
  updatePrivateActivity
);

router.delete(
  "/private/:id",
  protect,
  deletePrivateActivity
);

module.exports = router;