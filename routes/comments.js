const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific comment
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a comment
router.post('/', async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    author: req.body.author,
    post: req.body.post
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a comment
router.patch('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (req.body.content != null) {
      comment.content = req.body.content;
    }
    if (req.body.author != null) {
      comment.author = req.body.author;
    }
    if (req.body.post != null) {
      comment.post = req.body.post;
    }

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    await comment.remove();
    res.json({ message: 'Deleted Comment' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
