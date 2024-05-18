const express = require('express');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const cors = require('cors')

const app = express();
const PORT = 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const validationRules = [
    body('firstName').notEmpty().withMessage('First Name is required'),
    body('lastName').notEmpty().withMessage('Last Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('phoneNumber').isNumeric().withMessage('Phone Number must be 11 digits'),
    body('gender').notEmpty().withMessage('Gender is required')
];

const databasePath = path.join(__dirname, 'database.json');

app.post('/submit', validationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phoneNumber, gender} = req.body;

    const formData = { firstName, lastName, email, phoneNumber, gender};

    fs.readFile(databasePath, (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return console.error('Error reading file:', err);
        }

        let database = [];
        if (data) {
            database = JSON.parse(data);
        }
        database.push(formData)

        fs.writeFile(databasePath, JSON.stringify(database, null, 2), (err) => {
            if (err) {
                return console.error('Error writing file:', err);
            }
            console.log('Form data saved to database,json');
        });
    });
    res.send('Form submitted successfully!');
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});