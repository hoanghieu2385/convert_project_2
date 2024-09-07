// controllers/productController.js
const Product = require('../models/product'); // Assuming you're using Mongoose

exports.getHomePage = async (req, res) => {
    try {
        const products = await Product.find({}); // Query for new release products
        const bestsellers = await Product.find({}); // Query for bestsellers
        res.render('index', {
            products,
            bestsellers
        });
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
};

exports.getProductDetail = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        res.render('product-detail', { product });
    } catch (error) {
        res.status(500).send('Error fetching product details');
    }
};
