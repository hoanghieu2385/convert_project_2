const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    city: { type: String, maxlength: 100 },
    district: { type: String, maxlength: 100 },
    ward: { type: String, maxlength: 100 },
    address: { type: String, maxlength: 300 }
});

const roleSchema = new mongoose.Schema({
    role_name: { type: String, maxlength: 100 },
    is_default: { type: Boolean }
});

const userSchema = new mongoose.Schema({
    email_address: { type: String, required: true, maxlength: 255 },
    phone_number: { type: String, required: true, maxlength: 25 },
    password: { type: String, required: true, maxlength: 300 },
    first_name: { type: String, maxlength: 100 },
    last_name: { type: String, maxlength: 100 },
    role: roleSchema,
    token: { type: String, maxlength: 255 },
    created_at: { type: Date },
    updated_at: { type: Date },
    addresses: [addressSchema],
    checkout_info: [{
        recipient_name: { type: String, maxlength: 255 },
        recipient_phone: { type: String, maxlength: 20 },
        city: { type: String, maxlength: 100 },
        district: { type: String, maxlength: 100 },
        ward: { type: String, maxlength: 100 },
        address: { type: String, maxlength: 255 }
    }]
});

module.exports = mongoose.model('User', userSchema);
