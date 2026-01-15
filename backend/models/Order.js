const mongoose = require('mongoose');
const { Schema } = mongoose;

// Subdocument for each item in an order
const orderItemSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
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

}, { _id: false });

// Main Order schema
const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [orderItemSchema],
    
  // Shipping details
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },

  // Payment & status
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
    default: false 
  },

  paidAt: { 
    type: Date
  },

  isDelivered: { 
    type: Boolean, 
    default: false 
  },

  deliveredAt: { 
    type: Date 
  },

  paymentStatus: { 
    type: String, 
    default: 'pending' 
  }, 

  status: { 
    type: String, 
    default: 'Processing',
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
  }, 

}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);

/* ----------------------
   Example JSON (sample order)
   ----------------------
{
  "user": "64e2f9a1c3b9f6d1a2b3c4d5",
  "orderItems": [
    {
      "productId": "64f0a123b4c5d67890e1f234",
      "name": "Retro Hoodie",
      "image": "https://cdn.example.com/products/retro-hoodie-1.jpg",
      "price": 1499.00,
      "size": "L",
      "color": "Black",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "address": "12 Rose Lane, MG Road",
    "city": "Lucknow",
    "postalCode": "226001",
    "country": "India"
  },
  "paymentMethod": "Credit Card",
  "totalPrice": 2998.00,
  "isPaid": true,
  "paidAt": "2025-11-17T14:30:00.000Z",
  "isDelivered": false,
  "paymentStatus": "paid",
  "status": "Processing"
}
*/
