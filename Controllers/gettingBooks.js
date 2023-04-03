const axios = require('axios');
const Handler = require('express-async-handler');
const Book = require('../Models/Book_Model')

const getDummyBooks = Handler(async (req, res) => {
    const response = await axios.get('https://my-json-server.typicode.com/dmitrijt9/book-api-mock/books');
    Book.insertMany([response])
    // console.log('ok->', response)
    const book = await Book.insertMany(response.data);
})

const getBooks = Handler(async (req, res) => {
    const books = await Book.find();
    // console.log(books);
    res.send({ data: books })
})

const deleteAll = Handler(async (req, res) => {
    const de = await Book.deleteMany({})
})
const addBooks = Handler(async (req, res) => {

})
module.exports = {
    addBooks,
    getDummyBooks,
    getBooks,
    deleteAll
}