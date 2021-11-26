const User = require("../models/User");
const jwt = require("jsonwebtoken");

class UserController {
  // put - update user
  async updateUser(req, res) {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  }

  // delete - delete user
  async deleteUser(req, res) {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  }

  // get - get user
  async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // get - get user
  async searchUser(req, res) {
    const licensePlate = new RegExp(req.params.licensePlate, "i");
    try {
      const user = await User.find({ licensePlate: licensePlate });
      const other = user?.map((i) => ({
        licensePlate: i.licensePlate,
        profilePicture: i.profilePicture,
        desc: i.desc,
      }));
      res.status(200).json({ success: true, user: other, total: user?.length });
    } catch (err) {
      res.status(500).json({ success: false, message: "Interal server error" });
    }
  }
}

module.exports = new UserController();
