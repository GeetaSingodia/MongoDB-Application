require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

const app = express();
const port = process.env.PORT || 3000;

// Check if ATLAS_URI is loaded correctly
console.log('ATLAS_URI:', process.env.ATLAS_URI);

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI, {
  serverSelectionTimeoutMS: 30000 // Set to 30 seconds
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  });

// Routes
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
