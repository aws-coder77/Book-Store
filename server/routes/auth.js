
const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const router = express.Router();

router.get("/data", (req, res) => {
    const mockData = { message: "Hello from the server!" };
    console.log("get working");
    res.send(JSON.stringify(mockData));
});

router.post("/login", async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed: Invalid email or password." });
      }
  
      if (password == user.password) {
        // console.log(req.body);
        const token = jwt.sign({id: user._id}, "mysecretkey");
        return res
          .status(200)
          .json({token, userID: user._id});
      } else {
        // console.log(req.body);
        return res
          .status(401)
          .json({ message: "Authentication failed: Invalid email or password." });
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).json({ message: "An error occurred" });
    }
  
    res.send(JSON.stringify(req.body));
  });
  
  router.post("/signup", async (req, res) => {
    const { password, phone, email, name } = req.body;
    const newUser = new UserModel({
      name: name,
      email: email,
      phone: phone,
      password: password,
    });
    try {
      const savedUser = await newUser.save();
      console.log("User saved:", savedUser);
    } catch (error) {
      console.error("Error saving user:", error);
    }
    res.send(JSON.stringify(req.body));
  });

module.exports = router;