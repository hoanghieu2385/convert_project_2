const mongoose = require('mongoose');
const Artist = require('./artist');

const productSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory', required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    album: { type: String, maxlength: 255 },
    version: { type: String, maxlength: 255 },
    edition: { type: String, maxlength: 255 },
    description: { type: String, maxlength: 1000 },
    product_image: { type: String, maxlength: 255 },
    current_price: { 
        type: mongoose.Types.Decimal128,
        get: (v) => v != null ? parseFloat(v.toString()) : null
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    inventory: [{
        supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
        supply_price: { 
            type: mongoose.Types.Decimal128,
            get: (v) => v != null ? parseFloat(v.toString()) : null
        },
        qty: { type: Number },
        supply_date: { type: Date, default: Date.now }
    }]
});

productSchema.set('toJSON', { getters: true });
productSchema.set('toObject', { getters: true });

productSchema.pre('find', function() {
    this.populate('artist');
});

productSchema.pre('findOne', function() {
    this.populate('artist');
});

module.exports = mongoose.model('Product', productSchema);