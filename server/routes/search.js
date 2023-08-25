const express = require("express");
const router = express.Router();
const BookModel = require("../models/Book");
router.post("/", async (req, res) => {
  const searchTerm = req.body.input;
  console.log(req.body.input);
  try {
    const foundBooks = await BookModel.find({
      title: { $regex: searchTerm, $options: "i" },
    }).select("-_id title");
    res.json(foundBooks);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for books." });
  }
});
module.exports = router;
