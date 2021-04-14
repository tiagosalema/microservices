const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
  res.json(posts);
});
app.post('/posts', (req, res) => {
  const post = req.body;
  console.log(req.body);
  const id = randomBytes(12).toString('hex');
  posts[id] = post;

  res.status(201).json(post);
});

app.listen(3001, () => {
  console.log('Listening in port 3001');
});
