const mongoose = require("mongoose");

// {PATH} will be replaced with the field name, such as "location".
const AuthorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "{PATH} is required."],
            minlength: [3, "{PATH} must be at least {MINLENGTH} characters."],
        },
    },
    { timestamps: true } // adds createdAt and updatedAt
);

/*
Register schema with mongoose and provide a string to name the collection. This
also returns a reference to our model that we can use for DB operations.
*/
const Author = mongoose.model("Author", AuthorSchema);

// The mongoose model that lets you connect to it's DB collection.
module.exports = Author;