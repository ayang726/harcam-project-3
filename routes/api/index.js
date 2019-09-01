const router = require("express").Router();
const wordCloud = require("./wordCloud");

// Book routes
router.use("/word-cloud", wordCloud);

module.exports = router;
