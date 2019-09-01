const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordListSchema = new Schema({
    title: { type: String },
    userId: String,
    words: [String]
});

const WordList = mongoose.model("WordList", wordListSchema);

module.exports = WordList;
