const axios = require('axios');
const express = require('express');

const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:3001/events', event);
  axios.post('http://localhost:3002/events', event); // posts
  axios.post('http://localhost:3003/events', event); // comments

  res.status(200).json({});
});

app.listen(3005, () => {
  console.log('Bus listening on 3005...');
});
