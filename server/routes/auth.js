const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const BookModel = require("../models/Book");
const router = express.Router();

router.post("/cart", async (req, res) => {
  try {
    const userID = req.body.userID;
    const user = await UserModel.findOne({ _id: userID });
    const cart = user.cart;
    const books = [];

    // Use a for...of loop to iterate through the cart items
    for (const item of cart) {
      try {
        // Use await to fetch the book data
        const book = await BookModel.findOne({ _id: item.bookid });

        // Check if book is found before creating bookData
        if (book) {
          const bookData = {
            _id: book._id,
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            rating: book.rating,
            mrp: book.mrp,
            price: book.price,
            quantity: book.quantity,
            imagename: book.imagename,
            sold: item.sold,
          };
          console.log(bookData);
          books.push(bookData);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    }

    res.json(books);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add", async (req, res) => {
  const userId = req.body.userID;
  const bookid = req.body.bookid;
  console.log(userId + " " + bookid);
  const user = await UserModel.findById(userId);
  user.cart.push({bookid, sold: false});
  await user.save();
  res.status(200).json({msg: "book added to cart"});
});

router.post("/remove", async (req, res) => {
  const userId = req.body.userID;
  const bookid = req.body.bookid;
  // console.log(userId + " " + bookid);
  // const user = await UserModel.findById(userId);
  // user.cart.deleteOne({bookid});
  // await user.save();
  try {
    await UserModel.updateOne(
      { _id: userId },
      { $pull: { cart: { bookid: bookid } } }
    );
    console.log(`Book with ID ${bookid} removed from cart.`);
  } catch (error) {
    console.error('Error:', error);
  }
  res.status(200).json({msg: "book deleted from cart"});
});

router.post("/userdata", async (req, res) => {
  const userID = req.body.userID;
  const user = await UserModel.findOne({ _id: userID });
  // console.log(user);
  res.send(user);
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
      const token = jwt.sign({ id: user._id }, "mysecretkey");
      return res
        .status(200)
        .json({ token, userID: user._id });
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