const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:postId/comments', (req, res) => {
    res.json(commentsByPostId[req.params.postId] || []);
});

app.post('/posts/:postId/comments', (req, res) => {
    const { comment } = req.body;
    const { postId } = req.params;

    const comments = commentsByPostId[postId] || [];

    comments.push({
        id: randomBytes(12).toString('hex'),
        comment,
    });

    commentsByPostId[postId] = comments;

    res.status(201).json(comment);
});

app.listen(3002, () => {
    console.log('Listening to port 3002...');
});