const express = require("express");
const BookModel = require("../models/Book");
const verifyToken = require("../middleware/auth.js");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World!!!");
});

router.post("/addbook", verifyToken, async (req, res) => {
    const { title, author, publisher, mrp, price, quantity } = req.body;
    const book = await BookModel.findOne({title});

    if(book){
        return res.json({message: "Book already exists"});
    }

    const newBook = new BookModel({title, author, publisher, mrp, price, quantity});
    try{
        await newBook.save();
        return res.json({status:100, message: "Book added successfully"});
    }
    catch(err){
        return res.json({message: "Something went wrong"});
    }
});

module.exports = router;