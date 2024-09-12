const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 9000;

const mongoose = require('mongoose');

// MongoDB Atlas connection string
const mongoURI = 'your connection string';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds
})
.then(() => console.log('MongoDB Atlas connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));


app.use(cors()); // Allow requests from your React frontend

const DummyData = require('./DummyData.js');

app.get('/store-sample-data', async (req, res) => {
  console.log('Endpoint /store-sample-data hit'); // Debug log
  const sampleData = { name: 'Sample Project 3', description: 'This is a sample project 3.' };

  try {
    const result = await DummyData.create(sampleData); // Use create() for a single document
    console.log('Sample data inserted:', result); // Debug log after insertion
    res.json({ message: 'Sample data inserted successfully', result });
  } catch (error) {
    console.error('Error inserting sample data:', error); // Log detailed error
    res.status(500).json({ message: 'Error inserting sample data', error });
  }
});


async function fetchTrendingRepos(language = '', since = 'daily') {
  const url = `https://github.com/trending?${language ? `language=${language}` : ''}${since ? `&since=${since}` : ''}`;

  try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const trendingRepos = [];
      $('article.Box-row').each((i, element) => {
          if (i >= 6) return false; // Limit to 6 repositories
          
          const name = $(element).find('h2 a').text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
          const description = $(element).find('p.col-9').text().trim();
          const stars = $(element).find('a[href*="/stargazers"]').text().trim();
          const language = $(element).find('span[itemprop="programmingLanguage"]').text().trim();
          const url = $(element).find('h2 a').attr('href');

          trendingRepos.push({
              "name": name,
              "description": description,
              "stars": stars,
              "language": language,
              "url": `https://github.com/${url}`
          });
      });

      return trendingRepos;
  } catch (error) {
      console.error('Error fetching trending repositories:', error);
      throw error;
  }
}

// Create an API endpoint to serve the trending repos
app.get('/api/trending-repos', async (req, res) => {
  try {
      const repos = await fetchTrendingRepos('javascript', 'monthly');
      res.json(repos);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching repositories' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// QgGHw1lTd1U5atS4
// mongodb+srv://<db_username>:<db_password>@cluster0.i4fjt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0