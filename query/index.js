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
  const { id } = data;

  switch (type) {
    case 'PostCreated':
      const { title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    case 'CommentCreated':
      const { content, postId } = data;
      posts[postId].comments.push({ id, content });
      break;
  }
  res.json({});
});

app.listen(3003, () => {
  console.log('Query listinening on 3003...');
});
