const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');


routes.get('/', lesson1Controller.michaelRoute);
routes.get('/karleanna',lesson1Controller.karleannaRoute);

module.exports = routes;