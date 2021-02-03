const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Note must have a title"]
    },
    content: {
        type: String,
        required: [true, "Note must have a content"]
    },
    date: {
        type: Date,
        default: Date.now
    }  
});

mongoose.model("Note", noteSchema);

module.exports = mongoose.model("Note");