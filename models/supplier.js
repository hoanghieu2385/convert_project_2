// supplier.js

const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    supplier_name: { type: String, required: true, maxlength: 255 },
    contact_information: { type: String, required: true, maxlength: 255 },
    email_address: { type: String, maxlength: 100 },
    country: {
        country_name: { type: String, required: true, maxlength: 80 }
    }
});

module.exports = mongoose.model('Supplier', supplierSchema);
