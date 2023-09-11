// express web server
const express = require('express');
const app = express();
const lesson1Controller = require('./controllers/lesson1')

app.get('/', lesson1Controller.michaelRoute);
app.get('/karleanna',lesson1Controller.karleannaRoute);

const port = 3000;

app.listen(process.env.port || port);
console.log('Web Server is listening at a port ' + (process.env.port || 3000));