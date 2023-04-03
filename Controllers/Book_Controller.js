const Async = require('express-async-handler');
const Book = require("../Models/Book_Model")

const addBook = Async(async (req, res) => {
    const { title, isbn, releaseDate, pages, cover_image, author_id } = req.body;
    let user = res.user;
    let newBook = new Book();
    newBook.title = title;
    newBook.author_id = author_id;
    newBook.cover_image = cover_image;
    newBook.pages = pages;
    newBook.releaseDate = releaseDate;
    newBook.isbn = isbn;
    newBook.user = req.user._id;
    newBook.save();
    let data = {
        title: newBook.title,
        author_id: newBook.author_id,
        cover_image: newBook.cover_image,
        pages: newBook.pages,
        releaseDate: newBook.releaseDate,
        isbn: newBook.isbn
    }
    res.send({ data: data });
})

const getOrders = Async(async (req, res) => {
    // console.log('o->', req.user._id)

    const orders = await Book.find({ user: req.user_id });
    // console.log('or->', orders);

    // console.log('-->');

})

module.exports = {
    addBook,
    getOrders
}