const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');


const router = express.Router();

// @route POST /api/products
// @desc Create a new Product
// @access Private/Admin
router.post('/', protect,admin, async (req, res) => {
    try{
        const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku } = req.body;

        const product = new Product({name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku, user:req.user._id})
        const createdProduct = await product.save();
        return res.status(201).json({
        message: "Product created successfully",
        product: createdProduct
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({message : 'Server Error'});
    }
});

// @route PUT /api/products/:id
// @desc Upadate a Product
// @access Private Admin
router.put('/:id', protect, admin, async (req, res) => {

    try{
         const {name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, ifFeatured, isPublished, tags, dimensions, weight, sku} = req.body;
         const product = await Product.findById(req.params.id);
         if(product) {
            //Update Products fields
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes ||product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = ifFeatured !== undefined ? ifFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;

            //save updated product 
            const updatedProduct = await product.save();
            res.json(updatedProduct);
         } else {
            res.status(404).json({ message: "Product not found" });
         }

    } catch(err) {
        console.log(err);
        res.status(500).json({message : 'Server Error'});
    }
})

// @route Delete /api/products/:id
// @desc Delete a product by ID
// @access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try{
        //Find product by ID 
        const product = await Product.findById(req.params.id);
        if(product) {
            //removed the product the Database
            await product.deleteOne();
            res.json({ message: 'Product removed successfully'});
        } else {
            res.status(404).json({ message: "Product not found" });
         }
    } catch(err) {
        console.log(err);
        res.status(500).json({message : 'Server Error'});
    }
})


// @route GET /api/products/new-arrivals
// @desc Retrieve the latest 8 products - Creation date ke basis pe
// @access Public

router.get('/new-arrivals', async (req, res) => {

    try{
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
        if(newArrivals)
            res.json(newArrivals);
        else
            res.status(404).json({ message: "No New Arrivals products found"});


    } catch(err) {
         console.log(err);
        res.status(500).json({message : 'Server Error'});
    }
})

// @route GET /api/products
// @desc Get all the products with optional query filters
// @access Public

router.get('/', async (req, res) => {

    try{
        const { collections, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query;
        let query = {};

        // Filtering logic
        if(collections && collections !== "all") {
            query.collections = collections;
        }


        if(category && category !== "all") {
            query.category = category;
        }


       if(material) {
        query.material = { $in: material.split(",") };
       }


       if(brand) {
        query.brand = { $in: brand.split(",") };
       }


       if(size) {
        query.size = { $in: size.split(",") };
       }


       if(color) {
        query.colors = {$in: color.split(",") };
       }


       if(gender) {
        query. gender = gender;
       }


       if(minPrice || maxPrice) {
        query.price = {};
        if(minPrice) query.price.$gte = Number(minPrice);
        if(maxPrice) query.price.$lte = Number(maxPrice);
       }


       if(search) {
        query.$or = [
          { name: { $regex: search, $options: 'i'}}, 
          { description: { $regex: search, $options: 'i'}},
        ];
       }

       let sort = {};
       if(sortBy) {
        switch(sortBy) {
            case "priceAsc":
              sort = { price: 1};
                break;
            case "priceDesc":
                sort = { price: -1};
                  break;
            case "popularity":
                sort = { rating: -1};
                  break;
            default:
                break; 
        }
    }  
    
        // Fetch products and apply sorting and limit
        const products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
        res.json(products);

    } catch(err) {
         console.log(err);
        res.status(500).json({message : 'Server Error'});
    }
})

// /api/products/bestseller ko /api/products/:id ke upar isliye rakhte hain taki ye route pehle match ho jaye

// @route GET /api/products/best-seller
// @Desc Get Retrive the products with highest rating
// @access Public

router.get('/best-seller', async (req, res) => {

    try{
        const bestSeller= await Product.find({}).sort({rating: -1})
        if(bestSeller)
            res.json(bestSeller);
        else
            res.status(404).json({ message: "No Best seller products found"});
    } catch(err) {
         console.log(err);
        res.status(500).json({message : 'Server Error'});
    }
})



// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public

router.get('/:id', async (req, res) => {

    try{
        const product = await Product.findById(req.params.id);
        if(product)
            res.json(product);
        else
            res.status(404).json({ message: "Product not found'"})

    } catch(err) {
         console.log(err);
        res.status(500).json({message : 'Server Error'});
    }
});


// @route GET /api/products/similar/:id
// @Desc Retrieve similar products based on the current product;s gender and category
// @access Public

router.get('/similar/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).json({ messages: 'Product not found'});
        }

        const similarProducts = await Product.find({
            _id: { $ne: product._id }, //Exclude the current product
            gender: product.gender,
            category: product.category,
        }).limit(4); //Limit to 4 similar products

        res.json({similarProducts});
         
    } catch(err) {
         console.log(err);
        res.status(500).json({message : 'Server Error'});
    }
})




module.exports = router; 