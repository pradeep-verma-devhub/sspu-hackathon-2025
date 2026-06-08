const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const app = express();
const PORT = 4000;

const MONGO_URI = 'mongodb://127.0.0.1:27017/hackomania_sspu';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

const User = require('./models/User');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', async (req, res) => {
    const email = req.body.studentEmail;
    const password = req.body.studentPassword;

    console.log(`Login attempt: Email - ${email}`);

    try {
        const user = await User.findOne({ email: email });

        if (user && user.password === password) {
            console.log(`User found: ${user.name}, Role: ${user.role}. Redirecting to ${user.redirectPage}`);
            res.redirect(user.redirectPage);
        } else {
            console.log('User not found or credentials mismatch. Redirecting with error.');
            res.redirect('/?error=invalid_credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} par chal raha hai`);
});