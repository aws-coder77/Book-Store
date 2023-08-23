const express = require("express");
const BookModel = require("../models/Book");
const multer = require("multer");

const storage = multer.memoryStorage(); // Store the image in memory as Buffer
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!!!");
});

router.post("/addbook", upload.single("image"), async (req, res) => {
  const { title, author, publisher, mrp, price, quantity } = req.body;
  const image = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };
  const book = await BookModel.findOne({ title });

  if (book) {
    return res.json({ message: "Book already exists" });
  }

  const newBook = new BookModel({
    title,
    author,
    publisher,
    mrp,
    price,
    quantity,
    image,
  });
  try {
    await newBook.save();
    return res.json({ status: 100, message: "Book added successfully" });
  } catch (err) {
    return res.json({ message: "Something went wrong" });
  }
});

module.exports = router;
