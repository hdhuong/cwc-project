const mongoose = require("mongoose");

const RescueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    desc: {
      type: String,
    },
    areaEnum: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rescue", RescueSchema);
