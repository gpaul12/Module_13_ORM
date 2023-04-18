const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");

// TODO: Add comments describing the functionality of this `login` route

// pathway that routes to login page
router.post("/login", async (req, res) => {
  // runs async to wait for userdata
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    // if there is no matching user data found (email), return message 404
    if (!userData) {
      res.status(404).json({ message: "Login failed. Please try again!" });
      return;
    }
    // hash the password from 'req.body' and save to userData
    const validPassword = await bcrypt.compare(
      // comparing input password with userData password
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      res.status(400).json({ message: "Login failed. Please try again!" });
      return;
    }
    res.status(200).json({ message: "You are now logged in!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
