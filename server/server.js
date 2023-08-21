const express = require("express");
const app = express();
const port = 3000;
app.use(express.static("../client"));

const mockData = { message: "Hello from the server!" };
app.get("/api/data", (req, res) => {
  const data = { message: "Hello from Backend!" };
  res.json(data);
});
app.get("/api/data", (req, res) => {
  res.json(mockData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
