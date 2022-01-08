const Rescue = require("../models/Rescue");
const User = require("../models/User");

class RescueController {
  // post - create a post
  async newRescue(req, res) {
    const newRescue = new Rescue(req.body);
    try {
      const savedRescue = await newRescue.save();
      res.status(200).json({ success: true, savedRescue });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //get a post
  async getRescueByCategory(req, res) {
    try {
      const rescueInfo = await Rescue.find({ areaEnum: req.params.areaEnum });
      res.status(200).json({ success: true, data: rescueInfo });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getAllRescue(req, res) {
    try {
      const rescueInfo = await Rescue.find();
      res
        .status(200)
        .json({ success: true, data: rescueInfo, total: rescueInfo?.length });
    } catch (err) {
      res.status(500).json({ success: false, message: "Interal server error" });
    }
  }
}

module.exports = new RescueController();
