const db = require("../models");

// Defining methods for the booksController
module.exports = {
    findAllByUser: function (req, res) {
        db.WordList
            .find({ userId: req.params.userId })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.WordList
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.WordList
            .create(req.body)
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.WordList
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err));
    }
};
