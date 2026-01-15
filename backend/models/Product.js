const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Auto _id by MongoDB
  name: {
    type: String,
    required: [true, 'Product name required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description required']
  },
  price: {
    type: Number,
    required: [true, 'Price required']
  },
  discountPrice: {
    type: Number,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  sizes: {
    type: [String],
    // agar image ke hisaab se required tha to uncomment karo:
    required: true,
    
  },
  colors: {
    type: [String],
    required: true,
    
  },
  collections: {
    type: String,
    trim: true
  },
  material: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: ['Men', 'Women', 'Unisex']
  },
  images: [
    {
        url: {
            type:String,
            required: true,
            trim: true,
        },
        altText: {
            type:String,
        },
     },
  ],

  // boolean flags
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },

  // ratings & reviews
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },

  // SEO / metadata
  tags: {
    type: [String],
    default: undefined
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  metaTitle: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    trim: true
  },
  metaKeywords: {
    type: String,
    trim: true
  },

  // physical properties
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  weight: Number,
  
}, {
  timestamps: true // createdAt, updatedAt auto
});

module.exports = mongoose.model('Product', productSchema);
