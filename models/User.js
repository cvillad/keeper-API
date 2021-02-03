const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "User must have a first name"]
    },
    lastName: {
        type: String,
        required: [true, "User must have a last name"]
    },
    email: {
        type: String,
        required: [true, "User must have an email"]
    },
    password: String
});

userSchema.plugin(passportLocalMongoose);

mongoose.model("User", userSchema);

module.exports = mongoose.model("User")