const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: { 
        category_name: { type: String, required: true, maxlength: 50 } 
    },
    artist: { 
        full_name: { type: String, required: true, maxlength: 255 } 
    },
    album: { type: String, maxlength: 255 },
    version: { type: String, maxlength: 255 },
    edition: { type: String, maxlength: 255 },
    description: { type: String, maxlength: 1000 },
    product_image: { type: String, maxlength: 255 },
    current_price: { type: mongoose.Types.Decimal128 },
    created_at: { type: Date },
    updated_at: { type: Date },
    inventory: [{
        supplier: { supplier_name: { type: String, required: true, maxlength: 255 } },
        supply_price: { type: mongoose.Types.Decimal128 },
        qty: { type: Number },
        supply_date: { type: Date }
    }]
});

module.exports = mongoose.model('Product', productSchema);
