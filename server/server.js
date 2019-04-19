const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use('/static', express.static(path.join(__dirname, '../client/build/static')));

app.use('/js', express.static(path.join(__dirname, './js')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
});

let content;

app.get('/update', (req, res) => {
  res.send(content)
});

app.post('/update', (req, res) => {
  content = Object.keys(req.body)[0];
});

app.listen(3000);