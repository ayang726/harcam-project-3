const router = require("express").Router();
const wordList = require("./wordList");

// Book routes
router.use("/word-list", wordList);

module.exports = router;
