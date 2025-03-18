// 1. Importing packages
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

//2. Defining env variables and localhost
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// 3. Endpoint to retrieve JWT
app.post('/get-token', async (req, res) => {
    try {
        const applicationId = process.env.APPLICATION_ID;
        const response = await axios.post('https://api.goentri.com/token', {
            applicationId: applicationId,
            secret: process.env.SECRET,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;

        res.json({ token: data.auth_token, applicationId: applicationId});
    } catch (error) {
        console.error('Error on retrieving JWT:', error);
        res.status(500).json({ error: 'Error on retrieving JWT' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running in http://localhost:${PORT}`);
});
