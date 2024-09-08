// productController.js
const Product = require('../models/product');

exports.getHomePage = async (req, res) => {
    try {
        const newReleases = await Product.find({})
            .sort({ created_at: -1 })
            .limit(10)
            .populate('artist', 'full_name');

        const bestsellers = await Product.find({})
            .sort({ 'inventory.qty': -1 })
            .limit(10)
            .populate('artist', 'full_name');
        
        res.render('index', {
            newReleases,
            bestsellers
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
};