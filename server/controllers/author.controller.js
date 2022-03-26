const Author = require("../models/author.model");

// Export an object that is full of methods.
module.exports = {
    // long-form syntax - key: value
    create: function (req, res) {
        console.log("create method executed");

        // req.body is the form data or data sent in from postman / js requests.
        Author.create(req.body)
            .then((author) => {
                // newly created dest from DB with auto generated id and createdAt.
                res.json(author);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    // Shorthand method in object syntax.
    getAll(req, res) {
        console.log("getAll method executed");
        Author.find()
            .then((authors) => {
                res.json(authors);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    getOne(req, res) {
        console.log("getOne method executed", "url params:", req.params);

        Author.findById(req.params.id)
            .then((author) => {
                res.json(author);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    delete(req, res) {
        console.log("delete method executed", "url params:", req.params);

        Author.findByIdAndDelete(req.params.id)
            .then((author) => {
                res.json(author);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    update(req, res) {
        console.log("update method executed", "url params:", req.params);

        Author.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true, // Run model validations again.
            new: true, // return newly updated document.
        })
            .then((author) => {
                res.json(author);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },
};