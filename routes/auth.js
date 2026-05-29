const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: hashedPassword
  });

  await user.save();

  res.status(201).json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid username"
    });
  }

  const valid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!valid) {
    return res.status(401).json({
      message: "Invalid password"
    });
  }

  req.session.userId = user._id;

  res.json({
    message: "Login successful"
  });
});

module.exports = router;
