const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    country_name: {
        type: String,
        required: true,
        maxlength: 80
    }
});

module.exports = mongoose.model('Country', countrySchema);
