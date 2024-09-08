const mongoose = require('mongoose');
const Product = require('../models/product');
const ProductCategory = require('../models/productCategory');
const Artist = require('../models/artist');
const Supplier = require('../models/supplier');

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/re_project_2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const createSampleData = async () => {
    // Create sample product categories
    const vinylCategory = await ProductCategory.create({ category_name: 'Vinyl' });
    const cdCategory = await ProductCategory.create({ category_name: 'CD' });

    // Create sample artists
    const beatles = await Artist.create({ full_name: 'The Beatles', country: { country_name: 'UK' }, genres: [{ genre_name: 'Rock' }] });
    const adele = await Artist.create({ full_name: 'Adele', country: { country_name: 'UK' }, genres: [{ genre_name: 'Pop' }] });

    // Create sample suppliers with contact information and country details
    const vinylStore = await Supplier.create({
        supplier_name: 'Vinyl Store',
        contact_information: '123 Vinyl St, London',
        email_address: 'contact@vinylstore.com',
        country: { country_name: 'UK' }
    });
    const musicWorld = await Supplier.create({
        supplier_name: 'Music World',
        contact_information: '456 Music Blvd, New York',
        email_address: 'info@musicworld.com',
        country: { country_name: 'USA' }
    });

    // Sample product data with references to category, artist, and supplier
    const sampleProducts = [
        // Existing sample products
        {
            category: vinylCategory._id,
            artist: beatles._id,
            album: 'Abbey Road',
            version: '2024 Remastered',
            edition: 'Limited Edition',
            description: 'A classic album by The Beatles, remastered for 2024.',
            product_image: 'abbey_road.jpg',
            current_price: mongoose.Types.Decimal128.fromString('29.99'),
            created_at: new Date(),
            updated_at: new Date(),
            inventory: [
                {
                    supplier: vinylStore._id,
                    supply_price: mongoose.Types.Decimal128.fromString('20.00'),
                    qty: 50,
                    supply_date: new Date()
                }
            ]
        },
        {
            category: cdCategory._id,
            artist: adele._id,
            album: '30',
            version: 'Deluxe Edition',
            edition: 'Special Edition',
            description: 'The latest album from Adele with bonus tracks.',
            product_image: 'adele_30.jpg',
            current_price: mongoose.Types.Decimal128.fromString('19.99'),
            created_at: new Date(),
            updated_at: new Date(),
            inventory: [
                {
                    supplier: musicWorld._id,
                    supply_price: mongoose.Types.Decimal128.fromString('15.00'),
                    qty: 100,
                    supply_date: new Date()
                }
            ]
        },
        // New sample products
        {
            category: vinylCategory._id,
            artist: beatles._id,
            album: 'Let It Be',
            version: '2024 Remastered',
            edition: 'Limited Edition',
            description: 'The iconic album by The Beatles, remastered for 2024.',
            product_image: 'let_it_be.jpg',
            current_price: mongoose.Types.Decimal128.fromString('24.99'),
            created_at: new Date(),
            updated_at: new Date(),
            inventory: [
                {
                    supplier: vinylStore._id,
                    supply_price: mongoose.Types.Decimal128.fromString('18.00'),
                    qty: 40,
                    supply_date: new Date()
                }
            ]
        },
        {
            category: cdCategory._id,
            artist: adele._id,
            album: '21',
            version: 'Deluxe Edition',
            edition: 'Special Edition',
            description: 'A deluxe version of Adele\'s hit album 21.',
            product_image: 'adele_21.jpg',
            current_price: mongoose.Types.Decimal128.fromString('21.99'),
            created_at: new Date(),
            updated_at: new Date(),
            inventory: [
                {
                    supplier: musicWorld._id,
                    supply_price: mongoose.Types.Decimal128.fromString('16.00'),
                    qty: 80,
                    supply_date: new Date()
                }
            ]
        },
        {
            category: vinylCategory._id,
            artist: beatles._id,
            album: 'Sgt. Pepper\'s Lonely Hearts Club Band',
            version: '2024 Remastered',
            edition: 'Limited Edition',
            description: 'A remastered edition of the classic Beatles album.',
            product_image: 'sgt_peppers.jpg',
            current_price: mongoose.Types.Decimal128.fromString('34.99'),
            created_at: new Date(),
            updated_at: new Date(),
            inventory: [
                {
                    supplier: vinylStore._id,
                    supply_price: mongoose.Types.Decimal128.fromString('25.00'),
                    qty: 30,
                    supply_date: new Date()
                }
            ]
        },
        {
            category: cdCategory._id,
            artist: adele._id,
            album: 'Hello',
            version: 'Single Edition',
            edition: 'Special Edition',
            description: 'A special edition of Adele\'s hit single "Hello".',
            product_image: 'adele_hello.jpg',
            current_price: mongoose.Types.Decimal128.fromString('9.99'),
            created_at: new Date(),
            updated_at: new Date(),
            inventory: [
                {
                    supplier: musicWorld._id,
                    supply_price: mongoose.Types.Decimal128.fromString('7.00'),
                    qty: 150,
                    supply_date: new Date()
                }
            ]
        },
        {
            category: vinylCategory._id,
            artist: beatles._id,
            album: 'Rubber Soul',
            version: '2024 Remastered',
            edition: 'Limited Edition',
            description: 'A remastered edition of The Beatles\' "Rubber Soul".',
            product_image: 'rubber_soul.jpg',
            current_price: mongoose.Types.Decimal128.fromString('27.99'),
            created_at: new Date(),
            updated_at: new Date(),
            inventory: [
                {
                    supplier: vinylStore._id,
                    supply_price: mongoose.Types.Decimal128.fromString('22.00'),
                    qty: 60,
                    supply_date: new Date()
                }
            ]
        },
        {
            category: cdCategory._id,
            artist: adele._id,
            album: 'Live at the Royal Albert Hall',
            version: 'Deluxe Edition',
            edition: 'Special Edition',
            description: 'A special edition of Adele\'s live performance at the Royal Albert Hall.',
            product_image: 'adele_live.jpg',
            current_price: mongoose.Types.Decimal128.fromString('29.99'),
            created_at: new Date(),
            updated_at: new Date(),
            inventory: [
                {
                    supplier: musicWorld._id,
                    supply_price: mongoose.Types.Decimal128.fromString('20.00'),
                    qty: 70,
                    supply_date: new Date()
                }
            ]
        }
    ];

    try {
        await Product.deleteMany({}); // Optional: clear the collection first
        await Product.insertMany(sampleProducts);
        console.log('Sample products added successfully!');
    } catch (error) {
        console.error('Error adding sample products:', error);
    } finally {
        mongoose.disconnect();
    }
};

createSampleData();
