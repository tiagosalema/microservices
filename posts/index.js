const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
  res.json(posts);
});
app.post('/posts', async (req, res) => {
  const { title } = req.body;
  const id = randomBytes(12).toString('hex');
  posts[id] = {
    id,
    title,
  };

  await axios.post('http://localhost:3005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });

  res.status(201).json(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Event received:', req.body.type);
  res.json({});
});

app.listen(3001, () => {
  console.log('Posts listening in port 3001');
});
