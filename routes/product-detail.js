const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product'); 

router.get('/product-detail/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Fetch the product
        const product = await Product.findById(id).populate('artist');

        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Fetch related products
        const relatedProducts = await Product.find({
            _id: { $ne: id },
            'category.category_name': product.category.category_name
        })
        .populate('artist')
        .limit(4);

        res.render('product-detail', { 
            product: product,
            related_products: relatedProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

module.exports = router;