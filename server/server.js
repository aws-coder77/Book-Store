const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;
const path = require("path");
app.use(express.static(path.join(__dirname, "../client")));
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const managerRouter = require("./routes/manage.js");
const authRouter = require("./routes/auth.js");
const searchRouter = require("./routes/search.js");
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
app.use("/api", authRouter);
app.use("/search", searchRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
