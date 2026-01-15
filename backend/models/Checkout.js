const mongoose = require('mongoose');
const { Schema } = mongoose;

// Subdocument for each item in the checkout
const checkoutItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  
  image: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  size: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
}, { _id: false }); // _id:false if you don't want an id for each subdoc


// Main Checkout schema
const checkoutSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  checkoutItems: [checkoutItemSchema],

  // Shipping info
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },

  // Payment
  paymentMethod: { 
    type: String,
    required: true 
  },

  totalPrice: { 
    type: Number, 
    required: true, 
    default: 0
  },

  isPaid: { 
    type: Boolean,
    required: true, 
    default: false 
  },

  paidAt: { 
    type: Date, 
  },

  paymentStatus: { 
    type: String, 
    default: 'pending' 
  },

  paymentDetails: { 
    type: mongoose.Schema.Types.Mixed, // store payment related deatils ( transaction, ID, paypal, response )
  }, 

  // Finalization -> converted to order
  isFinalized: {
     type: Boolean, 
     default: false 
  },
  
  finalizedAt: {
     type: Date 
  },

}, { timestamps: true });

module.exports = mongoose.model('Checkout', checkoutSchema);

/* ----------------------
   Example JSON (sample data including image URLs)
   ----------------------
{
  "user": "64e2f9a1c3b9f6d1a2b3c4d5",
  "checkoutItems": [
    {
      "productId": "64f0a123b4c5d67890e1f234",
      "name": "Retro Hoodie",
      "image": "https://cdn.example.com/products/retro-hoodie-1.jpg",
      "price": 1499.00,
      "size": "L",
      "color": "Black",
      "quantity": 2
    },
    {
      "productId": "64f0a223b4c5d67890e1f235",
      "name": "Street Cap",
      "image": "https://cdn.example.com/products/street-cap-1.jpg",
      "price": 499.00,
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "address": "12 Rose Lane, MG Road",
    "city": "Lucknow",
    "postalCode": "226001",
    "country": "India"
  },
  "paymentMethod": "PayPal",
  "totalPrice": 3497.00,
  "isPaid": false,
  "paymentStatus": "pending",
  "paymentDetails": null,
  "isFinalized": false
}
*/
