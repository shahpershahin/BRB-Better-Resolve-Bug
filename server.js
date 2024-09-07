const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 9000;

app.use(cors()); // Allow requests from your React frontend

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
          const url = $(element).find('h1.h3 a').attr('href');

          trendingRepos.push({
              "name": name,
              "description": description,
              "stars": stars,
              "language": language,
              "url": `https://github.com${url}`
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
