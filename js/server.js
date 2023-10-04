const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
// Serve static files from the js directory
app.use(express.static('js'));
const API_KEY = '39574753-1d7916569f8a04f1cc685f33f'; // Replace with your API key
const BASE_URL = 'https://pixabay.com/api/';
const cache = {}; // Simple cache object
// Search API Route
app.post('/api/search', async (req, res) => {
    const searchTerm = req.body.searchTerm;
    const page = req.body.page || 1;
    const cacheKey = searchTerm + '_' + page;
    if (cache[cacheKey]) {
        return res.json(cache[cacheKey]);
    }
    try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&page=${page}`);
        cache[cacheKey] = response.data;
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});
// Random Images Route
app.get('/api/random-images', async (req, res) => {
    if (cache.random) {
        return res.json(cache.random);
    }
    try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&order=popular&per_page=10`);
        cache.random = response.data;
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch random images' });
    }
});
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


// // Basic Server
// const express = require('express');
// const app = express();
// const PORT = 5000;

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });
