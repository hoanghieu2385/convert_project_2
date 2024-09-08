// role.js

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role_name: {
        type: String,
        required: true,
        maxlength: 100
    },
    is_default: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Role', roleSchema);
