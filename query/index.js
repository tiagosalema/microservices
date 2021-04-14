const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};
const posts_demo = {
  k23h4k3: {
    id: 'jk342gl2',
    title: 'Post title',
    comments: [
      { id: 'kj234h2k', content: 'A comment' },
      { id: 'l23j4g25', content: 'Another comment' },
    ],
  },
};

app.get('/events', (req, res) => {
  res.json(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log({ type });
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
    console.log('PostCreated');
  } else if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    posts[postId].comments.push({ id, content });
    console.log('CommentCreated', postId);
  }
  console.dir({ posts }, 3);
  res.json({});
});

app.listen(3003, () => {
  console.log('Query listinening on 3003...');
});
