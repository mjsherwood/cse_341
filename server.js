// express web server
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Michael Sherwood 2');
});

const port = 3000;

app.listen(process.env.port || port);
console.log('Web Server is listening at a port ' + (process.env.port || 3000));