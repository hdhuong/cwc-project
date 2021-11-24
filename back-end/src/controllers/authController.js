const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  // POST - login
  async login(req, res) {
    const { licensePlate, password } = req.body;
    // Simple validation
    if (!licensePlate || !password)
      return res.status(400).json({
        success: false,
        message: "Missing licensePlate and/or password",
      });
    try {
      const user = await User.findOne({ licensePlate: req.body.licensePlate });
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "Cannot find user" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res
          .status(400)
          .json({ success: false, message: "Wrong password" });

      // all good
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res
        .status(200)
        .json({ success: true, message: "Logged in", accessToken, user });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  //POST - register
  async register(req, res) {
    try {
      //check user
      const licensePlate = await req.body.licensePlate;
      const checkUser = await User.findOne({ licensePlate });

      if (checkUser)
        return res
          .status(400)
          .json({ success: false, message: "licensePlate already exist" });

      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //create new user
      const newUser = new User({
        licensePlate: req.body.licensePlate,
        password: hashedPassword,
      });

      //save user and respond
      const user = await newUser.save();
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res
        .status(200)
        .json({ success: true, message: "Create successfully", accessToken });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new AuthController();
