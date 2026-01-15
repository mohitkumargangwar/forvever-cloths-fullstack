// src/pages/EditProductPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FiArrowLeft, FiSave, FiUpload } from 'react-icons/fi';

// Dummy data for a product (real-world mein yeh API se aayega)
const dummyProduct = {
  id: '1',
  name: 'Printed Resort Shirt',
  description: 'Designed for summer, this printed resort shirt is perfect for vacation or weekend getaways. It features a relaxed fit, short sleeves, and a camp collar. The all-over tropical print adds a playful vibe.',
  price: 29.99,
  stock: 25,
  sku: 'PRNT-RES-004',
  sizes: 'S, M, L, XL',
  colors: 'Tropical Print, Navy Palms',
  images: [
    'https://via.placeholder.com/100x100/FF69B4/FFFFFF?text=ProductImg1', // Dummy image 1
    'https://via.placeholder.com/100x100/ADD8E6/000000?text=ProductImg2', // Dummy image 2
  ],
};

const EditProductPage = () => {
  const { productId } = useParams(); // URL se product ID lene ke liye
  const navigate = useNavigate(); // Navigation ke liye

  // State to hold product data
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    sku: '',
    sizes: '',
    colors: '',
    currentImages: [],
    newImages: [], // New images to be uploaded
  });

  // Jab component mount ho ya productId change ho, tab data load karein
  useEffect(() => {
    // Real-world mein, yahan API call hogi productId ke through
    // For demo, we use dummyProduct
    if (productId === dummyProduct.id) { // Check if we are editing the dummy product
      setProductData({
        name: dummyProduct.name,
        description: dummyProduct.description,
        price: dummyProduct.price.toString(), // Input type="text" ke liye string
        stock: dummyProduct.stock.toString(),
        sku: dummyProduct.sku,
        sizes: dummyProduct.sizes,
        colors: dummyProduct.colors,
        currentImages: dummyProduct.images,
        newImages: [],
      });
    } else {
      // Agar koi aur ID hai ya naya product hai, to empty form shuru karein
      setProductData({
        name: '',
        description: '',
        price: '',
        stock: '',
        sku: '',
        sizes: '',
        colors: '',
        currentImages: [],
        newImages: [],
      });
    }
  }, [productId]);

  // Input fields ke changes handle karein
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Image file select karne par handle karein
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData(prevData => ({
      ...prevData,
      newImages: [...prevData.newImages, ...files],
    }));
  };

  // Form submit handle karein
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Data to be Updated/Added:', productData);
    // Yahan API call hogi productData ko backend mein save karne ke liye
    // navigate('/admin/products'); // Update ke baad products list par wapas ja sakte hain
    alert('Product details submitted! Check console for data.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header and Back Button */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/admin/products')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition mr-4"
        >
          <FiArrowLeft className="mr-2" size={24} />
          <span className="text-xl sm:text-2xl font-semibold">Go Back</span>
        </button>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        {productId ? 'Edit Product' : 'Add New Product'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-8 max-w-4xl mx-auto">
        {/* Product Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition resize-y"
            required
          ></textarea>
        </div>

        {/* Price and Count in Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition"
              required
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 mb-2">Count in Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition"
              required
            />
          </div>
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label htmlFor="sku" className="block text-sm font-semibold text-gray-700 mb-2">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition"
            required
          />
        </div>

        {/* Sizes (comma-separated) */}
        <div className="mb-6">
          <label htmlFor="sizes" className="block text-sm font-semibold text-gray-700 mb-2">Sizes (comma-separated)</label>
          <input
            type="text"
            id="sizes"
            name="sizes"
            value={productData.sizes}
            onChange={handleChange}
            placeholder="e.g., S, M, L, XL"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition"
          />
        </div>

        {/* Colors (comma-separated) */}
        <div className="mb-6">
          <label htmlFor="colors" className="block text-sm font-semibold text-gray-700 mb-2">Colors (comma-separated)</label>
          <input
            type="text"
            id="colors"
            name="colors"
            value={productData.colors}
            onChange={handleChange}
            placeholder="e.g., Red, Blue, Green"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition"
          />
        </div>

        {/* Upload Image Section */}
        <div className="mb-8">
          <label htmlFor="images" className="block text-sm font-semibold text-gray-700 mb-2">Upload Image</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            multiple // Multiple images upload kar sakte hain
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-pink-50 file:text-pink-700
                       hover:file:bg-pink-100 transition
                       cursor-pointer"
          />
          <p className="mt-2 text-xs text-gray-500">Max 5 images. JPEG, PNG, GIF allowed.</p>

          {/* Current Images Preview */}
          {productData.currentImages.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Current Images:</h4>
              <div className="flex flex-wrap gap-3">
                {productData.currentImages.map((imgSrc, index) => (
                  <div key={index} className="relative w-24 h-24 border border-gray-200 rounded-lg overflow-hidden">
                    <img src={imgSrc} alt={`Product ${index}`} className="w-full h-full object-cover" loading="lazy" />
                    {/* Yahan aap delete button bhi add kar sakte hain existing images ke liye */}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Images Preview */}
          {productData.newImages.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">New Images to Upload:</h4>
              <div className="flex flex-wrap gap-3">
                {productData.newImages.map((file, index) => (
                  <div key={index} className="relative w-24 h-24 border border-gray-200 rounded-lg overflow-hidden">
                    <img src={URL.createObjectURL(file)} alt={`New Product ${index}`} className="w-full h-full object-cover" loading="lazy" />
                    {/* Yahan aap new images ko remove karne ka option bhi de sakte hain */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Update Product Button */}
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center mt-4"
        >
          <FiSave className="mr-2" />
          {productId ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;