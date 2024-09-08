// user.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    city: { type: String, maxlength: 100 },
    district: { type: String, maxlength: 100 },
    ward: { type: String, maxlength: 100 },
    address: { type: String, maxlength: 300 }
});

const userSchema = new mongoose.Schema({
    email_address: { type: String, required: true, maxlength: 255, unique: true },
    phone_number: { type: String, required: true, maxlength: 25, unique: true },
    password: { type: String, required: true, maxlength: 300 },
    first_name: { type: String, maxlength: 100 },
    last_name: { type: String, maxlength: 100 },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', default: () => mongoose.model('Role').findOne({ is_default: true }) },
    token: { type: String, maxlength: 255 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    addresses: [addressSchema],
    default_address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' }
});

module.exports = mongoose.model('User', userSchema);