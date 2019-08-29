const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordListSchema = new Schema({
    title: { type: String, unique: true, dropDups: true },
    words: [String]
});

const WordList = mongoose.model("WordList", wordListSchema);

module.exports = WordList;
