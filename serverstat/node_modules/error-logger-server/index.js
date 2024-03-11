// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const colors = require('colors');
app.use(cors());
app.use(express.json());

app.post('/server', (req, res) => {
  let frontendError = null;
  if (req.body) {
    frontendError = req.body.error;
    console.log('');
    console.log(colors.green.underline('Frontend Error Detected'));
    console.log(' ');
    console.log(frontendError);
    res.send('Error received and logged');
  } else {
    console.log('No error detected');
    res.send('No error detected');
  }
});
console.log(colors.green.underline('hii'));
module.exports = app;
