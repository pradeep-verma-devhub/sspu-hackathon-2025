const mongoose = require('mongoose');
const User = require('./models/User');

const MONGO_URI = 'mongodb://127.0.0.1:27017/hackomania_sspu';

const dummyUsers = [
    {
        email: 'ayush@sspu.com',
        name: 'Ayush',
        password: 'ayush123',
        role: 'user',
        redirectPage: '/student.html'
    },
    {
        email: 'raghav@sspu.com',
        name: 'raghav',
        password: 'raghav123',
        role: 'user',
        redirectPage: '/student.html'
    },
    {
        email: 'professor@sspu.com',
        name: 'professor',
        password: 'professor123',
        role: 'admin',
        redirectPage: '/professor.html'
    },
    {
        email: 'accountant@sspu.com',
        name: 'accountant',
        password: 'accountant123',
        role: 'user',
        redirectPage: '/accountant.html'
    }
];

async function seedDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully!');

        
        console.log('Clearing existing users...');
        await User.deleteMany({});
        console.log('Existing users cleared.');

       
        console.log('Inserting dummy users...');
        const insertedUsers = await User.insertMany(dummyUsers);
        console.log(`Successfully seeded ${insertedUsers.length} users!`);

        mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
