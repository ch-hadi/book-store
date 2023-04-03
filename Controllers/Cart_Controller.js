const Async = require("express-async-handler");
const Cart = require("../Models/Cart_Model");
const Book = require("../Models/Book_Model");

// 642574ac603a77e4dbde4a1b
// 642574ac603a77e4dbde4a19
// 642574ac603a77e4dbde4a18

const addToCart = Async(async (req, res) => {
  const { quantity = 1, title } = req.body;
  const userId = req.user._id;
  const productId = "642574ac603a77e4dbde4a19";
  const product = await Book.findById(productId);
  let cart = await Cart.findOne({ userId });
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }
  if (product && cart) {
    const itemIndex = cart.items?.findIndex(
      (item) => item.productId.toString() === productId
    );
    let price = product.price;
    if (itemIndex > -1) {
      // If the item already exists in the cart, update its quantity
      // let Cprice = cart.items[itemIndex].price;
      cart.items[itemIndex].quantity++;
      cart.items[itemIndex].price = price * cart.items[itemIndex].quantity;
      cart.total = total(cart);
      cart.markModified("items");
    } else {
      cart.items?.push({ productId, quantity, price });
      cart.total = total(cart);
    }
    await cart.save();
  } else {
    let price = product.price;
    cart = new Cart({ userId, items: [{ productId, quantity, price }] });
    cart.total = total(cart);
    await cart.save();
  }
  res.status(200).send({ message: "Cart updated" });
});
const deleteQuantity = Async(async (req, res) => {
  const userId = req.user._id;
  const productId = "642574ac603a77e4dbde4a19";
  const product = await Book.findById(productId);
  let cart = await Cart.findOne({ userId });
  let price = product.price;
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }
  console.log('-=>',cart)
  if (cart) {
    console.log(cart);
    let index = cart.items.findIndex(
      (item) => item.productId.toString() == productId
    );
    // console.log('=->',index)
    if (index >= 0 && cart.items[index].quantity > 1) {
      cart.items[index].quantity--;
      cart.items[index].price = price * cart.items[index].quantity;
      cart.save();
      cart.total = total(cart);
      res.send({ message: "Cart updated" });
      return;
    } else {
      return res.status(404).send({ message: "Quantity could not less then 1" });
    }
  } else {
    return res.status(404).send({ message: "Product not found" });
  }
});
// const addQuantity = Async(async(req,res)=>{
//   const userId = req.user._id;
//   const productId = "642574ac603a77e4dbde4a1b";
//   const product = await Book.findById(productId);
//   let cart = await Cart.findOne({ userId });
//   let price = product.price;
//   if (!product) {
//     return res.status(404).send({ message: "Product not found" });
//   }
//   if(cart){
//     let index= cart.items.findIndex(item=>item.productId.toString()==productId);
//     cart.items[index].quantity++
//     cart.items[index].price = price * cart.items[index].quantity;
//     cart.save()
//     cart.total=total(cart)
//   }
//   res.send({message:'Cart updated'})
//   // res.send('Ok')
// })
const deleteItem = Async(async (req, res) => {
  try {
    const userId = req.user._id;
    const itemId = "642574ac603a77e4dbde4a19";
    let cart = await Cart.findOne({ userId });
    const index = cart.items.findIndex(
      (item) => item.productId.toString() === itemId
    );
    // return
    if (index > -1) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== itemId
      );
      cart.save();
      cart.total = total(cart);
      res.send({ message: "Product deleted" });
      return;
    } else {
      res.send({ message: "Product not found in cart" });
      return;
    }
  } catch (error) {
    res.send("Internal server error");
  }
});
const getCartItems = Async(async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ userId }).populate(
    "items.productId",
    "title isbn pages"
  );
  res.json(cart);
});

function total(cart) {
  let finalTotal = 0;
  cart.items.forEach((item) => {
    console.log(item.price);
    finalTotal += item.price;
  });
  return finalTotal;
}

module.exports = {
  addToCart,
  getCartItems,
  deleteItem,
  deleteQuantity,
  // addQuantity
};
