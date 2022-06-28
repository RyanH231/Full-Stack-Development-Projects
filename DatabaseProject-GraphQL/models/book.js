const mongoose = require("mongoose");


const BookSchema = new mongoose.Schema({
    name: String,
    genre: String,
    authorID: String
});

module.exports = mongoose.model('Book',BookSchema);