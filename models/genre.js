// genre.js

const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genre_name: {
        type: String,
        required: true,
        maxlength: 50
    }
});

module.exports = mongoose.model('Genre', genreSchema);
