const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:postId/comments', async (req, res) => {
  res.json(commentsByPostId[req.params.postId] || []);
});

app.post('/posts/:postId/comments', async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;
  const commentId = randomBytes(12).toString('hex');

  const comments = commentsByPostId[postId] || [];

  const newComment = { id: commentId, content };

  comments.push(newComment);

  commentsByPostId[postId] = comments;

  await axios.post('http://localhost:3005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId,
    },
  });

  res.status(201).json(newComment);
});

app.post('/events', (req, res) => {
  console.log('Event received:', req.body.type);

  res.json({});
});

app.listen(3002, () => {
  console.log('Comments listening to port 3002...');
});
