const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Home Page (NEW RELEASE and BESTSELLERS)
router.get('/', productController.getHomePage);

module.exports = router;
