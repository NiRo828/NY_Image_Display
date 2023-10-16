const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the js directory
app.use(express.static('js'));
const API_KEY = '39574753-1d7916569f8a04f1cc685f33f'; 
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
        const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&page=${page}`;
        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                cache[cacheKey] = JSON.parse(data);
                res.json(JSON.parse(data));
            });
        });
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
        const url = `${BASE_URL}?key=${API_KEY}&order=popular&per_page=10`;
        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                cache.random = JSON.parse(data);
                res.json(JSON.parse(data));
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch random images' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
