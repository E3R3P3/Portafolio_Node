const express = require('express');
const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

const path = require('path');

app.set('view engine', 'ejs');

app.use('/', require('./router'));


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})