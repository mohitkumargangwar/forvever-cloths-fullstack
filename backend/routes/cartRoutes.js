const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

//Helper function to get a cart by user Id or guest Id
const getCart = async (userId, guestId) => {
    if(userId) 
        return await Cart.findOne( { user: userId})
    else if(guestId)
        return await Cart.findOne( { guestId: guestId });

    return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged in. user
// @acess Public

router.post('/', async (req, res) => {
    const { productId, quantity, size, color, guestId, userId} = req.body;

    try{
        const product = await Product.findById(productId);
        if(!product)
            return res.status(404).json( { message : "Product not found"});

        // Determine if the user is logged in or guest

        let cart = await getCart(userId, guestId);

        // if he cart exists, update it
        if(cart) {
            const productIndex = cart.products.findIndex( (p) => p.productId.toString() === String(productId) && p.size === size && p.color === color);

            if(productIndex > -1) {
                //if ther product already exists in the cart, update the quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // if the product does not exist in the cart , add new product
                cart.products.push({
                    productId: product._id,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }

            // Recalculate the total price
            cart.totalPrice = cart.products.reduce( ( acc, item ) => acc + item.price * item.quantity, 0);

            await cart.save();
            return res.status(200).json(cart);
        }
        else {
            // Create a new cart for the guest or user
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [{
                    productId: product._id,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                }],
                totalPrice: product.price * quantity,

            });
            return res.status(200).json(newCart);
        }
    } catch(err) {
         console.log(err);
        res.status(500).json({message : 'Server Error'});
    }
})


// @route PUT /api/cart
// @desc Update product quantity in the cart for a guest or log-in user
// @access Public
router.put('/', async (req, res) => {
// DEBUG
  console.log('PUT /api/cart headers:', req.headers['content-type']);
  console.log('PUT /api/cart body:', req.body);

  // 1) Guard: req.body undefined hua to yahin rok do
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: 'Empty request body. Send JSON with Content-Type: application/json from Postman.'
    });
  }

  // 2) Ab destructuring safe hai
  const { productId, quantity, size, color, guestId, userId } = req.body;

    try{
        let cart = await getCart(userId, guestId);
        if(!cart) return res.status(404).json( {  message: "Cart not found" });
        
        const productIndex = cart.products.findIndex((p) =>p.productId.toString() === String(productId) && p.size === size && p.color === color );

    if(productIndex > -1) {
        //Update quantity
        if(quantity >0) {
            cart.products[productIndex].quantity = quantity;
        } else 
            cart.products.splice(productIndex, 1);  //Remove product if quantity is 0
        
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity,0);
            await cart.save();
            return res.status(200).json(cart);
    } else
        return res.status(400).json({ message: "Product not found in cart" });
    }catch(err) {
         console.log(err);
        res.status(500).json({message : 'Server Error'});
    }
})


// @router DELETE /api/cart
// @Desc remove a product from the cart 
// @access Public
router.delete('/', async (req, res) => {
    const { productId, size, color, guestId, userId,} = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if(!cart) return res.status(404).json( { message: "cart not found"});
         const productIndex = cart.products.findIndex((p) => p.productId.toString() === String(productId) && p.size === size && p.color === color );
         if(productIndex >-1) {
            cart.products.splice(productIndex, 1); // Remove product from cart
             cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity,0);
              await cart.save();
            return res.status(200).json(cart);
         } else
            return res.status(400).json({ message: "Product not found in cart" });
    } catch(err) {
         console.log(err);
        res.status(500).json({message : 'Server Error'});
    }
});


// @router GET /api/cart
// @Desc Get the cart for a guest or logged-in user
// @access Public
router.get('/', async (req, res) => {
    const { guestId, userId } = req.query;
    try{
        const cart = await getCart(userId, guestId);
        if(cart) return res.status(200).json(cart);
        else
            return res.status(404).json( { message: 'cart not found'});

    } catch(err) {
         console.log(err);
        res.status(500).json({message : 'Server Error'});
    }
})


// @router POST /api/cart/merge
// @Desc Merge guest cart with user cart on login
// @access Private
router.post('/merge', protect, async (req, res) => {
    const {guestId} = req.body;
    const userId = req.user._id;

    try {
        
        // Find the guest cart and user cart
        const guestCart = await Cart.findOne({ guestId: guestId });
        const userCart = await Cart.findOne({ user: userId });

        if (guestCart) {
            if (guestCart.products.length === 0)
                return res.status(404).json({ message: 'Guest cart is empty' });

            if (userCart) {
                // Merge guest cart into user cart
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex((item) =>
                        item.productId.toString() === guestItem.productId.toString() &&
                        item.size === guestItem.size &&
                        item.color === guestItem.color
                    );

                    if (productIndex > -1) {
                        // If the product exists in the user cart, update the quantity
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    } else {
                        // otherwise, add the guest item to the cart
                        userCart.products.push(guestItem);
                    }
                });

                userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
                await userCart.save();

                // Remove the guest cart after merging
                try {
                    await Cart.deleteOne({ _id: guestCart._id });
                } catch (error) {
                    console.error("Error deleting guest cart:", error);
                }
                return res.status(200).json(userCart);
            } else {
                // if the user has no existing cart, assign the guest cart to the user
                guestCart.user = userId;
                guestCart.guestId = undefined;
                await guestCart.save();

                return res.status(200).json(guestCart);
            }
        } else {
            if(userCart) {
                // Guest cart has already been merged, return user cart
                return res.status(200).json(userCart);
            }
            res.status(404).json( { message: "Guest cart not found"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
