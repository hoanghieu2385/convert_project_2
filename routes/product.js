const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', async (req, res) => {
    try {
        const newReleases = await Product.find()
            .sort({ created_at: -1 })
            .limit(10)
            .populate('artist');

        const bestsellers = await Product.find()
            .sort({ 'inventory.qty': -1 })
            .limit(10)
            .populate('artist');

        res.render('index', { newReleases, bestsellers });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('An error occurred while fetching products');
    }
});

module.exports = router;
