const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session'); // Import express-session
const app = express();
const port = 9000;
const multer = require('multer');
const path = require('path'); // Ensure you have this import for file handling
mongoose.connect('mongodb://localhost:27017/BRB', {
  // Removed deprecated options
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Middleware
app.use(cors({
  origin: 'http://localhost:5173'
})); 
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key', // Change this secret for production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// User Schema

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  termsAccepted: { type: Boolean, required: true }
});
const User = mongoose.model('User', userSchema);

// Register API Route
app.post('/api/register', async (req, res) => {
  const { username, email, password, terms } = req.body;

  // Check if terms are accepted
  if (!terms) {
    return res.status(400).json({ message: 'Please accept the terms and conditions.' });
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  try {
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      termsAccepted: terms
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.' });
  }
});

// Login API Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists with the provided email
    const user = await User.findOne({ email }).select("username email password");
    console.log(user)
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Store user information in session
    req.session.userId = user._id;
    req.session.username = user.username; // Optional: Store username in session

    res.status(200).json({ message: 'Login successful!', user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user.' });
  }
});

// Logout API Route
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out user.' });
    }
    res.status(200).json({ message: 'Logout successful!' });
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({ storage: storage });


const projectSchema = new mongoose.Schema({
  name: { type: String,required:true, unique: true },
  title: { type: String, required:true, unique: true },
  email: { type: String, required:true },
  repo: { type: String, unique: true },
  phone: String,
  description: { type: String, required:true },
  filePath: { type: String, unique: true },  // To store the path of the uploaded file
});

// Create a Project model
const Project = mongoose.model('Project', projectSchema);

// API to upload project details
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { name, title, email, repo, phone, description } = req.body;
    const filePath = req.file ? req.file.path : null;

    // Create a new project document
    const project = new Project({
      name,
      title,
      email,
      repo,
      phone,
      description,
      filePath,
    });

    // Save project to MongoDB
    await project.save();
    
    res.status(200).json({ message: 'Project uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading project' });
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


app.get('/api/trending-repos', async (req, res) => {
  try {
      const repos = await fetchTrendingRepos('javascript', 'monthly');
      res.json(repos);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching repositories' });
  }
});


async function fetchMostStarredRepos(language = '') {
  const url = `https://github.com/search?q=${language ? `language:${language}` : ''}&type=repositories&s=stars&o=desc`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const mostStarredRepos = [];
    $('li.repo-list-item').each((i, element) => {
      if (i >= 6) return false; // Limit to 6 repositories

      const name = $(element).find('a.v-align-middle').text().trim();
      const description = $(element).find('p.mb-1').text().trim();
      const stars = $(element).find('a.Link--muted').first().text().trim();
      const language = $(element).find('span[itemprop="programmingLanguage"]').text().trim();
      const url = $(element).find('a.v-align-middle').attr('href');

      mostStarredRepos.push({
        name: name,
        description: description,
        stars: stars,
        language: language,
        url: `https://github.com${url}`,
      });
    });

    return mostStarredRepos;
  } catch (error) {
    console.error('Error fetching most starred repositories:', error);
    throw error;
  }
}

// Express route for fetching the most starred repos
app.get('/api/most-starred-repos', async (req, res) => {
  try {
    const repos = await fetchMostStarredRepos('javascript'); // Example with JavaScript
    res.json(repos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repositories' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the BRB API!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
