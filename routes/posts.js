const express = require('express');

const Post = require('../models/Post');
const router = express.Router();
console.log(Post);
// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a post
router.patch('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
