const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    ismanager: {
        type: Boolean
    }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;