const express = require("express");
const app = express();
const port = 3000;
app.use(express.static("../client"));
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const mockData = { message: "Hello from the server!" };
app.get("/api/data", (req, res) => {
  const data = { message: "Hello from Backend!" };
  res.json(data);
});

app.post("/api/signup", async (req, res) => {
  const { password, phone, email, name } = req.body;
  console.log(res.body);
  res.send(JSON.stringify(req.body));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
