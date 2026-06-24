const mongoose = require("mongoose");

const activitySchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true
      },

      description: {
        type: String,
        required: true
      },

      visibility: {
        type: String,
        enum: [
          "public",
          "private"
        ],
        required: true
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    },
    {
      timestamps: true
    }
  );

module.exports = mongoose.model(
  "Activity",
  activitySchema
);