const mongoose = require('mongoose');
const User = require('../models/user');
const Role = require('../models/role');

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://nguyenphuclam16:lam12345@firstcluster.7robzgn.mongodb.net/Project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const createSampleUsers = async () => {
    // Create sample roles
    const customerRole = await Role.findOneAndUpdate(
        { role_name: 'Customer' },
        { role_name: 'Customer', is_default: true },
        { upsert: true, new: true }
    );
    const adminRole = await Role.findOneAndUpdate(
        { role_name: 'Admin' },
        { role_name: 'Admin', is_default: false },
        { upsert: true, new: true }
    );

    // Sample user data
    const sampleUsers = [
        {
            email_address: 'john.doe@example.com',
            phone_number: '+1234567890',
            password: 'hashedPassword123', // In a real scenario, ensure this is properly hashed
            first_name: 'John',
            last_name: 'Doe',
            role: customerRole._id,
            addresses: [
                {
                    city: 'New York',
                    district: 'Manhattan',
                    ward: 'Midtown',
                    address: '123 Broadway St'
                }
            ],
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            email_address: 'jane.smith@example.com',
            phone_number: '+1987654321',
            password: 'hashedPassword456', // In a real scenario, ensure this is properly hashed
            first_name: 'Jane',
            last_name: 'Smith',
            role: customerRole._id,
            addresses: [
                {
                    city: 'Los Angeles',
                    district: 'Hollywood',
                    ward: 'West Hollywood',
                    address: '456 Sunset Blvd'
                },
                {
                    city: 'San Francisco',
                    district: 'Mission',
                    ward: 'Mission District',
                    address: '789 Valencia St'
                }
            ],
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            email_address: 'admin@recordstore.com',
            phone_number: '+1122334455',
            password: 'adminPassword789', // In a real scenario, ensure this is properly hashed
            first_name: 'Admin',
            last_name: 'User',
            role: adminRole._id,
            addresses: [
                {
                    city: 'Chicago',
                    district: 'Loop',
                    ward: 'Downtown',
                    address: '321 State St'
                }
            ],
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            email_address: 'sarah.johnson@example.com',
            phone_number: '+1555666777',
            password: 'hashedPassword789', // In a real scenario, ensure this is properly hashed
            first_name: 'Sarah',
            last_name: 'Johnson',
            role: customerRole._id,
            addresses: [
                {
                    city: 'Seattle',
                    district: 'Capitol Hill',
                    ward: 'Pike/Pine',
                    address: '567 Broadway E'
                }
            ],
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            email_address: 'michael.brown@example.com',
            phone_number: '+1777888999',
            password: 'hashedPasswordABC', // In a real scenario, ensure this is properly hashed
            first_name: 'Michael',
            last_name: 'Brown',
            role: customerRole._id,
            addresses: [
                {
                    city: 'Boston',
                    district: 'Back Bay',
                    ward: 'Copley Square',
                    address: '890 Boylston St'
                }
            ],
            created_at: new Date(),
            updated_at: new Date()
        }
    ];

    try {
        await User.deleteMany({}); // Optional: clear the collection first
        const createdUsers = await User.create(sampleUsers);
        
        // Set default address for each user
        for (const user of createdUsers) {
            if (user.addresses.length > 0) {
                user.default_address = user.addresses[0]._id;
                await user.save();
            }
        }
        
        console.log('Sample users added successfully!');
    } catch (error) {
        console.error('Error adding sample users:', error);
    } finally {
        mongoose.disconnect();
    }
};

createSampleUsers();