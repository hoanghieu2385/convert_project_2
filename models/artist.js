// artist.js

const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    full_name: { type: String, required: true, maxlength: 255 },
    country: {
        country_name: { type: String, required: true, maxlength: 80 }
    },
    genres: [{
        genre_name: { type: String, required: true, maxlength: 50 }
    }]
});

module.exports = mongoose.model('Artist', artistSchema);
