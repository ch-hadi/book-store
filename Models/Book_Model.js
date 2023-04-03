const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

// author_id
// cover_image
// id
// pages
// releaseDate
// title

const Book_Schema = Schema({
    title: {
        type: String
    },
    author_id: {
        type: String
    },
    pages: {
        type: Number
    },
    releaseDate: {
        type: Date
    },
    cover_image: {
        type: String
    },
    isbn: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price:{
        type:Number
    }
})

const Book = model('Book', Book_Schema);
module.exports = Book