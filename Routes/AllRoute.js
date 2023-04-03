const express = require('express');
var router = express.Router();
const { addUser, removeUser, updateUser, getUsers } = require('./../Controllers/User_Controller');
const { getBooks, getDummyBooks, addBooks, deleteAll } = require('./../Controllers/gettingBooks');
const { sign_in, sign_up, allUser } = require("../Controllers/auth");
const { protect } = require('./../auth/authMiddleWare');
const { addBook, getOrders } = require('../Controllers/Book_Controller');
const { addToCart, getCartItems,deleteItem,deleteQuantity } = require('../Controllers/Cart_Controller');

router.get('', (req, res) => {
    res.send('Hello Server')
})
// getDummyBooks();
// getBooks()
// deleteAll()
// getCartItems()
router.post('/sign-in', sign_in);
router.post('/sign-up', sign_up);
router.get('/all-users', protect, allUser)
router.get('/get-users', getUsers);
router.post('/add-user', addUser);
router.post('/remove-user', removeUser);
router.post('/update-user', updateUser);
router.get('/get-books', getBooks);
// router.post('/add-books', addBooks);
router.post('/add-book', protect, addBook);
router.get('/get-orders', protect, getOrders);
// Routes to Cart
router.post('/add-to-cart', protect, addToCart);
router.get('/get-cart-items', protect, getCartItems)
router.delete('/delete-cart-item',protect,deleteItem)
router.delete('/delete-quantity',protect,deleteQuantity)

module.exports = {
    router
}