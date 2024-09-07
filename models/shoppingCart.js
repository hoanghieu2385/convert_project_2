const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    items: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
        qty: { type: Number, required: true }
    }]
});

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema);
