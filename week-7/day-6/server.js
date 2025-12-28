// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const Parser = require('rss-parser');
const path = require('path');

const app = express();
const parser = new Parser();

const RSS_URL = 'https://thefactfile.org/feed/'; // The Fact Site RSS

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

// Cache feed to avoid hitting the RSS too often during development
let cachedFeed = null;
let lastFetched = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

async function getFeed() {
  if (cachedFeed && lastFetched && (Date.now() - lastFetched < CACHE_DURATION)) {
    return cachedFeed;
  }
  const feed = await parser.parseURL(RSS_URL);
  cachedFeed = feed;
  lastFetched = Date.now();
  return feed;
}

// GET / - Home page (all posts)
app.get('/', async (req, res) => {
  try {
    const feed = await getFeed();
    res.render('pages/index', { posts: feed.items, searchResults: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching RSS feed');
  }
});

// GET /search - Search page
app.get('/search', async (req, res) => {
  res.render('pages/search', { posts: [], searchResults: null });
});

// POST /search/title - Search by title
app.post('/search/title', async (req, res) => {
  const titleQuery = req.body.title?.trim().toLowerCase();
  if (!titleQuery) {
    return res.render('pages/search', { posts: [], searchResults: null });
  }

  try {
    const feed = await getFeed();
    const filtered = feed.items.filter(item =>
      item.title.toLowerCase().includes(titleQuery)
    );
    res.render('pages/search', { posts: filtered, searchResults: 'title' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error searching');
  }
});

// POST /search/category - Search by category
app.post('/search/category', async (req, res) => {
  const categoryQuery = req.body.category?.trim();
  if (!categoryQuery) {
    return res.render('pages/search', { posts: [], searchResults: null });
  }

  try {
    const feed = await getFeed();
    const filtered = feed.items.filter(item =>
      item.categories && item.categories.some(cat => cat.trim() === categoryQuery)
    );
    res.render('pages/search', { posts: filtered, searchResults: 'category' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error searching');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`RSS Facts Feed running on http://localhost:${PORT}`);
  console.log(`Home: http://localhost:${PORT}/`);
  console.log(`Search: http://localhost:${PORT}/search`);
});