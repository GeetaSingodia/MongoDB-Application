require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

// Debug: Check if MONGO_URI is loaded correctly
console.log('MONGO_URI:', process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Call your data population function here if needed
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

const sampleUsers = [
  { name: 'Alice', email: 'alice@example.com', password: 'password123' },
  { name: 'Bob', email: 'bob@example.com', password: 'password123' },
  { name: 'Charlie', email: 'charlie@example.com', password: 'password123' },
  { name: 'Dave', email: 'dave@example.com', password: 'password123' },
  { name: 'Eve', email: 'eve@example.com', password: 'password123' },
];

const samplePosts = [
  { title: 'First Post', content: 'This is the first post', author: null },
  { title: 'Second Post', content: 'This is the second post', author: null },
  { title: 'Third Post', content: 'This is the third post', author: null },
  { title: 'Fourth Post', content: 'This is the fourth post', author: null },
  { title: 'Fifth Post', content: 'This is the fifth post', author: null },
];

const sampleComments = [
  { content: 'Great post!', author: null, post: null },
  { content: 'Thanks for sharing', author: null, post: null },
  { content: 'Interesting read', author: null, post: null },
  { content: 'Very informative', author: null, post: null },
  { content: 'Loved it!', author: null, post: null },
];

async function populateDatabase() {
  try {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    const users = await User.insertMany(sampleUsers);
    samplePosts.forEach((post, index) => {
      post.author = users[index % users.length]._id;
    });
    const posts = await Post.insertMany(samplePosts);
    sampleComments.forEach((comment, index) => {
      comment.author = users[index % users.length]._id;
      comment.post = posts[index % posts.length]._id;
    });
    await Comment.insertMany(sampleComments);

    console.log('Sample data populated');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

populateDatabase();
