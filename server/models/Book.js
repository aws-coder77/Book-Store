const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String
    },
    rating: {
        type: Number
    },
    mrp: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    reviews: [
        {
            userid: {
                type: mongoose.Schema.Types.ObjectId, ref: "users" 
            },
            user_rating: {
                type: Number
            },
            comment: {
                type: String
            }
        }
    ]
});

const BookModel = mongoose.model("books", BookSchema);
module.exports = BookModel;