const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;
app.use(express.static("../client"));
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserModel = require("./models/User");

const managerRouter = require("./routes/manage.js");

mongoose
  .connect("mongodb://127.0.0.1:27017/bookstore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(bodyParser.json());

app.use("/manage", managerRouter);

const mockData = { message: "Hello from the server!" };
app.get("/api/data", (req, res) => {
  const data = { message: "Hello from Backend!" };
  res.json(data);
});

app.post("/api/login", async (req, res) => {
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
      return res
        .status(200)
        .json({ message: "Authentication successful", user });
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

app.post("/api/signup", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
