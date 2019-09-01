const router = require("express").Router();
const wordListController = require("../../controller/wordListController")


router.route("/")
    .post(wordListController.create)
router.route("/:id")
    .put(wordListController.update)
router.route("/all/:userId")
    .get(wordListController.findAllByUser)
router.route("/:id")
    .get(wordListController.findById)
module.exports = router;
