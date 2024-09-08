// productCategory.js


const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    parent_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory', default: null },
    category_name: { type: String, required: true, maxlength: 50 }
});

module.exports = mongoose.model('ProductCategory', productCategorySchema);
