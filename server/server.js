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
    res.status(200).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.' });
  }
});

// Login API Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body; 
  try {    
    const users = await User.find({ email }).select("username email password");
    if (users.length === 0) {
      return res.status(400).json({ message: 'User not found.' });
    }
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    req.session.userId = user._id;
    req.session.username = user.username; 
    res.status(200).send({ message: 'Login successful!', user: { username: user.username, email: user.email } });
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
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  title: { type: String, required: true },
  repository: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  filePath: { type: String, unique: true },  // To store the path of the uploaded file
  createdAt: { type: Date, default: Date.now }
});

// Create a Project model
const Project = mongoose.model('Projects', projectSchema);

// API to upload project details
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { username, email, phone, title, repository, description } = req.body;
    const filePath = req.file ? req.file.path : null;
    const project = new Project({
      username,
      email,
      phone,
      title,
      repository,
      description,
      filePath,
    });
    await project.save();

    res.status(200).send({ message: 'Project uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error uploading project', error });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const { email } = req.query; 
    if (!email) {
      return res.status(400).send({ message: 'Email is required' });
    }
    const projects = await Project.find({ email });
    if (projects.length === 0) {
      return res.status(404).send({ message: 'No projects found for this email' });
    }
    res.status(200).send(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching projects', error });
  }
});
app.get('/api/allprojects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching projects', error });
  }
});
app.get('/api/allprojectstojoin', async (req, res) => {
  const { username, email } = req.query; 
  try {
    const joinedProjectIds = await CollaborationRequest.find({
      joinerName: username,
      status: 'approved',
    }).distinct('projectId'); // Extract only the `projectId` fields
    const availableProjects = await Project.find({
      _id: { $nin: joinedProjectIds },
      email: { $ne: email }// Exclude these project IDs
    });
    res.status(200).json(availableProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error while fetching projects' });
  }
});


// Collaboration Request Schema
const collaborationRequestSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  message: { type: String },
  joinerName: { type: String, required: true },  // Name of the person joining the project
  joinerEmail: { type: String, required: true },  // Email of the person joining the project
  joinerPhoneNo: { type: String, required: true },  // PhoneNo of the person joining the project
  projectOwnerName: { type: String, required: true },  // Name of the project owner
  projectTitle: { type: String, required: true },  // Title of the project
  projectRepo: { type: String, required: true },
  projectFilePath: { type: String, required: true },
  joinedDate: { type: Date, default: null }
}, { timestamps: true });

const CollaborationRequest = mongoose.model('CollaborationRequest', collaborationRequestSchema);

// Route to create a new collaboration request
app.post('/api/collaboration-requests', async (req, res) => {
  const { projectId, message, joinerName, joinerEmail, joinerPhoneNo, projectOwnerName, projectTitle, projectRepo, projectFilePath } = req.body;
  try {
    const newRequest = new CollaborationRequest({
      projectId,
      message,
      joinerName,
      joinerEmail,
      joinerPhoneNo,
      projectOwnerName,
      projectTitle,
      projectRepo,
      projectFilePath
    });
    await newRequest.save();
    res.status(201).json({ message: 'Collaboration request sent successfully!', request: newRequest });
  } catch (error) {
    console.error("Error creating collaboration request:", error.message, error.stack);
    res.status(500).json({ message: 'Error creating collaboration request.', error: error.message });
  }
});
app.get('/api/collaboration-requests-update', async (req, res) => {
  const { username } = req.query;
  try {
    const projects = await CollaborationRequest.find({ projectOwnerName: username });
    res.status(200).json(projects); // Ensure it always returns an array, even if empty
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.patch('/api/collaboration-request/:id/accept', async (req, res) => {
  try {
    const requestId = req.params.id;
    const updatedRequest = await CollaborationRequest.findByIdAndUpdate(
      requestId,
      {
        status: 'approved',
        joinedDate: new Date() // Set the current date when the request is accepted
      },
      { new: true }
    );
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating request' });
  }
});

app.patch('/api/collaboration-request/:id/reject', async (req, res) => {
  try {
    const requestId = req.params.id;
    const updatedRequest = await CollaborationRequest.findByIdAndUpdate(
      requestId,
      {
        status: 'rejected',
        joinedDate: null
      },
      { new: true }
    );
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating request' });
  }
});
app.get('/api/accpetedrequests', async (req, res) => {
  const { projectId } = req.query; // Get projectId and status from query parameters

  try {
    // Find collaboration requests by projectId and status
    const projects = await CollaborationRequest.find({
      projectId,
      status: 'approved'
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching collaboration requests:', error);
    res.status(500).json({ message: 'Server error while fetching collaboration requests' });
  }
});
app.get('/api/myacceptedprojects', async (req, res) => {
  const { username } = req.query; // Get the username of the logged-in user
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  try {
    const acceptedProjects = await CollaborationRequest.find({
      joinerName: username,
      status: 'approved'
    });
    res.status(200).json(acceptedProjects); // Return the found projects
  } catch (error) {
    console.error('Error fetching accepted projects for user:', error);
    res.status(500).json({ message: 'Server error while fetching accepted projects' });
  }
});


const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

app.post('/api/blogs', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully!', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog:', error.message);
    res.status(500).json({ message: 'Error creating blog.', error: error.message });
  }
});
// Route to fetch all blog posts
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    res.status(500).json({ message: 'Error fetching blogs.', error: error.message });
  }
});
// Route to fetch a blog post by ID
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error.message);
    res.status(500).json({ message: 'Error fetching blog.', error: error.message });
  }
});
// Route to update a blog post by ID
app.patch('/api/blogs/:id', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error.message);
    res.status(500).json({ message: 'Error updating blog.', error: error.message });
  }
});

// Route to delete a blog post by ID
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully!' });
  } catch (error) {
    console.error('Error deleting blog:', error.message);
    res.status(500).json({ message: 'Error deleting blog.', error: error.message });
  }
});

const messageSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  projectTitle: { type: String, required: true },
  content: { type: String, required: true },
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

const Message = mongoose.model('Message', messageSchema);



// Get all messages for a project
app.get('/api/chat/:projectId/:projectTitle', async (req, res) => {
  try {
    const messages = await Message.find({
      projectId: req.params.projectId, projectTitle: req.params.projectTitle
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});
// Send a new message
app.post('/api/chat/:projectId/:projectTitle', async (req, res) => {
  try {
    const { content, sender, recipient } = req.body;

    const newMessage = new Message({
      projectId: req.params.projectId,
      projectTitle: req.params.projectTitle,
      content,
      sender,
      recipient,
      read: false
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Mark messages as read
app.put('/api/chat/:projectId/:projectTitle/read', async (req, res) => {
  try {
    const { recipient } = req.body;

    await Message.updateMany(
      {
        projectId: req.params.projectId,
        projectTitle: req.params.projectTitle,
        recipient: recipient,
        read: false
      },
      { $set: { read: true } }
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).json({ error: 'Failed to mark messages as read' });
  }
});

// Optional: Get unread message count
app.get('/api/chat/:projectId/unread/:username', async (req, res) => {
  try {
    const count = await Message.countDocuments({
      projectId: req.params.projectId,
      projectTitle: req.params.projectTitle,
      recipient: req.params.username,
      read: false
    });

    res.json({ unreadCount: count });
  } catch (error) {
    console.error('Error getting unread count:', error);
    res.status(500).json({ error: 'Failed to get unread count' });
  }
});


app.get('/api/messages/unread/grouped', async (req, res) => {
  try {
    // Get the username from query parameters
    const username = req.query.username;  // Access the username correctly

    if (!username) {
      return res.status(400).json({ message: 'User not found or not logged in' });
    }

    // Fetch all unread messages for the given recipient (username)
    const unreadMessages = await Message.find({
      recipient: username,
      read: false,  // Only unread messages
    });

    // If no unread messages found
    if (unreadMessages.length === 0) {
      return res.status(404).json({ message: 'No unread messages found' });
    }

    // Return the unread messages
    res.json(unreadMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/', (req, res) => {
  res.send('Welcome to the BRB API!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});