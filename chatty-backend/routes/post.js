const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');

const router = express.Router();

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST /api/posts/upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const newPost = new Post({
      imageUrl: `/uploads/${req.file.filename}`,
      caption: req.body.caption || ''
    });

    await newPost.save();
    res.status(201).json({ message: 'Post uploaded', post: newPost });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading post' });
  }
});

// ✅ GET /api/posts – return all uploaded posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // newest first
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

module.exports = router;
