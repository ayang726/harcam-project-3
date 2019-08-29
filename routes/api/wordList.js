const router = require("express").Router();
const wordListController = require("../../controller/wordListController")


router.route("/:userId")
    .put(wordListController.update)
router.route("/:userId")
    .get(wordListController.findAllByUser)
    .post(wordListController.create)
module.exports = router;
